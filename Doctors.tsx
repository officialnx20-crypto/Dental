import { useDoctors } from "@/hooks/use-doctors";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { UserCircle } from "lucide-react";

export default function Doctors() {
  const { data: doctors, isLoading } = useDoctors();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">{t("meetOurDoctors")}</h1>
          <p className="text-lg text-slate-600">
            Our team of experienced specialists is dedicated to providing you with the highest quality dental care.
          </p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-3xl p-8 h-80 animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors?.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center p-8 group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-slate-50 shadow-inner group-hover:border-primary/20 transition-colors">
                  {doc.imageUrl ? (
                    <img src={doc.imageUrl} alt={doc.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <UserCircle className="w-16 h-16 text-slate-300" />
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-display font-bold mb-1">Dr. {doc.name}</h3>
                <p className="text-primary font-semibold mb-4">{doc.specialization}</p>
                
                <div className="w-full space-y-3 pt-6 border-t border-slate-100 mt-auto text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Qualification:</span>
                    <span>{doc.qualification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Experience:</span>
                    <span>{doc.experience}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
