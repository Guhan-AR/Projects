import { motion } from "motion/react";
import { Heart, ShieldCheck, Users, Award } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary font-sans uppercase tracking-[0.2em] text-sm font-black mb-3 drop-shadow-sm">About Us</h2>
            <h3 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-6 tracking-tight leading-tight">Providing Quality Healthcare For Over 25 Years</h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Ark Hospital was founded with a simple mission: to provide high-quality, compassionate medical care to everyone in our community. What started as a small clinic has grown into a trusted healthcare facility in Krishnagiri.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Led by Dr. Radha Krishnan and followed by Dr. Venkatesh R., our team combines advanced medical technology with a deeply personal approach to patient care. We believe that healthcare is a human right, and we strive to make our services accessible, affordable, and exceptional.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="p-6 rounded-2xl bg-muted/50 border border-primary/10">
                <Heart className="h-8 w-8 text-primary mb-4" />
                <h4 className="font-bold text-brand-dark mb-2">Our Mission</h4>
                <p className="text-sm text-muted-foreground">To deliver compassionate, high-quality healthcare that improves the lives of our patients and their families.</p>
              </div>
              <div className="p-6 rounded-2xl bg-muted/50 border border-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary mb-4" />
                <h4 className="font-bold text-brand-dark mb-2">Our Vision</h4>
                <p className="text-sm text-muted-foreground">To be the most trusted healthcare provider in Krishnagiri, recognized for clinical excellence and innovation.</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Happy Patients", value: "15k+", icon: Users, color: "bg-primary/10 text-primary" },
                { label: "Years Experience", value: "25+", icon: Award, color: "bg-brand-orange/10 text-brand-orange" },
                { label: "Medical Staff", value: "50+", icon: Heart, color: "bg-emerald-50 text-emerald-600" },
                { label: "Specializations", value: "10+", icon: ShieldCheck, color: "bg-purple-50 text-purple-600" },
              ].map((stat) => (
                <div key={stat.label} className="p-8 rounded-3xl bg-white shadow-lg border border-muted hover:border-primary/20 transition-all text-center group">
                  <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-widest font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
