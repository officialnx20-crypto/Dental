import { z } from "zod";

// --- Services ---
export const insertServiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
});
export const serviceSchema = insertServiceSchema.extend({
  id: z.string(),
});
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = z.infer<typeof serviceSchema>;

// --- Doctors ---
export const insertDoctorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  qualification: z.string().min(1, "Qualification is required"),
  experience: z.string().min(1, "Experience is required"),
  specialization: z.string().min(1, "Specialization is required"),
  imageUrl: z.string().optional(),
});
export const doctorSchema = insertDoctorSchema.extend({
  id: z.string(),
});
export type InsertDoctor = z.infer<typeof insertDoctorSchema>;
export type Doctor = z.infer<typeof doctorSchema>;

// --- Gallery ---
export const insertGalleryImageSchema = z.object({
  imageUrl: z.string().min(1, "Image URL is required"),
  title: z.string().optional(),
});
export const galleryImageSchema = insertGalleryImageSchema.extend({
  id: z.string(),
});
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type GalleryImage = z.infer<typeof galleryImageSchema>;

// --- Appointments ---
export const insertAppointmentSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  doctorId: z.string().min(1, "Doctor selection is required"),
  serviceId: z.string().min(1, "Service selection is required"),
  preferredDate: z.string().min(1, "Date is required"),
  preferredTime: z.string().min(1, "Time is required"),
  message: z.string().optional(),
});
export const appointmentSchema = insertAppointmentSchema.extend({
  id: z.string(),
  status: z.enum(["Pending", "Confirmed", "Completed"]).default("Pending"),
  createdAt: z.string(),
});
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = z.infer<typeof appointmentSchema>;

// --- Content / Settings ---
export const socialLinksSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  whatsapp: z.string().optional(),
});

export const contentSettingsSchema = z.object({
  id: z.union([z.string(), z.number()]).default("main"),
  clinicAddress: z.string().default("Singla Dental Clinic, 123 Main St"),
  mapLocationLink: z.string().default("https://maps.google.com"),
  phoneNumber: z.string().default("+1234567890"),
  email: z.string().default("contact@singladental.com"),
  workingHours: z.array(z.string()).default(["Mon-Fri: 9AM - 8PM", "Sat: 10AM - 5PM", "Sun: Closed"]),
  whatsappNumber: z.string().default("+1234567890"),
  emergencyNumber: z.string().default("+1999999999"),
  aboutText: z.string().default("Welcome to Singla Dental Clinic. We provide advanced dental care and smile solutions."),
  socialLinks: socialLinksSchema.default({}),
  adminSecretKey: z.string().default("singla_admin_2026"),
  adminEmail: z.string().optional(),
  websiteMode: z.enum(["Public", "Private"]).default("Public"),
});
export type ContentSettings = z.infer<typeof contentSettingsSchema>;
export type SocialLinks = z.infer<typeof socialLinksSchema>;

// Auth for admin
export const loginSchema = z.object({
  secretKey: z.string().min(1, "Secret key is required"),
});