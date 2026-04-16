import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Link to="/">
                <Logo variant="white" />
              </Link>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Ark Hospital is a leading healthcare provider committed to excellence and compassion in patient care. We use advanced technology to ensure the best outcomes.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              {[
                { name: "About Us", path: "#about" },
                { name: "Our Services", path: "#services" },
                { name: "Meet Doctors", path: "#doctors" },
                { name: "Contact Us", path: "#appointment" },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="hover:text-primary transition-colors flex items-center gap-2" onClick={(e) => {
                    if (link.path.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(link.path)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}>
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>4th Cross Rd, Co-operative Colony, Jakkappan Nagar, Krishnagiri, Tamil Nadu 635001</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+91 97917 13759</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>arkcardiovenkatesh86@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get the latest health tips and hospital updates.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your Email" 
                className="bg-white/5 border-white/10 focus:border-primary text-white"
              />
              <Button className="bg-primary hover:bg-primary/90">Join</Button>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 Ark Hospital. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
