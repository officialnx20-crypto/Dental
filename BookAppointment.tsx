import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAppointmentSchema, type InsertAppointment } from "@shared/schema";
import { useServices } from "@/hooks/use-services";
import { useDoctors } from "@/hooks/use-doctors";
import { useSettings } from "@/hooks/use-settings";
import { useCreateAppointment } from "@/hooks/use-appointments";
import { useLanguage } from "@/lib/LanguageContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function BookAppointment() {
  const { t } = useLanguage();
  const { data: services } = useServices();
  const { data: doctors } = useDoctors();
  const { data: settings } = useSettings();
  const createAppointment = useCreateAppointment();
  
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InsertAppointment>({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: {
      patientName: "",
      phoneNumber: "",
      doctorId: "",
      serviceId: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertAppointment) => {
    try {
      // 1. Save to Database
      await createAppointment.mutateAsync(data);
      
      // 2. Open WhatsApp
      if (settings?.whatsappNumber) {
        const serviceName = services?.find(s => s.id === data.serviceId)?.name || 'Consultation';
        const docName = doctors?.find(d => d.id === data.doctorId)?.name || 'Doctor';
        
        const message = `Hello Singla Dental Clinic,\n\nI would like to book an appointment.\n\n*Name:* ${data.patientName}\n*Phone:* ${data.phoneNumber}\n*Service:* ${serviceName}\n*Doctor:* ${docName}\n*Date:* ${data.preferredDate}\n*Time:* ${data.preferredTime}\n*Message:* ${data.message || 'None'}`;
        
        const waUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
      }
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to book", error);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-xl border border-slate-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Request Sent!</h2>
          <p className="text-slate-600 mb-8">
            Your appointment request has been recorded and a WhatsApp message window has opened to confirm directly with our staff.
          </p>
          <Button onClick={() => window.location.href = '/'} className="w-full rounded-xl h-12 text-lg">
            Return to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">{t("bookAppointment")}</h1>
          <p className="text-lg text-slate-600">Fill out the form below and we will confirm your appointment via WhatsApp.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">{t("patientName")}</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-primary/20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">{t("phoneNumber")}</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 8900" className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-primary/20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="serviceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">{t("selectService")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-primary/20">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services?.map(service => (
                            <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doctorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">{t("selectDoctor")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-primary/20">
                            <SelectValue placeholder="Select a doctor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {doctors?.map(doc => (
                            <SelectItem key={doc.id} value={doc.id}>Dr. {doc.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">{t("preferredDate")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="date" className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-primary/20 pl-10" {...field} />
                          <CalendarIcon className="w-5 h-5 absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">{t("preferredTime")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="time" className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-primary/20 pl-10" {...field} />
                          <Clock className="w-5 h-5 absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">{t("messageOptional")}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any specific symptoms or questions?" 
                        className="rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-primary/20 min-h-[120px] resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-14 text-lg rounded-xl shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all"
                disabled={createAppointment.isPending}
              >
                {createAppointment.isPending ? "Processing..." : t("submit")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
