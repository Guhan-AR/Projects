import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

export default function Appointment() {
  return (
    <section id="appointment" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-sans uppercase tracking-[0.2em] text-sm font-black mb-3 drop-shadow-sm">Book Now</h2>
            <h3 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-6 tracking-tight leading-tight">Make An Appointment For Your Family</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step towards better health. Fill out the form and our team will get back to you within 24 hours to confirm your slot.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Phone, title: "Emergency Call", detail: "+91 97917 13759" },
                { icon: Mail, title: "Email Support", detail: "arkcardiovenkatesh86@gmail.com" },
                { icon: Clock, title: "Working Hours", detail: "Mon - Sat: 08:00 - 20:00" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.title}</div>
                    <div className="text-lg font-bold text-brand-dark">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="border-none shadow-2xl overflow-hidden">
              <div className="bg-primary p-6 text-white text-center">
                <h4 className="text-2xl font-bold">Appointment Form</h4>
                <p className="text-primary-foreground/80 text-sm">Please fill in your details below</p>
              </div>
              <CardContent className="p-8">
                <form className="grid gap-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="name" placeholder="John Doe" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="john@example.com" className="pl-10" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" placeholder="+1 (555) 000-0000" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="date" type="date" className="pl-10" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <textarea 
                        id="message" 
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                        placeholder="Tell us about your concern..."
                      />
                    </div>
                  </div>

                  <a href="tel:+919791713759" className="inline-flex items-center justify-center w-full bg-brand-orange hover:bg-brand-orange/90 text-brand-dark font-bold h-12 rounded-md transition-colors">
                    Call to Confirm Appointment
                  </a>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
