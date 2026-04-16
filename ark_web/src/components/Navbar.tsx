import { Button } from "@/components/ui/button";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { Phone, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "About", path: "#about" },
    { name: "Services", path: "#services" },
    { name: "Doctors", path: "#doctors" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <a 
                    href={link.path} 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer"
                    )}
                    onClick={(e) => {
                      if (link.path.startsWith('#')) {
                        e.preventDefault();
                        document.querySelector(link.path)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-brand-dark">
              <Phone className="h-4 w-4 text-primary" />
              <span>+91 97917 13759</span>
            </div>
            {/* <Button className="bg-brand-orange hover:bg-brand-orange/90 text-brand-dark font-semibold">
              Book Appointment
            </Button> */}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-brand-dark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background"
          >
            <div className="container mx-auto flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.path} 
                  className="text-lg font-medium cursor-pointer"
                  onClick={(e) => {
                    setIsOpen(false);
                    if (link.path.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(link.path)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
              <a href="tel:+919791713759" className="inline-block w-full bg-brand-orange hover:bg-brand-orange/90 text-brand-dark font-semibold text-center py-2 rounded-md transition-colors">
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
