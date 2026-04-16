import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Baby, Bone, Eye, Activity, Microscope, Stethoscope, Siren, HeartPulse, Scan, Filter, Sparkles, Wind, HeartHandshake, Zap, Accessibility, MonitorDot, Ear, Droplets, Dumbbell } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    title: "24/7 Emergency",
    desc: "Round-the-clock emergency medical services with dedicated trauma care and rapid response.",
    icon: Siren,
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Cardiology",
    desc: "Comprehensive heart care including diagnostics, surgery, and rehabilitation.",
    icon: Heart,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Neurology",
    desc: "Expert treatment for brain, spinal cord, and nervous system disorders.",
    icon: Brain,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Pediatrics",
    desc: "Specialized medical care for infants, children, and adolescents.",
    icon: Baby,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Orthopedics",
    desc: "Advanced care for bone, joint, and musculoskeletal conditions.",
    icon: Bone,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Ophthalmology",
    desc: "Complete eye care services from routine exams to complex surgeries.",
    icon: Eye,
    color: "bg-teal-50 text-teal-600",
  },
  {
    title: "General Surgery",
    desc: "Wide range of surgical procedures using minimally invasive techniques.",
    icon: Activity,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "General Medicine",
    desc: "Comprehensive diagnosis and treatment of adult diseases.",
    icon: Stethoscope,
    color: "bg-rose-50 text-rose-600",
  },
  {
    title: "Nephrology",
    desc: "Expert care for kidney health, including dialysis and treatment for chronic kidney disease.",
    icon: Activity,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Obstetrics & Gynecology",
    desc: "Comprehensive care for women's reproductive health, prenatal/postnatal care, and gynecology.",
    icon: HeartPulse,
    color: "bg-pink-50 text-pink-600",
  },
  {
    title: "Radiology",
    desc: "Advanced diagnostic imaging including X-rays, MRI, CT scans, and high-resolution ultrasounds.",
    icon: Scan,
    color: "bg-slate-50 text-slate-600",
  },
  {
    title: "Pathology",
    desc: "Precise laboratory analysis and diagnostic testing for accurate disease identification.",
    icon: Microscope,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Urology",
    desc: "Expert diagnosis and treatment for urinary tract and male reproductive system disorders.",
    icon: Filter,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Dermatology",
    desc: "Specialized care for all skin, hair, and nail conditions, from medical pathology to aesthetics.",
    icon: Sparkles,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Gastroenterology",
    desc: "Advanced care for digestive system disorders, including liver, stomach, and intestinal health.",
    icon: Activity,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Pulmonology",
    desc: "Comprehensive treatment for respiratory diseases, asthma, and chronic lung conditions.",
    icon: Wind,
    color: "bg-sky-50 text-sky-600",
  },
  {
    title: "Psychiatry",
    desc: "Compassionate mental health services specializing in diagnosis, therapy, and medical management.",
    icon: HeartHandshake,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Endocrinology",
    desc: "Specialized care for hormone-related conditions, thyroid disorders, and diabetes management.",
    icon: Zap,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "Rheumatology",
    desc: "Expert management for arthritis and musculoskeletal autoimmune conditions.",
    icon: Accessibility,
    color: "bg-lime-50 text-lime-600",
  },
  {
    title: "ICU",
    desc: "High-dependency critical care with advanced life support and continuous patient monitoring.",
    icon: MonitorDot,
    color: "bg-red-100 text-red-700",
  },
  {
    title: "Anesthesiology",
    desc: "Expert perioperative care, pain management, and specialized anesthesia for all surgical procedures.",
    icon: MonitorDot,
    color: "bg-red-100 text-red-700",
  },
  {
    title: "ENT (Otorhinolaryngology)",
    desc: "Specialized treatment for ear, nose, and throat disorders, incorporating modern surgical techniques.",
    icon: Ear,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Hematology",
    desc: "Advanced diagnosis and treatment for blood-related disorders, including anemia and clotting issues.",
    icon: Droplets,
    color: "bg-rose-100 text-rose-700",
  },
  {
    title: "Physiotherapy",
    desc: "Tailored rehabilitation programs to restore mobility, strength, and physical function.",
    icon: Dumbbell,
    color: "bg-blue-100 text-blue-700",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-sans uppercase tracking-[0.2em] text-sm font-black mb-3 drop-shadow-sm">Our Specialities</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-6 tracking-tight leading-tight">Comprehensive Medical Services</h3>
          <p className="text-lg text-muted-foreground">
            We offer a wide range of specialized medical services to meet all your healthcare needs, delivered by experts with compassion.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl font-bold text-brand-dark">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {service.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
