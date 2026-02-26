import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/LanguageContext";
import { useSettings } from "@/hooks/use-settings";

// Components
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { MaintenanceScreen } from "@/components/MaintenanceScreen";
import NotFound from "@/pages/not-found";

// Public Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Doctors from "@/pages/Doctors";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import BookAppointment from "@/pages/BookAppointment";

// Admin Pages
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminAppointments from "@/pages/admin/Appointments";
import AdminServices from "@/pages/admin/Services";
import AdminDoctors from "@/pages/admin/Doctors";
import AdminGallery from "@/pages/admin/Gallery";
import AdminSettings from "@/pages/admin/Settings";

// Wrapper for public routes to check maintenance mode
function PublicLayout({ children }: { children: React.ReactNode }) {
  const { data: settings, isLoading } = useSettings();

  if (isLoading) return <div className="min-h-screen bg-background" />;
  
  if (settings?.websiteMode === 'Private') {
    return <MaintenanceScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin Routes - No Public Layout */}
      <Route path="/admin-singla-access-2026/login" component={AdminLogin} />
      <Route path="/admin-singla-access-2026" component={AdminDashboard} />
      <Route path="/admin-singla-access-2026/appointments" component={AdminAppointments} />
      <Route path="/admin-singla-access-2026/services" component={AdminServices} />
      <Route path="/admin-singla-access-2026/doctors" component={AdminDoctors} />
      <Route path="/admin-singla-access-2026/gallery" component={AdminGallery} />
      <Route path="/admin-singla-access-2026/settings" component={AdminSettings} />

      {/* Public Routes wrapped in Layout */}
      <Route path="/">
        <PublicLayout><Home /></PublicLayout>
      </Route>
      <Route path="/services">
        <PublicLayout><Services /></PublicLayout>
      </Route>
      <Route path="/doctors">
        <PublicLayout><Doctors /></PublicLayout>
      </Route>
      <Route path="/gallery">
        <PublicLayout><Gallery /></PublicLayout>
      </Route>
      <Route path="/contact">
        <PublicLayout><Contact /></PublicLayout>
      </Route>
      <Route path="/book">
        <PublicLayout><BookAppointment /></PublicLayout>
      </Route>

      {/* Fallback to 404 */}
      <Route>
        <PublicLayout><NotFound /></PublicLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
