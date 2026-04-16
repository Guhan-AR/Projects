import Hero from "@/src/components/Hero";
import Services from "@/src/components/Services";
import Doctors from "@/src/components/Doctors";
import Appointment from "@/src/components/Appointment";
import Testimonials from "@/src/components/Testimonials";
import AboutSection from "@/src/components/AboutSection";
import FAQSection from "@/src/components/FAQSection";
import { motion } from "motion/react";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      
      <AboutSection />

      <Services />
      
      {/* Call to Action Banner */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/20 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tight leading-tight drop-shadow-md">Ready to get started with your health?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust Ark Hospital for their medical needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919791713759" className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-orange hover:text-brand-dark transition-all shadow-xl">
              Book Appointment Now
            </a>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      <Doctors />
      <Testimonials />

      <FAQSection />
      <Appointment />
    </motion.div>
  );
}
