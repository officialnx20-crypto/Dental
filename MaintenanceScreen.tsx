import { useLanguage } from "@/lib/LanguageContext";
import { Settings } from "lucide-react";

export function MaintenanceScreen() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
        <Settings className="w-12 h-12 text-primary animate-spin-slow" />
      </div>
      <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
        {t("underMaintenance")}
      </h1>
      <p className="text-lg text-muted-foreground max-w-lg">
        {t("maintenanceMsg")}
      </p>
    </div>
  );
}
