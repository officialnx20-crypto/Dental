import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['/api/auth/verify'],
    queryFn: async () => {
      const secretKey = localStorage.getItem('admin_secret_key');
      const res = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${secretKey}`
        }
      });
      if (res.status === 401) return { authenticated: false };
      if (!res.ok) throw new Error('Failed to verify auth');
      return res.json() as Promise<{ authenticated: boolean }>;
    },
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (secretKey: string) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretKey }),
      });
      if (!res.ok) throw new Error('Invalid secret key');
      const data = await res.json() as { success: boolean; message: string };
      if (data.success) {
        localStorage.setItem('admin_secret_key', secretKey);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/verify'] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return () => {
    localStorage.removeItem('admin_secret_key');
    queryClient.setQueryData(['/api/auth/verify'], { authenticated: false });
    queryClient.invalidateQueries({ queryKey: ['/api/auth/verify'] });
  };
}