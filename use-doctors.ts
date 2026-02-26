import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Doctor, type InsertDoctor } from "@shared/schema";

export function useDoctors() {
  return useQuery({
    queryKey: ['/api/doctors'],
    queryFn: async () => {
      const res = await fetch('/api/doctors');
      if (!res.ok) throw new Error('Failed to fetch doctors');
      return res.json() as Promise<Doctor[]>;
    },
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertDoctor) => {
      const secretKey = localStorage.getItem('admin_secret_key');
      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secretKey}`
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create doctor');
      return res.json() as Promise<Doctor>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/doctors'] });
    },
  });
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<InsertDoctor> & { id: string }) => {
      const secretKey = localStorage.getItem('admin_secret_key');
      const res = await fetch(`/api/doctors/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secretKey}`
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update doctor');
      return res.json() as Promise<Doctor>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/doctors'] });
    },
  });
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const secretKey = localStorage.getItem('admin_secret_key');
      const res = await fetch(`/api/doctors/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${secretKey}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete doctor');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/doctors'] });
    },
  });
}