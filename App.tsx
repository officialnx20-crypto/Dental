import { Switch, Route } from "wouter";
import { queryClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/toaster";
import { TooltipProvider } from "@/tooltip";
import { LanguageProvider } from "@/LanguageContext";
import { useSettings } from "@/use-settings";

// Components
import { Navbar } from "@/Navbar";
import { Footer } from "@/Footer";
import { FloatingActions } from "@/FloatingActions";
import { MaintenanceScreen } from "@/MaintenanceScreen";
import NotFound from "@/not-found";

// Public Pages
import Home from "@/Home";
import Services from "@/Services";
import Doctors from "@/Doctors";
import Gallery from "@/Gallery";
import Contact from "@/Contact";
import BookAppointment from "@/BookAppointment";

// Admin Pages
import AdminLogin from "@/Login";
import AdminDashboard from "@/Dashboard";
import AdminAppointments from "@/Appointments";
import AdminServices from "@/Servicess";
import AdminDoctors from "@/Doctorss";
import AdminGallery from "@/Gallerys";
import AdminSettings from "@/Settings";

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
