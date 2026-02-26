import { Phone, MessageCircle } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";

export function FloatingActions() {
  const { data: settings } = useSettings();

  if (!settings) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {settings.phoneNumber && (
        <a
          href={`tel:${settings.phoneNumber}`}
          className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          aria-label="Call Clinic"
        >
          <Phone className="w-6 h-6" />
        </a>
      )}
      {settings.whatsappNumber && (
        <a
          href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          aria-label="WhatsApp Clinic"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      )}
    </div>
  );
}
