import { motion } from "motion/react";
import { 
  Plus, 
  Minus, 
  HelpCircle,
  Clock,
  CreditCard,
  Stethoscope,
  FileText
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment through our website's online booking form, by calling our 24/7 helpline at +91 97917 13759, or by visiting our reception desk in person.",
    icon: Calendar
  },
  {
    question: "What insurance providers do you accept?",
    answer: "We accept most major insurance providers including BlueCross, Aetna, UnitedHealthcare, and Cigna. Please contact our billing department for a full list of accepted plans.",
    icon: CreditCard
  },
  {
    question: "What are your visiting hours?",
    answer: "General visiting hours are from 9:00 AM to 8:00 PM daily. However, hours may vary by department (e.g., ICU or Maternity). Please check with the specific ward for details.",
    icon: Clock
  },
  {
    question: "Do you offer emergency services?",
    answer: "Yes, our Emergency Department is open 24 hours a day, 7 days a week, 365 days a year to handle all types of medical emergencies.",
    icon: Stethoscope
  },
  {
    question: "How can I access my medical records?",
    answer: "Patients can access their records through our secure Patient Portal or by submitting a formal request to the Medical Records Department.",
    icon: FileText
  }
];

function Calendar(props: any) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-primary font-sans uppercase tracking-[0.2em] text-sm font-black mb-3 drop-shadow-sm">Common Questions</h2>
              <h3 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-6 tracking-tight leading-none">Frequently Asked Questions</h3>
              <p className="text-lg text-muted-foreground mb-10">
                Find quick answers to common questions about our services, policies, and patient care. If you can't find what you're looking for, feel free to contact us.
              </p>
              
              <div className="bg-primary/10 p-8 rounded-3xl border border-primary/20">
                <HelpCircle className="h-10 w-10 text-primary mb-4" />
                <h4 className="text-xl font-bold text-brand-dark mb-2">Still have questions?</h4>
                <p className="text-sm text-muted-foreground mb-6">Our support team is available 24/7 to help you with any inquiries.</p>
                <button className="bg-primary text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-primary/90 transition-all">
                  Contact Support
                </button>
              </div>
            </motion.div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "rounded-2xl border transition-all duration-300",
                  openIndex === index ? "bg-white border-primary shadow-lg" : "bg-white/50 border-muted hover:border-primary/30"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                      openIndex === index ? "bg-primary text-white" : "bg-primary/10 text-primary"
                    )}>
                      <faq.icon className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-brand-dark">{faq.question}</span>
                  </div>
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-primary" />
                  ) : (
                    <Plus className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                <div className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <div className="px-6 pb-6 pl-20 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
