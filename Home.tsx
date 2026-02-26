import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Clock, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/button";
import { useLanguage } from "@/LanguageContext";
import { useServices } from "@/use-services";
import { useDoctors } from "@/use-doctors";
import { useSettings } from "@/use-settings";

// Hero Doctor Image (assets me honi chahiye)
import heroDentist from "/doctor.jpg";
import medicineImg from "/shop.jpg";

export default function Home() {
  const { t } = useLanguage();
  const { data: services } = useServices();
  const { data: doctors } = useDoctors();
  const { data: settings } = useSettings();

  return (
    <div className="w-full">
      {/* ================= PREMIUM HERO SECTION (FIXED) ================= */}
      <section
        className="relative min-h-[90vh] flex items-center pt-24 pb-24 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.95) 35%, rgba(255,255,255,0.8) 55%, rgba(255,255,255,0.15) 75%),
            url(${heroDentist})
          `,
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT TEXT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm mb-6">
                Advanced Dental Care Center
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-slate-900">
                Your Smile, <br />
                <span className="text-primary">Our Priority</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 mb-10 max-w-xl font-medium leading-relaxed">
                Advanced Dental Care with Modern Technology. Experience a new standard
                of oral healthcare at Singla Dental Clinic with expert doctors and
                patient-focused treatment.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/book">
                  <Button
                    size="lg"
                    className="rounded-full px-10 h-14 text-lg bg-primary hover:bg-[#0195A8] shadow-xl text-white"
                  >
                    Book Appointment
                  </Button>
                </Link>

                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-10 h-14 text-lg border-2 border-slate-300 hover:bg-slate-100"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 flex items-center gap-8 border-t border-slate-200 pt-8 flex-wrap">
                <div>
                  <div className="text-3xl font-bold text-slate-900">20+</div>
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Years Experience
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-slate-300"></div>

                <div>
                  <div className="text-3xl font-bold text-slate-900">5K+</div>
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Happy Patients
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-slate-300"></div>

                <div>
                  <div className="text-3xl font-bold text-slate-900">4.9★</div>
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Top Rated Clinic
                  </div>
                </div>
              </div>
            </motion.div>

            {/* EMPTY RIGHT SIDE (for spacing only) */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES PREVIEW (FIXED ERROR) ================= */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Comprehensive Dental Solutions
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              We provide advanced dental treatments using modern technology
              for safe, painless and effective oral care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "General Dentistry", desc: "Routine checkups, cleaning and preventive dental care.", icon: Shield },
              { name: "Cosmetic Dentistry", desc: "Smile designing, whitening and aesthetic treatments.", icon: Star },
              { name: "Dental Implants", desc: "Permanent and natural-looking tooth replacement solutions.", icon: CheckCircle2 },
              { name: "Root Canal Treatment", desc: "Advanced painless RCT to save natural teeth.", icon: Shield },
              { name: "Braces & Aligners", desc: "Modern orthodontic solutions for perfectly aligned teeth.", icon: ArrowRight }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl p-10 shadow border border-slate-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                  <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-slate-900">
                  {service.name}
                </h3>

                <p className="text-slate-500 leading-relaxed mb-8">
                  {service.desc}
                </p>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
                >
                  LEARN MORE <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
              <img
                src={medicineImg}
                alt="Dental Clinic"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            <div className="space-y-8">
              <span className="text-primary font-bold uppercase tracking-widest text-sm">
                Why Choose Us
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Setting the Standard in Premium Dental Care
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed">
                Singla Dental Clinic combines experienced doctors, modern equipment
                and patient-first approach to deliver high-quality dental care
                in a comfortable environment.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Modern Equipment", icon: Shield },
                  { title: "Expert Doctors", icon: Star },
                  { title: "Emergency Support", icon: Clock },
                  { title: "Personalized Care", icon: CheckCircle2 }
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-800">
                      {feature.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= APPOINTMENT CTA ================= */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Schedule Your Visit Today
              </h2>
              <p className="text-white/90 text-lg font-medium">
                Book your dental appointment online or call us instantly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/book">
                <Button className="bg-white text-primary hover:bg-slate-50 px-10 h-16 text-xl font-bold rounded-full shadow-2xl">
                  Book Online
                </Button>
              </Link>

              <a href={`tel:${settings?.phoneNumber}`}>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-10 h-16 text-xl font-bold rounded-full"
                >
                  <Phone className="w-6 h-6 mr-3" />
                  {settings?.phoneNumber || "Call Now"}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
