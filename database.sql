-- SQL Database Schema and Initial Seed Data for Prime Cool
-- Compatible with MySQL 5.7+ / MariaDB / Hostinger phpMyAdmin

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table Structure for `visits`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `visits` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `count` INT DEFAULT 152
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `visits` (`id`, `count`) VALUES (1, 152) ON DUPLICATE KEY UPDATE `id`=`id`;

-- --------------------------------------------------------
-- Table Structure for `admin_settings`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `admin_settings` (
  `username` VARCHAR(255) PRIMARY KEY,
  `passwordHash` VARCHAR(255) NOT NULL,
  `salt` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default login credentials:
-- Username: admin
-- Password: admin123
INSERT INTO `admin_settings` (`username`, `passwordHash`, `salt`) 
VALUES ('admin', '51701dd42a9f6f315d8bda4564a0213c75e461b86ecfab0eab5564b93c6937a3', 'fca757ba8a3ed50e1a43da133e16b75a')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- --------------------------------------------------------
-- Table Structure for `sessions`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sessions` (
  `token` VARCHAR(255) PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `expiresAt` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table Structure for `bookings`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `bookings` (
  `id` VARCHAR(50) PRIMARY KEY,
  `customerName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `serviceType` VARCHAR(255) NOT NULL,
  `date` VARCHAR(20) NOT NULL,
  `timeSlot` VARCHAR(20) NOT NULL,
  `notes` TEXT,
  `status` VARCHAR(50) NOT NULL,
  `createdAt` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table Structure for `portfolio`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `portfolio` (
  `id` VARCHAR(50) PRIMARY KEY,
  `location` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `summary` TEXT NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `metrics_json` TEXT NOT NULL,
  `image` TEXT,
  `createdAt` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `portfolio` (`id`, `location`, `title`, `summary`, `category`, `metrics_json`, `image`, `createdAt`) VALUES
('p1', 'Wagholi · Commercial', 'Emergency Deep Freezer Revival', 'A retail grocer\'s 1,200L commercial deep freezer failed at 11:42 PM. Our on-call engineer arrived within 38 minutes, diagnosed a failed start capacitor and refrigerant leak, sealed the line, recharged R-404A and restored sub-zero hold before opening hours.', 'commercial', '[{\"value\":\"38 min\",\"label\":\"On-site response\"},{\"value\":\"₹1.8L\",\"label\":\"Stock loss prevented\"},{\"value\":\"0\",\"label\":\"Hours of trading lost\"}]', NULL, '2026-05-23T11:07:12.187Z'),
('p2', 'Karegaon MIDC · Industrial', 'Cooling Tower Complete Overhaul', 'Replaced degraded PVC fills, drift eliminators and corroded distribution nozzles on a 350 TR induced-draft cooling tower. Realigned the gearbox, balanced the fan blades and calibrated the make-up water valves — restoring designed approach temperature.', 'industrial', '[{\"value\":\"+22%\",\"label\":\"Thermal efficiency\"},{\"value\":\"−18%\",\"label\":\"Power draw\"},{\"value\":\"3 days\",\"label\":\"Total turnaround\"}]', NULL, '2026-06-07T11:07:12.187Z'),
('p3', 'Shikrapur · Corporate', '14-Unit AC Rollout + AMC', 'Designed and installed 14 inverter split ACs across two corporate floors with custom copper runs and concealed drain lines. Onboarded the client to our Commercial Routine AMC with quarterly servicing and a logged diagnostics dashboard.', 'domestic', '[{\"value\":\"14\",\"label\":\"Units commissioned\"},{\"value\":\"4 yr\",\"label\":\"AMC contracted\"},{\"value\":\"100%\",\"label\":\"Genuine OEM parts\"}]', NULL, '2026-06-17T11:07:12.187Z')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- --------------------------------------------------------
-- Table Structure for `notifications`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `notifications` (
  `id` VARCHAR(50) PRIMARY KEY,
  `recipient` VARCHAR(255) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `subject` VARCHAR(255),
  `message` TEXT NOT NULL,
  `sentAt` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table Structure for `cms_settings`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cms_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `settings_json` LONGTEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cms_settings` (`id`, `settings_json`) VALUES (1, '{\"hero\":{\"title1\":\"Engineered cooling.\",\"title2\":\"Mechanical precision.\",\"subtitle\":\"Prime Cool is a premier provider of HVAC, appliance repair, and heavy industrial mechanical solutions — from your home AC to factory-scale cooling towers.\",\"cta1Text\":\"Book a Service\",\"cta1Link\":\"/booking\",\"cta2Text\":\"7507408461\",\"cta2Link\":\"tel:+917507408461\"},\"seo\":{\"home\":{\"title\":\"Prime Cool — HVAC, Appliance & Industrial Mechanical Solutions\",\"description\":\"Rapid-response HVAC, refrigeration, washing machine and heavy industrial mechanical service across Pune, Wagholi to Shirur, Karegaon and Ranjangaon.\",\"ogTitle\":\"Prime Cool — Engineered Climate & Mechanical Solutions\",\"ogDescription\":\"From split ACs to factory cooling towers — precision engineering, AMCs, and zero-downtime maintenance.\"},\"booking\":{\"title\":\"Book a Service — Prime Cool Mechanical Solutions\",\"description\":\"Schedule rapid-response HVAC, appliance repair, or industrial mechanical servicing in Pune. Check live slot availability and book online.\",\"ogTitle\":\"Book Online — Prime Cool Mechanical Solutions\",\"ogDescription\":\"Schedule rapid-response servicing. Select a date, time slot, and service type.\"},\"portfolio\":{\"title\":\"Previous Works & Case Studies — Prime Cool\",\"description\":\"Check out our previous works, client projects, and mechanical engineering case studies across Pune.\",\"ogTitle\":\"Portfolio — Prime Cool\",\"ogDescription\":\"Case studies and maintenance logs from Wagholi–Shirur and MIDC plants.\"}},\"theme\":{\"primary\":\"#0ea5e9\",\"electric\":\"#8b5cf6\",\"background\":\"#020617\"},\"faqs\":[{\"id\":\"faq-1\",\"q\":\"How fast can you respond to an emergency call?\",\"a\":\"Within the Wagholi–Shirur corridor we target an on-site response of under 60 minutes for residential calls and under 4 hours for industrial SLAs under our Zero-Downtime AMC. Off-route locations are quoted per site.\"},{\"id\":\"faq-2\",\"q\":\"What does an Annual Maintenance Contract actually cover?\",\"a\":\"Scheduled preventative visits, jet/dry chemical cleaning, gas pressure verification, electrical safety checks, and a logged diagnostics report after every visit. Industrial tiers add valve and pressure-gauge calibration plus pre-staged spares.\"},{\"id\":\"faq-3\",\"q\":\"What is your service radius?\",\"a\":\"We operate a dedicated route from Wagholi through Lonikand, Kesnand, Koregaon Bhima, Shikrapur and Shirur, with embedded support at Karegaon and Ranjangaon MIDC. Other parts of Pune are served on request.\"},{\"id\":\"faq-4\",\"q\":\"Do you provide a warranty on spare parts?\",\"a\":\"Yes. Every genuine OEM spare we install carries the manufacturer warranty (typically 6–24 months depending on the component), backed by our own workmanship guarantee on the labour.\"},{\"id\":\"faq-5\",\"q\":\"Do you handle both domestic appliances and industrial machinery?\",\"a\":\"Yes. The same team services home ACs, refrigerators and washing machines as well as commercial chillers, cooling towers, industrial valves and capacitor banks — the difference is the scale of equipment and the spares we carry on the visit.\"}],\"whatsapp\":{\"enabled\":true,\"number\":\"+917507408461\",\"defaultMessage\":\"Hi Prime Cool, I need assistance with...\"},\"socials\":{\"facebook\":\"https://facebook.com/primecool\",\"instagram\":\"https://instagram.com/primecool\",\"linkedin\":\"https://linkedin.com/company/primecool\",\"youtube\":\"https://youtube.com/primecool\",\"twitter\":\"https://twitter.com/primecool\",\"email\":\"support@primecool.in\",\"phone\":\"+917507408461\"},\"smtp\":{\"enabled\":false,\"host\":\"smtp.hostinger.com\",\"port\":465,\"user\":\"booking@primecool.in\",\"pass\":\"\",\"secure\":true,\"fromName\":\"Prime Cool Booking System\",\"fromEmail\":\"booking@primecool.in\"}}')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- --------------------------------------------------------
-- Table Structure for `blogs`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `blogs` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `summary` TEXT NOT NULL,
  `image` TEXT,
  `createdAt` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `blogs` (`id`, `title`, `slug`, `content`, `summary`, `image`, `createdAt`) VALUES
('blog-1', 'Daikin vs Hitachi AC: Which is Better for Indian Summers?', 'daikin-vs-hitachi-ac-which-is-better-for-indian-summers-2025-guide', 'Choosing between Daikin and Hitachi split ACs is one of the most common dilemmas for Indian homeowners. Both brands represent premium engineering, but they serve slightly different operational requirements.\n\n### 1. Cooling Performance\nDaikin ACs are known for their rapid cooling technology (Power Chill mode) and robust performance in extreme ambient temperatures (up to 54°C). Hitachi uses a unique Expandable Inverter technology that adjusts compressor speed based on indoor heat load, making it exceptionally good at humidity control.\n\n### 2. Energy Efficiency\nBoth brands offer high ISEER ratings (typically between 5.0 and 5.4 for 5-star models). Daikin inverter units are slightly more optimized for continuous, low-load running, while Hitachi performs better in heavy heat load variations.\n\n### 3. Reliability and Maintenance\n- **Daikin**: Uses high-quality copper tubes and anti-corrosion fins. Spares are easily available along major urban corridors.\n- **Hitachi**: Features robust build quality but complex PCB boards. Servicing requires certified diagnostic tools.\n\nAt Prime Cool, we service and install both brands along the Wagholi–Shirur route. For high-humidity zones like Pune east, Hitachi is highly recommended, whereas for raw cooling speed, Daikin leads.', 'An engineering comparison between Daikin and Hitachi split AC systems, looking at cooling curves, compressor tech, and maintenance overheads in India.', '/uploads/blogs/daikin-vs-hitachi.jpg', '2026-06-26T21:41:25Z'),
('blog-2', 'Top 5 Reasons Your Refrigerator is Not Cooling (and How to Fix It)', 'top-5-reasons-your-refrigerator-is-not-cooling-and-how-to-fix-it', 'A refrigerator that has stopped cooling can lead to food spoilage. Before calling in an engineer, check these common fault points:\n\n### 1. Degraded Condenser Coils\nCoils located at the back or bottom of the fridge dissipate heat. If they are covered in dust or grime, heat exchange drops, causing the compressor to overheat and short-cycle. \n*Fix*: Turn off power and vacuum clean the coils.\n\n### 2. Defective Start Capacitor\nThe compressor relies on a run/start capacitor to kickstart. If this component fails, you will hear a clicking sound every few minutes, but the compressor will not hum or start.\n*Fix*: Needs replacement using a calibrated spare of identical rating.\n\n### 3. Faulty Defrost Timer / Thermostat\nIf frost builds up on the evaporator coils behind the freezer panel, airflow to the fresh food compartment will block. This is usually caused by a failed defrost heater, bimetal thermostat, or timer.\n\n### 4. Poor Door Gasket Seal\nIf the magnetic rubber gasket is torn or warped, warm humid air continuously leaks in, causing ice buildup and preventing the interior from reaching the set temperature.\n\n### 5. Low Refrigerant Charge\nA gas leak in the capillary or evaporator coil will cause the compressor to run continuously without cooling. This requires locating the leak, sealing it, vacuuming the system, and recharging R-134a or R-600a.\n\nIf you are located between Wagholi and Shirur, Prime Cool technicians carry replacement capacitors, gaskets, and gas-charging kits for rapid same-day response.', 'A practical troubleshooting checklist for homeowners to diagnose refrigerator cooling issues, from dusty coils to capacitor failure.', '/uploads/blogs/fridge-not-cooling.jpg', '2026-06-23T21:41:25Z')
ON DUPLICATE KEY UPDATE `id`=`id`;
