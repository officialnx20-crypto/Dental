import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type GalleryImage, type InsertGalleryImage } from "@shared/schema";

export function useGallery() {
  return useQuery({
    queryKey: ['/api/gallery'],
    queryFn: async () => {
      const res = await fetch('/api/gallery');
      if (!res.ok) throw new Error('Failed to fetch gallery');
      return res.json() as Promise<GalleryImage[]>;
    },
  });
}

export function useCreateGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertGalleryImage) => {
      const secretKey = localStorage.getItem('admin_secret_key');
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secretKey}`
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to add image');
      return res.json() as Promise<GalleryImage>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
    },
  });
}

export function useDeleteGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const secretKey = localStorage.getItem('admin_secret_key');
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${secretKey}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete image');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
    },
  });
}