import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  "home": { en: "Home", hi: "होम" },
  "services": { en: "Services", hi: "सेवाएं" },
  "doctors": { en: "Doctors", hi: "डॉक्टर" },
  "gallery": { en: "Gallery", hi: "गैलरी" },
  "contact": { en: "Contact", hi: "संपर्क" },
  "bookAppointment": { en: "Book Appointment", hi: "अपॉइंटमेंट बुक करें" },
  "aboutUs": { en: "About Us", hi: "हमारे बारे में" },
  "workingHours": { en: "Working Hours", hi: "कार्य करने का समय" },
  "emergency": { en: "Emergency Case", hi: "आपातकालीन मामला" },
  "callNow": { en: "Call Now", hi: "अभी कॉल करें" },
  "ourServices": { en: "Our Services", hi: "हमारी सेवाएं" },
  "meetOurDoctors": { en: "Meet Our Specialists", hi: "हमारे विशेषज्ञों से मिलें" },
  "clinicGallery": { en: "Clinic Gallery", hi: "क्लिनिक गैलरी" },
  "getInTouch": { en: "Get In Touch", hi: "संपर्क में रहें" },
  "patientName": { en: "Patient Name", hi: "मरीज का नाम" },
  "phoneNumber": { en: "Phone Number", hi: "फ़ोन नंबर" },
  "selectService": { en: "Select Service", hi: "सेवा चुनें" },
  "selectDoctor": { en: "Select Doctor", hi: "डॉक्टर चुनें" },
  "preferredDate": { en: "Preferred Date", hi: "पसंदीदा तिथि" },
  "preferredTime": { en: "Preferred Time", hi: "पसंदीदा समय" },
  "messageOptional": { en: "Message (Optional)", hi: "संदेश (वैकल्पिक)" },
  "submit": { en: "Submit Request", hi: "जमा करें" },
  "underMaintenance": { en: "Website Under Maintenance", hi: "वेबसाइट रखरखाव के अधीन है" },
  "maintenanceMsg": { en: "We are currently updating our website to serve you better. Please check back soon.", hi: "हम आपको बेहतर सेवा देने के लिए वर्तमान में अपनी वेबसाइट को अपडेट कर रहे हैं। कृपया जल्द ही वापस देखें।" }
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
