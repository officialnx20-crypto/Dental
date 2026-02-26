import { useServices } from "@/hooks/use-services";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Services() {
  const { data: services, isLoading } = useServices();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">{t("ourServices")}</h1>
          <p className="text-lg text-slate-600">
            We offer a wide range of dental services using the latest technology and techniques to ensure you get the best possible care.
          </p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-3xl p-8 h-64 animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-xl transition-all group flex flex-col"
              >
                {service.imageUrl ? (
                  <div className="h-48 overflow-hidden">
                    <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="h-48 bg-primary/5 flex items-center justify-center">
                    <Shield className="w-16 h-16 text-primary/40" />
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-display font-bold mb-3">{service.name}</h3>
                  <p className="text-slate-600 flex-1">{service.description}</p>
                  <Link href={`/book?service=${service.id}`} className="mt-6">
                    <Button className="w-full rounded-xl bg-slate-100 text-slate-900 hover:bg-primary hover:text-white transition-colors">
                      {t("bookAppointment")}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
