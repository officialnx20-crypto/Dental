import { z } from 'zod';
import { 
  insertServiceSchema, serviceSchema,
  insertDoctorSchema, doctorSchema,
  insertGalleryImageSchema, galleryImageSchema,
  insertAppointmentSchema, appointmentSchema,
  contentSettingsSchema, loginSchema
} from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  unauthorized: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/auth/login' as const,
      input: loginSchema,
      responses: {
        200: z.object({ success: z.boolean(), message: z.string() }),
        401: errorSchemas.unauthorized,
      }
    },
    verify: {
      method: 'GET' as const,
      path: '/api/auth/verify' as const,
      responses: {
        200: z.object({ authenticated: z.boolean() }),
        401: errorSchemas.unauthorized,
      }
    }
  },
  services: {
    list: {
      method: 'GET' as const,
      path: '/api/services' as const,
      responses: { 200: z.array(serviceSchema) }
    },
    create: {
      method: 'POST' as const,
      path: '/api/services' as const,
      input: insertServiceSchema,
      responses: { 201: serviceSchema, 400: errorSchemas.validation }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/services/:id' as const,
      input: insertServiceSchema.partial(),
      responses: { 200: serviceSchema, 404: errorSchemas.notFound }
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/services/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound }
    }
  },
  doctors: {
    list: {
      method: 'GET' as const,
      path: '/api/doctors' as const,
      responses: { 200: z.array(doctorSchema) }
    },
    create: {
      method: 'POST' as const,
      path: '/api/doctors' as const,
      input: insertDoctorSchema,
      responses: { 201: doctorSchema, 400: errorSchemas.validation }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/doctors/:id' as const,
      input: insertDoctorSchema.partial(),
      responses: { 200: doctorSchema, 404: errorSchemas.notFound }
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/doctors/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound }
    }
  },
  gallery: {
    list: {
      method: 'GET' as const,
      path: '/api/gallery' as const,
      responses: { 200: z.array(galleryImageSchema) }
    },
    create: {
      method: 'POST' as const,
      path: '/api/gallery' as const,
      input: insertGalleryImageSchema,
      responses: { 201: galleryImageSchema, 400: errorSchemas.validation }
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/gallery/:id' as const,
      responses: { 204: z.void(), 404: errorSchemas.notFound }
    }
  },
  appointments: {
    list: {
      method: 'GET' as const,
      path: '/api/appointments' as const,
      responses: { 200: z.array(appointmentSchema) }
    },
    create: {
      method: 'POST' as const,
      path: '/api/appointments' as const,
      input: insertAppointmentSchema,
      responses: { 201: appointmentSchema, 400: errorSchemas.validation }
    },
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/appointments/:id/status' as const,
      input: z.object({ status: z.enum(["Pending", "Confirmed", "Completed"]) }),
      responses: { 200: appointmentSchema, 404: errorSchemas.notFound }
    }
  },
  settings: {
    get: {
      method: 'GET' as const,
      path: '/api/settings' as const,
      responses: { 200: contentSettingsSchema }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/settings' as const,
      input: contentSettingsSchema.partial(),
      responses: { 200: contentSettingsSchema, 400: errorSchemas.validation }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// Type helpers
export type ServiceResponse = z.infer<typeof api.services.create.responses[201]>;
export type DoctorResponse = z.infer<typeof api.doctors.create.responses[201]>;
export type GalleryResponse = z.infer<typeof api.gallery.create.responses[201]>;
export type AppointmentResponse = z.infer<typeof api.appointments.create.responses[201]>;
export type SettingsResponse = z.infer<typeof api.settings.get.responses[200]>;