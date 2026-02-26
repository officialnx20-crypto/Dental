import { ReactNode } from "react";
import { Link, useLocation, Redirect } from "wouter";
import { Calendar, Stethoscope, Users, Image as ImageIcon, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth, useLogout } from "@/hooks/use-auth";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const { data: auth, isLoading } = useAuth();
  const logout = useLogout();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!auth?.authenticated && location !== '/admin-singla-access-2026/login') {
    return <Redirect to="/admin-singla-access-2026/login" />;
  }

  const handleLogout = () => {
    logout();
    setLocation('/admin-singla-access-2026/login');
  };

  const menu = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin-singla-access-2026" },
    { icon: Calendar, label: "Appointments", href: "/admin-singla-access-2026/appointments" },
    { icon: Stethoscope, label: "Services", href: "/admin-singla-access-2026/services" },
    { icon: Users, label: "Doctors", href: "/admin-singla-access-2026/doctors" },
    { icon: ImageIcon, label: "Gallery", href: "/admin-singla-access-2026/gallery" },
    { icon: Settings, label: "Settings", href: "/admin-singla-access-2026/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0 z-10">
        <div className="p-6 border-b border-slate-800">
          <h2 className="font-display font-bold text-white text-xl">Clinic Admin</h2>
          <p className="text-xs text-slate-500 mt-1">Management Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menu.map((item) => {
            const active = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  active ? "bg-primary text-white shadow-md" : "hover:bg-slate-800 hover:text-white"
                }`}>
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
