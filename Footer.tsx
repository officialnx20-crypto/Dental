import { Link } from "wouter";
import { useLanguage } from "@/lib/LanguageContext";
import { useSettings } from "@/hooks/use-settings";
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  const { data: settings } = useSettings();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">S</div>
              <h2 className="font-display font-bold text-xl text-white">Singla Dental</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              {settings?.aboutText || "Advanced dental care and smile solutions with state-of-the-art technology and experienced professionals."}
            </p>
            <div className="flex gap-4">
              {settings?.socialLinks?.facebook && <a href={settings.socialLinks.facebook} className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>}
              {settings?.socialLinks?.instagram && <a href={settings.socialLinks.instagram} className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>}
              {settings?.socialLinks?.twitter && <a href={settings.socialLinks.twitter} className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>}
              {settings?.socialLinks?.whatsapp && <a href={settings.socialLinks.whatsapp} className="hover:text-primary transition-colors"><MessageCircle className="w-5 h-5" /></a>}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">{t("home")}</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/services" className="hover:text-primary transition-colors">{t("services")}</Link></li>
              <li><Link href="/doctors" className="hover:text-primary transition-colors">{t("doctors")}</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">{t("gallery")}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t("contact")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">{t("contact")}</h3>
            <ul className="space-y-4 text-sm">
              <li>{settings?.clinicAddress}</li>
              <li><a href={`tel:${settings?.phoneNumber}`} className="hover:text-primary transition-colors">{settings?.phoneNumber}</a></li>
              <li><a href={`mailto:${settings?.email}`} className="hover:text-primary transition-colors">{settings?.email}</a></li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">{t("workingHours")}</h3>
            <ul className="space-y-4 text-sm">
              {settings?.workingHours?.map((hour, i) => (
                <li key={i} className="flex justify-between border-b border-slate-800 pb-2">
                  <span>{hour.split(':')[0]}</span>
                  <span className="text-white">{hour.split(':').slice(1).join(':')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Singla Dental Clinic. All rights reserved.</p>
          <Link href="/admin-singla-access-2026/login" className="hover:text-white transition-colors text-xs">Admin Access</Link>
        </div>
      </div>
    </footer>
  );
}
