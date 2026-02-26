import { useGallery } from "@/hooks/use-gallery";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

export default function Gallery() {
  const { data: gallery, isLoading } = useGallery();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">{t("clinicGallery")}</h1>
          <p className="text-lg text-slate-600">
            Take a tour of our state-of-the-art facilities and see the happy smiles we've created.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-slate-200 rounded-2xl aspect-square animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery?.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100"
              >
                <img 
                  src={img.imageUrl} 
                  alt={img.title || "Gallery image"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {img.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white font-medium">{img.title}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
