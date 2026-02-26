import { useSettings } from "@/hooks/use-settings";
import { useLanguage } from "@/lib/LanguageContext";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const { data: settings } = useSettings();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">{t("getInTouch")}</h1>
          <p className="text-lg text-slate-600">
            We are here to help you. Reach out to us for any questions or to schedule an appointment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-start gap-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                <p className="text-slate-600 leading-relaxed">{settings?.clinicAddress}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-start gap-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-slate-600 mb-1">Main: {settings?.phoneNumber}</p>
                {settings?.emergencyNumber && (
                  <p className="text-red-500 font-medium">Emergency: {settings.emergencyNumber}</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-start gap-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">{t("workingHours")}</h3>
                <ul className="space-y-2">
                  {settings?.workingHours?.map((hour, i) => (
                    <li key={i} className="text-slate-600">{hour}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex items-center justify-center p-12 min-h-[400px]"
          >
            {settings?.mapLocationLink ? (
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Find Us on the Map</h3>
                <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                  Click the button below to view our location and get directions on Google Maps.
                </p>
                <Button 
                  size="lg" 
                  className="rounded-full px-8 shadow-lg"
                  onClick={() => window.open(settings.mapLocationLink, '_blank')}
                >
                  View Location on Google Maps
                </Button>
              </div>
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                Map location not provided
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
