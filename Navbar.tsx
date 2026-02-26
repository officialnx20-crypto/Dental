import { Link, useLocation } from "wouter";
import { useLanguage } from "@/lib/LanguageContext";
import { Phone, MapPin, Menu, X } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const { t, language, toggleLanguage } = useLanguage();
  const { data: settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/doctors", label: t("doctors") },
    { href: "/gallery", label: t("gallery") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            {settings?.phoneNumber && (
              <a href={`tel:${settings.phoneNumber}`} className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Phone className="w-4 h-4" />
                <span>{settings.phoneNumber}</span>
              </a>
            )}
            {settings?.clinicAddress && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{settings.clinicAddress.split(',')[0]}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span>{settings?.workingHours?.[0]}</span>
            <div className="h-4 w-px bg-white/30"></div>
            <button 
              onClick={toggleLanguage}
              className="font-semibold hover:text-white/80 transition-colors uppercase tracking-wider"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img src="/image.png" alt="Singla Dental Logo" className="w-12 h-12 rounded-xl object-contain shadow-md" />
              <div>
                <h1 className="font-display font-bold text-xl text-foreground leading-tight">Singla Dental</h1>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Advanced Clinic</p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`font-medium transition-colors hover:text-primary ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/book">
                <Button className="rounded-full px-6 font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  {t("bookAppointment")}
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-4 md:hidden">
              <button 
                onClick={toggleLanguage}
                className="text-sm font-bold text-primary uppercase"
              >
                {language === 'en' ? 'HI' : 'EN'}
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-foreground p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-semibold py-2 border-b border-border/50 ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mt-4 rounded-xl py-6 text-lg">
                  {t("bookAppointment")}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
