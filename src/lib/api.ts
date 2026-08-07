import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  trackVisitHelper,
  getVisitsHelper,
  getPublicProjectsHelper,
  getAdminProjectsHelper,
  createProjectHelper,
  updateProjectHelper,
  deleteProjectHelper,
  getAvailableSlotsHelper,
  createBookingHelper,
  getAdminBookingsHelper,
  updateBookingStatusHelper,
  deleteBookingHelper,
  getAdminNotificationsHelper,
  changeAdminSettingsHelper,
  getCmsSettingsHelper,
  updateCmsSettingsHelper,
  getFaqsHelper,
  addFaqHelper,
  updateFaqHelper,
  deleteFaqHelper,
  getPublicBlogsHelper,
  getAdminBlogsHelper,
  createBlogHelper,
  updateBlogHelper,
  deleteBlogHelper,
  getDbStatusHelper,
  getPublicServicesHelper,
  getAdminServicesHelper,
  createServiceHelper,
  updateServiceHelper,
  deleteServiceHelper,
  getCalculatorsHelper,
  updateCalculatorHelper,
  getLocationsHelper,
  addLocationHelper,
  updateLocationHelper,
  deleteLocationHelper,
} from "./api-helpers.server";

// 1. Visit Tracking Server Functions
export const trackVisit = createServerFn({ method: "POST" }).handler(async () => {
  return await trackVisitHelper();
});

export const getVisits = createServerFn({ method: "GET" }).handler(async () => {
  return await getVisitsHelper();
});

// 2. Portfolio Server Functions
export const getPublicProjects = createServerFn({ method: "GET" }).handler(async (): Promise<{ projects: any }> => {
  return await getPublicProjectsHelper();
});

export const getAdminProjects = createServerFn({ method: "GET" }).handler(async (): Promise<{ projects: any }> => {
  return await getAdminProjectsHelper();
});

export const createProject = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string(),
      summary: z.string(),
      location: z.string(),
      category: z.enum(["domestic", "commercial", "industrial"]),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })),
      seoTitle: z.string().optional(),
      seoDesc: z.string().optional(),
      seoKeywords: z.string().optional(),
      imageFile: z.object({ name: z.string(), base64: z.string() }).optional(),
    }),
  )
  .handler(async ({ data }) => {
    return await createProjectHelper(data);
  });

export const updateProject = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      summary: z.string().optional(),
      location: z.string().optional(),
      category: z.enum(["domestic", "commercial", "industrial"]).optional(),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
      seoTitle: z.string().optional(),
      seoDesc: z.string().optional(),
      seoKeywords: z.string().optional(),
      imageFile: z.object({ name: z.string(), base64: z.string() }).optional(),
    }),
  )
  .handler(async ({ data }) => {
    return await updateProjectHelper(data);
  });

export const deleteProject = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return await deleteProjectHelper(data);
  });

// 3. Booking Server Functions
export const getAvailableSlots = createServerFn({ method: "GET" })
  .validator(z.object({ date: z.string() }))
  .handler(async ({ data }) => {
    return await getAvailableSlotsHelper(data);
  });

export const createBooking = createServerFn({ method: "POST" })
  .validator(
    z.object({
      customerName: z.string(),
      email: z.string(),
      phone: z.string(),
      serviceType: z.string(),
      date: z.string(),
      timeSlot: z.string(),
      notes: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    return await createBookingHelper(data);
  });

export const getAdminBookings = createServerFn({ method: "GET" }).handler(async (): Promise<{ bookings: any }> => {
  return await getAdminBookingsHelper();
});

export const updateBookingStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      status: z.enum(["pending", "confirmed", "cancelled"]),
    }),
  )
  .handler(async ({ data }) => {
    return await updateBookingStatusHelper(data);
  });

export const deleteBooking = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return await deleteBookingHelper(data);
  });

// 4. Notifications Server Function
export const getAdminNotifications = createServerFn({ method: "GET" }).handler(async (): Promise<{ notifications: any }> => {
  return await getAdminNotificationsHelper();
});

// 5. Admin Settings Update Function
export const changeAdminSettings = createServerFn({ method: "POST" })
  .validator(
    z.object({
      username: z.string(),
      password: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    return await changeAdminSettingsHelper(data);
  });

// 6. CMS & FAQ Server Functions
export const getCmsSettings = createServerFn({ method: "GET" }).handler(async (): Promise<{ settings: any }> => {
  return await getCmsSettingsHelper();
});

export const updateCmsSettings = createServerFn({ method: "POST" })
  .validator(
    z.object({
      hero: z.object({
        title1: z.string(),
        title2: z.string(),
        subtitle: z.string(),
        cta1Text: z.string(),
        cta1Link: z.string(),
        cta2Text: z.string(),
        cta2Link: z.string(),
        backgroundImage: z.string().optional(),
      }),
      seo: z.object({
        home: z.object({
          title: z.string(),
          description: z.string(),
          ogTitle: z.string(),
          ogDescription: z.string(),
        }),
        booking: z.object({
          title: z.string(),
          description: z.string(),
          ogTitle: z.string(),
          ogDescription: z.string(),
        }),
        portfolio: z.object({
          title: z.string(),
          description: z.string(),
          ogTitle: z.string(),
          ogDescription: z.string(),
        }),
        resources: z.object({
          title: z.string(),
          description: z.string(),
          ogTitle: z.string(),
          ogDescription: z.string(),
        }),
        calculators: z.object({
          title: z.string(),
          description: z.string(),
          ogTitle: z.string(),
          ogDescription: z.string(),
        }),
        blogs: z.object({
          title: z.string(),
          description: z.string(),
          ogTitle: z.string(),
          ogDescription: z.string(),
        }),
        brands: z.object({
          title: z.string(),
          description: z.string(),
          ogTitle: z.string(),
          ogDescription: z.string(),
        }),
        locations: z.object({
          title: z.string(),
          description: z.string(),
          ogTitle: z.string(),
          ogDescription: z.string(),
        }),
      }),
      theme: z.object({
        primary: z.string(),
        electric: z.string(),
        background: z.string(),
        logo: z.string().optional(),
        favicon: z.string().optional(),
      }),
      faqs: z.array(
        z.object({
          id: z.string(),
          q: z.string(),
          a: z.string(),
        }),
      ),
      whatsapp: z.object({
        enabled: z.boolean(),
        number: z.string(),
        defaultMessage: z.string(),
      }),
      socials: z.object({
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
        youtube: z.string().optional(),
        twitter: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
      }),
      smtp: z.object({
        enabled: z.boolean(),
        host: z.string(),
        port: z.number(),
        user: z.string(),
        pass: z.string(),
        secure: z.boolean(),
        fromName: z.string(),
        fromEmail: z.string(),
      }),
      stats: z
        .array(
          z.object({
            value: z.string(),
            label: z.string(),
          }),
        )
        .optional(),
      services: z
        .array(
          z.object({
            id: z.string(),
            category: z.enum(["domestic", "industrial"]),
            title: z.string(),
            desc: z.string(),
            image: z.string(),
            icon: z.string(),
          }),
        )
        .optional(),
      amcTiers: z
        .array(
          z.object({
            name: z.string(),
            audience: z.string(),
            price: z.string(),
            icon: z.string(),
            points: z.array(z.string()),
            featured: z.boolean().optional(),
          }),
        )
        .optional(),
      regions: z.array(z.string()).optional(),
    }),
  )
  .handler(async ({ data }) => {
    return await updateCmsSettingsHelper(data);
  });

export const getFaqs = createServerFn({ method: "GET" }).handler(async (): Promise<{ faqs: any }> => {
  return await getFaqsHelper();
});

export const addFaq = createServerFn({ method: "POST" })
  .validator(
    z.object({
      q: z.string(),
      a: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    return await addFaqHelper(data);
  });

export const updateFaq = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      q: z.string().optional(),
      a: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    return await updateFaqHelper(data);
  });

export const deleteFaq = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return await deleteFaqHelper(data);
  });

// 7. Blogs Server Functions
export const getPublicBlogs = createServerFn({ method: "GET" }).handler(async (): Promise<{ blogs: any }> => {
  return await getPublicBlogsHelper();
});

export const getAdminBlogs = createServerFn({ method: "GET" }).handler(async (): Promise<{ blogs: any }> => {
  return await getAdminBlogsHelper();
});

export const createBlog = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string(),
      slug: z.string(),
      content: z.string(),
      summary: z.string(),
      category: z.string().optional(),
      author: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDesc: z.string().optional(),
      seoKeywords: z.string().optional(),
      imageFile: z.object({ name: z.string(), base64: z.string() }).optional(),
    }),
  )
  .handler(async ({ data }) => {
    return await createBlogHelper(data);
  });

export const updateBlog = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      slug: z.string().optional(),
      content: z.string().optional(),
      summary: z.string().optional(),
      category: z.string().optional(),
      author: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDesc: z.string().optional(),
      seoKeywords: z.string().optional(),
      imageFile: z.object({ name: z.string(), base64: z.string() }).optional(),
    }),
  )
  .handler(async ({ data }) => {
    return await updateBlogHelper(data);
  });

export const deleteBlog = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return await deleteBlogHelper(data);
  });

export const getDbStatus = createServerFn({ method: "GET" }).handler(async () => {
  return await getDbStatusHelper();
});

// 8. Services Server Functions
export const getPublicServices = createServerFn({ method: "GET" }).handler(async (): Promise<{ services: any }> => {
  return await getPublicServicesHelper();
});

export const getAdminServices = createServerFn({ method: "GET" }).handler(async (): Promise<{ services: any }> => {
  return await getAdminServicesHelper();
});

export const createService = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string(),
      slug: z.string(),
      description: z.string(),
      category: z.string(),
      icon: z.string().optional(),
      isPopular: z.boolean(),
      orderIndex: z.number(),
      seoTitle: z.string().optional(),
      seoDesc: z.string().optional(),
      seoKeywords: z.string().optional(),
      imageFile: z.object({ name: z.string(), base64: z.string() }).optional(),
    }),
  )
  .handler(async ({ data }) => {
    return await createServiceHelper(data);
  });

export const updateService = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      slug: z.string().optional(),
      description: z.string().optional(),
      category: z.string().optional(),
      icon: z.string().optional(),
      isPopular: z.boolean().optional(),
      orderIndex: z.number().optional(),
      seoTitle: z.string().optional(),
      seoDesc: z.string().optional(),
      seoKeywords: z.string().optional(),
      imageFile: z.object({ name: z.string(), base64: z.string() }).optional(),
    }),
  )
  .handler(async ({ data }) => {
    return await updateServiceHelper(data);
  });

export const deleteService = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return await deleteServiceHelper(data);
  });

// 9. Calculators Server Functions
export const getCalculatorsList = createServerFn({ method: "GET" }).handler(async (): Promise<{ calculators: any }> => {
  return await getCalculatorsHelper();
});

export const updateCalculatorMeta = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      slug: z.string().optional(),
      description: z.string().optional(),
      isActive: z.boolean().optional(),
      seoTitle: z.string().optional(),
      seoDesc: z.string().optional(),
      seoKeywords: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    return await updateCalculatorHelper(data);
  });

// 10. Locations Server Functions
export const getLocations = createServerFn({ method: "GET" }).handler(async (): Promise<{ locations: any }> => {
  return await getLocationsHelper();
});

export const addLocation = createServerFn({ method: "POST" })
  .validator(
    z.object({
      slug: z.string(),
      name: z.string(),
      type: z.string(),
      pincodes: z.array(z.string()),
      landmarks: z.array(z.string()),
      nearbyBusinesses: z.array(z.string()),
      reviews: z.array(
        z.object({
          author: z.string(),
          rating: z.number(),
          text: z.string(),
          role: z.string().optional(),
        })
      ),
      mapEmbedUrl: z.string(),
      faqs: z.array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      ),
      seoTitle: z.string().optional(),
      seoDesc: z.string().optional(),
      seoKeywords: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    return await addLocationHelper(data);
  });

export const updateLocation = createServerFn({ method: "POST" })
  .validator(
    z.object({
      slug: z.string(),
      name: z.string().optional(),
      type: z.string().optional(),
      pincodes: z.array(z.string()).optional(),
      landmarks: z.array(z.string()).optional(),
      nearbyBusinesses: z.array(z.string()).optional(),
      reviews: z.array(
        z.object({
          author: z.string(),
          rating: z.number(),
          text: z.string(),
          role: z.string().optional(),
        })
      ).optional(),
      mapEmbedUrl: z.string().optional(),
      faqs: z.array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      ).optional(),
      seoTitle: z.string().optional(),
      seoDesc: z.string().optional(),
      seoKeywords: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    return await updateLocationHelper(data);
  });

export const deleteLocation = createServerFn({ method: "POST" })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    return await deleteLocationHelper(data);
  });
