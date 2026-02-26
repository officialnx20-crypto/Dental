import { useState } from "react";
import { useLocation } from "wouter";
import { useLogin } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [secretKey, setSecretKey] = useState("");
  const login = useLogin();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login.mutateAsync(secretKey);
      setLocation('/admin-singla-access-2026');
    } catch (error) {
      toast({ title: "Login Failed", description: "Invalid secret key", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-display font-bold text-center text-slate-900 mb-2">Admin Access</h1>
        <p className="text-slate-500 text-center mb-8">Enter your secure key to access the clinic dashboard.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Input 
              type="password" 
              placeholder="Secret Key" 
              value={secretKey}
              onChange={e => setSecretKey(e.target.value)}
              className="h-14 rounded-xl text-lg text-center tracking-widest bg-slate-50 border-transparent focus:border-primary focus:bg-white"
            />
          </div>
          <Button type="submit" className="w-full h-14 rounded-xl text-lg" disabled={login.isPending}>
            {login.isPending ? "Verifying..." : "Enter Portal"}
          </Button>
        </form>
      </div>
    </div>
  );
}
