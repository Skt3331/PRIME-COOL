import { getSessionTokenFromRequest } from "./auth-helpers.server";
import * as db from "./db";
import type { CmsSettings, CmsFaq } from "./db";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import nodemailer from "nodemailer";
import { fileURLToPath } from "node:url";
import { exec } from "node:child_process";

function triggerSitemapUpdate() {
  exec("npm run sitemap", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error regenerating sitemap: ${error.message}`);
      return;
    }
    console.log(`Sitemap regenerated automatically.`);
  });
}

// 60-second in-memory cache for public endpoints
const publicCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 60 * 1000;

function getCachedData<T>(key: string): T | null {
  const cached = publicCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
}

function setCachedData(key: string, data: any) {
  publicCache.set(key, { data, timestamp: Date.now() });
}

// Security helper to assert admin authentication in server functions
function getAppRoot(): string {
  try {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDir = path.dirname(currentFilePath);

    if (currentDir.includes("dist\\server\\assets") || currentDir.includes("dist/server/assets")) {
      return path.resolve(currentDir, "..", "..", "..");
    } else if (currentDir.includes("dist\\server") || currentDir.includes("dist/server")) {
      return path.resolve(currentDir, "..", "..");
    } else if (currentDir.includes("src\\lib") || currentDir.includes("src/lib")) {
      return path.resolve(currentDir, "..", "..");
    }
  } catch (err) {
    // Ignore URL parse failures and fallback
  }

  const mainScript = process.argv[1];
  if (mainScript && !mainScript.includes("node_modules") && !mainScript.includes("vite")) {
    return path.dirname(mainScript);
  }
  return process.cwd();
}

async function requireAdminAuth() {
  const token = getSessionTokenFromRequest();
  if (!token) throw new Error("Unauthorized: No token provided");
  const username = await db.validateSession(token);
  if (!username) throw new Error("Unauthorized: Invalid session");
  return username;
}

// SMTP Email Dispatcher Helper
async function sendEmailNotification(to: string, subject: string, message: string) {
  try {
    const settings = await db.getCmsSettings();
    const smtp = settings.smtp;

    if (!smtp || !smtp.enabled) {
      console.log(`[SMTP Offline] Mock Email logged to DB for recipient: ${to}`);
      return "sent";
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"${smtp.fromName}" <${smtp.fromEmail}>`,
      to,
      subject,
      text: message,
    });

    console.log(`[SMTP Success] Email sent: ${info.messageId}`);
    return "sent";
  } catch (error) {
    console.error(`[SMTP Error] Failed to send email to ${to}:`, error);
    return "failed";
  }
}

export async function trackVisitHelper() {
  const count = await db.incrementVisits();
  return { visits: count };
}

export async function getVisitsHelper() {
  await requireAdminAuth();
  const count = await db.getVisits();
  return { visits: count };
}

export async function getPublicProjectsHelper() {
  const cached = getCachedData("projects");
  if (cached) return { projects: cached };

  const projects = await db.getProjects();
  setCachedData("projects", projects);
  return { projects };
}

export async function getAdminProjectsHelper() {
  await requireAdminAuth();
  const projects = await db.getProjects();
  return { projects };
}

export async function createProjectHelper(data: {
  title: string;
  summary: string;
  location: string;
  category: "domestic" | "commercial" | "industrial";
  metrics: { value: string; label: string }[];
  imageFile?: { name: string; base64: string };
}) {
  await requireAdminAuth();

  let imageUrl = "";

  if (data.imageFile) {
    imageUrl = data.imageFile.base64.startsWith("data:")
      ? data.imageFile.base64
      : `data:image/jpeg;base64,${data.imageFile.base64}`;
  }

  const newProject = await db.addProject({
    title: data.title,
    summary: data.summary,
    location: data.location,
    category: data.category,
    metrics: data.metrics,
    image: imageUrl || undefined,
  });

  return { success: true, project: newProject };
}

export async function updateProjectHelper(data: {
  id: string;
  title?: string;
  summary?: string;
  location?: string;
  category?: "domestic" | "commercial" | "industrial";
  metrics?: { value: string; label: string }[];
  imageFile?: { name: string; base64: string };
}) {
  await requireAdminAuth();

  let imageUrl = "";
  if (data.imageFile) {
    imageUrl = data.imageFile.base64.startsWith("data:")
      ? data.imageFile.base64
      : `data:image/jpeg;base64,${data.imageFile.base64}`;
  }

  const updateData: any = { ...data };
  delete updateData.id;
  delete updateData.imageFile;
  if (imageUrl) {
    updateData.image = imageUrl;
  }

  const updated = await db.updateProject(data.id, updateData);
  if (!updated) return { success: false, error: "Project not found" };

  return { success: true, project: updated };
}

export async function deleteProjectHelper(data: { id: string }) {
  await requireAdminAuth();
  const success = await db.deleteProject(data.id);
  return { success };
}

export async function getAvailableSlotsHelper(data: { date: string }) {
  const { date } = data;
  if (!date) return { slots: [] };

  const standardSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

  const bookings = await db.getBookings();
  const bookedSlots = bookings
    .filter((b) => b.date === date && b.status !== "cancelled")
    .map((b) => b.timeSlot);

  const slots = standardSlots.map((slot) => ({
    time: slot,
    available: !bookedSlots.includes(slot),
  }));

  return { slots };
}

export async function createBookingHelper(data: {
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  notes?: string;
}) {
  const { date, timeSlot } = data;

  const bookings = await db.getBookings();
  const isDoubleBooked = bookings.some(
    (b) => b.date === date && b.timeSlot === timeSlot && b.status !== "cancelled",
  );

  if (isDoubleBooked) {
    return {
      success: false,
      error: "This timeslot has already been reserved. Please select another slot.",
    };
  }

  const newBooking = await db.addBooking(data);

  const settings = await db.getCmsSettings();
  const cmsPhone = settings.socials?.phone || "+917507408461";
  const cmsEmail = settings.socials?.email || "support@primecool.in";

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 1. WhatsApp Mock
  await db.addNotification({
    recipient: data.phone,
    type: "whatsapp",
    status: "sent",
    message: `Hi ${data.customerName}, your booking for ${data.serviceType} on ${formattedDate} at ${timeSlot} has been RECEIVED by Prime Cool. Lead engineer Saurav Temgire will contact you shortly to confirm details. Proprietor: ${cmsPhone}`,
  });

  // 2. Email Notification (Real SMTP / Mock fallback)
  const emailSubject = `Booking Request Received — Prime Cool`;
  const emailMessage = `Hello ${data.customerName},\n\nWe have received your appointment request for ${data.serviceType} scheduled on ${formattedDate} at ${timeSlot}.\n\nEngineer Availability Check: We are currently verifying scheduling alignment on the Wagholi–Shirur route and will confirm shortly.\n\nThank you,\nPrime Cool (Saurav Kailas Temgire)\nPrimary: ${cmsPhone}\nEmail: ${cmsEmail}`;

  const emailStatus = await sendEmailNotification(data.email, emailSubject, emailMessage);

  await db.addNotification({
    recipient: data.email,
    type: "email",
    status: emailStatus,
    subject: emailSubject,
    message: emailMessage,
  });

  return { success: true, booking: newBooking };
}

export async function getAdminBookingsHelper() {
  await requireAdminAuth();
  const bookings = await db.getBookings();
  return { bookings };
}

export async function updateBookingStatusHelper(data: {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
}) {
  await requireAdminAuth();
  const updated = await db.updateBookingStatus(data.id, data.status);
  if (!updated) return { success: false, error: "Booking not found" };

  const settings = await db.getCmsSettings();
  const cmsPhone = settings.socials?.phone || "+917507408461";
  const cmsEmail = settings.socials?.email || "support@primecool.in";

  const formattedDate = new Date(updated.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (data.status === "confirmed") {
    await db.addNotification({
      recipient: updated.phone,
      type: "whatsapp",
      status: "sent",
      message: `Hi ${updated.customerName}, your booking for ${updated.serviceType} on ${formattedDate} at ${updated.timeSlot} is now CONFIRMED by Prime Cool. Technician will arrive on time. Contact: ${cmsPhone}.`,
    });

    const confirmSubject = `Booking Confirmed — Prime Cool`;
    const confirmMessage = `Hello ${updated.customerName},\n\nWe are pleased to inform you that your appointment for ${updated.serviceType} scheduled on ${formattedDate} at ${updated.timeSlot} is now CONFIRMED.\n\nLead engineer Saurav Temgire will arrive at your site. If you have any additional details or requirements, please contact us.\n\nBest regards,\nPrime Cool Solutions\nPrimary: ${cmsPhone}\nEmail: ${cmsEmail}`;

    const confirmEmailStatus = await sendEmailNotification(
      updated.email,
      confirmSubject,
      confirmMessage,
    );

    await db.addNotification({
      recipient: updated.email,
      type: "email",
      status: confirmEmailStatus,
      subject: confirmSubject,
      message: confirmMessage,
    });
  } else if (data.status === "cancelled") {
    const cancelSubject = `Booking Cancellation — Prime Cool`;
    const cancelMessage = `Hello ${updated.customerName},\n\nYour appointment request for ${updated.serviceType} scheduled on ${formattedDate} at ${updated.timeSlot} has been cancelled.\n\nIf you have any questions or would like to reschedule, please feel free to call Saurav Temgire at ${cmsPhone}.\n\nBest regards,\nPrime Cool`;

    const cancelEmailStatus = await sendEmailNotification(
      updated.email,
      cancelSubject,
      cancelMessage,
    );

    await db.addNotification({
      recipient: updated.email,
      type: "email",
      status: cancelEmailStatus,
      subject: cancelSubject,
      message: cancelMessage,
    });
  }

  return { success: true, booking: updated };
}

export async function deleteBookingHelper(data: { id: string }) {
  await requireAdminAuth();
  const success = await db.deleteBooking(data.id);
  return { success };
}

export async function getAdminNotificationsHelper() {
  await requireAdminAuth();
  const notifications = await db.getNotifications();
  return { notifications };
}

export async function changeAdminSettingsHelper(data: { username: string; password?: string }) {
  await requireAdminAuth();
  await db.updateAdminSettings(data.username, data.password || undefined);
  return { success: true };
}

// CMS Helpers
export async function getCmsSettingsHelper() {
  const cached = getCachedData("cmsSettings");
  if (cached) return { settings: cached };

  const settings = await db.getCmsSettings();
  setCachedData("cmsSettings", settings);
  return { settings };
}

export async function updateCmsSettingsHelper(data: CmsSettings) {
  await requireAdminAuth();
  await db.updateCmsSettings(data);
  return { success: true };
}

export async function getFaqsHelper() {
  const faqs = await db.getFaqs();
  return { faqs };
}

export async function addFaqHelper(data: Omit<CmsFaq, "id">) {
  await requireAdminAuth();
  const faq = await db.addFaq(data);
  return { success: true, faq };
}

export async function updateFaqHelper(data: Partial<CmsFaq> & { id: string }) {
  await requireAdminAuth();
  const { id, ...faq } = data;
  const updated = await db.updateFaq(id, faq);
  if (!updated) return { success: false, error: "FAQ not found" };
  return { success: true, faq: updated };
}

export async function deleteFaqHelper(data: { id: string }) {
  await requireAdminAuth();
  const success = await db.deleteFaq(data.id);
  return { success };
}

// Blogs Server Helpers
export async function getPublicBlogsHelper() {
  const cached = getCachedData("blogs");
  if (cached) return { blogs: cached };

  const blogs = await db.getBlogs();
  setCachedData("blogs", blogs);
  return { blogs };
}

export async function getAdminBlogsHelper() {
  await requireAdminAuth();
  const blogs = await db.getBlogs();
  return { blogs };
}

export async function createBlogHelper(data: {
  title: string;
  slug: string;
  content: string;
  summary: string;
  category?: string;
  author?: string;
  seoTitle?: string;
  seoDesc?: string;
  imageFile?: { name: string; base64: string };
}) {
  await requireAdminAuth();

  let imageUrl = "";

  if (data.imageFile) {
    imageUrl = data.imageFile.base64.startsWith("data:")
      ? data.imageFile.base64
      : `data:image/jpeg;base64,${data.imageFile.base64}`;
  }

  const newBlog = await db.addBlog({
    title: data.title,
    slug: data.slug,
    content: data.content,
    summary: data.summary,
    category: data.category,
    author: data.author,
    seoTitle: data.seoTitle,
    seoDesc: data.seoDesc,
    image: imageUrl || undefined,
  });

  return { success: true, blog: newBlog };
}

export async function updateBlogHelper(data: {
  id: string;
  title?: string;
  slug?: string;
  content?: string;
  summary?: string;
  category?: string;
  author?: string;
  seoTitle?: string;
  seoDesc?: string;
  imageFile?: { name: string; base64: string };
}) {
  await requireAdminAuth();

  let imageUrl = "";
  if (data.imageFile) {
    imageUrl = data.imageFile.base64.startsWith("data:")
      ? data.imageFile.base64
      : `data:image/jpeg;base64,${data.imageFile.base64}`;
  }

  const updateData: any = { ...data };
  delete updateData.id;
  delete updateData.imageFile;
  if (imageUrl) {
    updateData.image = imageUrl;
  }

  const updated = await db.updateBlog(data.id, updateData);
  if (!updated) return { success: false, error: "Blog not found" };

  return { success: true, blog: updated };
}

export async function deleteBlogHelper(data: { id: string }) {
  await requireAdminAuth();
  const success = await db.deleteBlog(data.id);
  return { success };
}

export async function getDbStatusHelper() {
  await requireAdminAuth();
  const status = await db.getDbStatus();
  return { status };
}

// ---------------- Services API Helpers ----------------

export async function getPublicServicesHelper() {
  const cached = getCachedData("services");
  if (cached) return { services: cached };

  const services = await db.getServices();
  setCachedData("services", services);
  return { services };
}

export async function getAdminServicesHelper() {
  await requireAdminAuth();
  const services = await db.getServices();
  return { services };
}

export async function createServiceHelper(data: {
  title: string;
  slug: string;
  description: string;
  category: string;
  icon?: string;
  isPopular: boolean;
  orderIndex: number;
  imageFile?: { name: string; base64: string };
}) {
  await requireAdminAuth();

  let imageUrl = "";
  if (data.imageFile) {
    imageUrl = data.imageFile.base64.startsWith("data:")
      ? data.imageFile.base64
      : `data:image/jpeg;base64,${data.imageFile.base64}`;
  }

  const newService = await db.addService({
    title: data.title,
    slug: data.slug,
    description: data.description,
    category: data.category,
    icon: data.icon,
    isPopular: data.isPopular,
    orderIndex: data.orderIndex,
    image: imageUrl || undefined,
  });

  return { success: true, service: newService };
}

export async function updateServiceHelper(data: {
  id: string;
  title?: string;
  slug?: string;
  description?: string;
  category?: string;
  icon?: string;
  isPopular?: boolean;
  orderIndex?: number;
  imageFile?: { name: string; base64: string };
}) {
  await requireAdminAuth();

  let imageUrl = "";
  if (data.imageFile) {
    imageUrl = data.imageFile.base64.startsWith("data:")
      ? data.imageFile.base64
      : `data:image/jpeg;base64,${data.imageFile.base64}`;
  }

  const updateData: any = { ...data };
  delete updateData.id;
  delete updateData.imageFile;
  if (imageUrl) {
    updateData.image = imageUrl;
  }

  const updated = await db.updateService(data.id, updateData);
  if (!updated) return { success: false, error: "Service not found" };

  return { success: true, service: updated };
}

export async function deleteServiceHelper(data: { id: string }) {
  await requireAdminAuth();
  const success = await db.deleteService(data.id);
  return { success };
}

// ---------------- Calculators API Helpers ----------------

export async function getCalculatorsHelper() {
  const calculators = await db.getCalculators();
  return { calculators };
}

export async function updateCalculatorHelper(data: {
  id: string;
  title?: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
}) {
  await requireAdminAuth();
  const { id, ...calcData } = data;
  const updated = await db.updateCalculator(id, calcData);
  if (!updated) return { success: false, error: "Calculator not found" };
  return { success: true, calculator: updated };
}

// ---------------- Locations API Helpers ----------------

export async function getLocationsHelper() {
  const locations = await db.getLocations();
  return { locations };
}

export async function addLocationHelper(data: any) {
  await requireAdminAuth();
  const location = await db.addLocation(data);
  triggerSitemapUpdate();
  return { success: true, location };
}

export async function updateLocationHelper(data: any) {
  await requireAdminAuth();
  const { slug, ...location } = data;
  const updated = await db.updateLocation(slug, location);
  if (!updated) return { success: false, error: "Location not found" };
  triggerSitemapUpdate();
  return { success: true, location: updated };
}

export async function deleteLocationHelper(data: { slug: string }) {
  await requireAdminAuth();
  const success = await db.deleteLocation(data.slug);
  if (success) triggerSitemapUpdate();
  return { success };
}
