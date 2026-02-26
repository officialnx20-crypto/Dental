import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Service, type InsertService } from "@shared/schema";

export function useServices() {
  return useQuery({
    queryKey: ['/api/services'],
    queryFn: async () => {
      const res = await fetch('/api/services');
      if (!res.ok) throw new Error('Failed to fetch services');
      return res.json() as Promise<Service[]>;
    },
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertService) => {
      const secretKey = localStorage.getItem('admin_secret_key');
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secretKey}`
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create service');
      return res.json() as Promise<Service>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<InsertService> & { id: string }) => {
      const secretKey = localStorage.getItem('admin_secret_key');
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secretKey}`
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update service');
      return res.json() as Promise<Service>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const secretKey = localStorage.getItem('admin_secret_key');
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${secretKey}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete service');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
    },
  });
}