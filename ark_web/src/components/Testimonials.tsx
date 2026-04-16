import { motion } from "motion/react";
import { MessageSquare, Star, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    content: "The care I received at Ark Hospital was exceptional. The doctors were not only professional but also deeply compassionate during my recovery.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Michael Chen",
    role: "Patient",
    content: "State-of-the-art facilities and a team that actually listens. I felt safe and well-informed throughout my entire treatment process.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Emily Rodriguez",
    role: "Patient",
    content: "From the front desk to the specialists, everyone at Ark Hospital goes above and beyond. Truly the best healthcare experience I've had.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-sans uppercase tracking-[0.2em] text-sm font-black mb-3 drop-shadow-sm">Testimonials</h2>
            <h3 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-6 tracking-tight leading-tight">What Our Patients Say</h3>
            <p className="text-lg text-muted-foreground mb-10">
              Real stories from real patients. We take pride in the lives we've touched and the health we've restored.
            </p>

            {/* Premium Social Proof Badge */}

          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-muted relative"
            >
              <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/10" />
              <div className="flex gap-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-orange text-brand-orange" />
                ))}
              </div>
              <p className="text-muted-foreground mb-8 italic">"{item.content}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-brand-dark">{item.name}</div>
                  <div className="text-xs text-primary font-medium">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <br />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-4 rounded-3xl bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-muted"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
                <Heart className="h-7 w-7 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-black text-brand-dark leading-none">15k+</div>
                <div className="text-sm font-medium text-muted-foreground mt-1">Happy Patients</div>
              </div>
            </motion.div>
          </div></motion.div>

        <div className="mt-16 text-center">
          <Button variant="outline" className="rounded-full border-2 h-12 px-8 group">
            View All Reviews <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function Heart(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

