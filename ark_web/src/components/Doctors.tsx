import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Phone } from "lucide-react";
import { motion } from "motion/react";

const doctor = {
  name: "Dr. Venkatesh R.",
  specialty: "Cardiologist — MBBS, MD, DM",
  image: "/doctor.png",
  rating: 4.5,
  reviews: 1200,
  bio: "With over 15 years of experience in interventional cardiology, Dr. Venkatesh R. is a leading expert in cardiac diagnostics, angioplasty, and heart failure management. He is committed to delivering compassionate, evidence-based care to every patient.",
  expertise: [
    "Interventional Cardiology",
    "Echocardiography",
    "Cardiac Catheterization",
    "Preventive Cardiology",
    "Heart Failure Management",
    "Pacemaker Implantation",
  ],
};

export default function Doctors() {
  return (
    <section id="doctors" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-sans uppercase tracking-[0.2em] text-sm font-black mb-3 drop-shadow-sm">Our Expert</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-brand-dark tracking-tight leading-none">Meet Our Qualified Doctor</h3>
        </div>

        {/* Single Doctor — Premium Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="overflow-hidden border-none shadow-2xl">
            <div className="grid md:grid-cols-2">
              {/* Image Side */}
              <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden bg-gradient-to-br from-primary/5 to-brand-orange/5">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-full w-full object-cover object-top"
                />
                {/* Gradient overlay on bottom for mobile */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white md:hidden" />
              </div>

              {/* Info Side */}
              <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                <Badge variant="secondary" className="mb-4 w-fit bg-primary/10 text-primary hover:bg-primary/20 border-none text-sm font-semibold px-4 py-1.5">
                  {doctor.specialty}
                </Badge>
                <h4 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-3 tracking-tight">{doctor.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'fill-brand-orange text-brand-orange' : i < doctor.rating ? 'fill-brand-orange/50 text-brand-orange' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-brand-dark">{doctor.rating}</span>
                  <span>({doctor.reviews.toLocaleString()} Reviews)</span>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {doctor.bio}
                </p>

                {/* Expertise Tags */}
                <div className="mb-8">
                  <h5 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">Areas of Expertise</h5>
                  <div className="flex flex-wrap gap-2">
                    {doctor.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-semibold rounded-full bg-muted text-brand-dark border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="tel:+919791713759"
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all w-full md:w-auto"
                >
                  <Phone className="h-5 w-5" />
                  Book Appointment
                </a>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
