import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, PlayCircle, X } from "lucide-react";

// ---------------------------------------------------------------------------
// Premium Video Modal
// ---------------------------------------------------------------------------
function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause & reset video on close
  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, handleClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(10,10,30,0.85) 0%, rgba(0,0,0,0.92) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onClick={handleClose}
          >
            {/* Modal card – stop click propagation so it doesn't close itself */}
            <motion.div
              key="modal"
              className="relative w-full max-w-4xl"
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 40 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow ring */}
              <div
                className="pointer-events-none absolute -inset-[2px] rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)/0.6), transparent 60%, hsl(var(--brand-orange, 25 95% 55%)/0.4))",
                  filter: "blur(1px)",
                }}
              />

              {/* Inner container */}
              <div className="relative overflow-hidden rounded-2xl bg-black shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-3"
                  style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold tracking-wide text-white/80">
                      Ark Hospital — Our Story
                    </span>
                  </div>
                  <button
                    onClick={handleClose}
                    aria-label="Close video"
                    className="group flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-all duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Video */}
                <div className="aspect-video w-full bg-black">
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    src="/video.mp4"
                    autoPlay
                    controls
                    playsInline
                    preload="metadata"
                  />
                </div>

                {/* Bottom label */}
                <div className="py-3 text-center text-xs font-medium tracking-widest uppercase text-white/30">
                  Press&nbsp;<kbd className="rounded bg-white/10 px-1.5 py-0.5 text-white/50">Esc</kbd>&nbsp;or click outside to close
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------
export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

      <section id="home" className="relative overflow-hidden bg-background py-20 lg:py-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-brand-orange/5 blur-3xl" />

        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                24/7 Emergency Care Available
              </div>

              <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-brand-dark md:text-6xl lg:text-8xl">
                Your Health, <br />
                <span className="text-primary drop-shadow-sm">Our Priority.</span>
              </h1>

              <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-lg">
                Experience world-class healthcare with Ark Hospital. Our team of expert doctors and
                state-of-the-art technology ensure you get the best treatment possible.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="tel:+919791713759" className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold bg-primary text-white rounded-md shadow-xl shadow-primary/20 hover:bg-primary/90 transition-colors">
                  Book Appointment <ArrowRight className="ml-2 h-5 w-5" />
                </a>

                {/* ── Watch Video Button ── */}
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg font-semibold border-2 group"
                  onClick={() => setVideoOpen(true)}
                >
                  <PlayCircle className="mr-2 h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  Watch Video
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {["Expert Doctors", "Modern Equipment", "24/7 Support"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-medium text-brand-dark">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 overflow-hidden rounded-3xl border-8 border-white shadow-2xl">
                <img
                  src="../../public/hospital.png"
                  alt="Hospital Interior"
                  className="h-full w-full object-cover aspect-[4/3]"
                  referrerPolicy="no-referrer"
                />
              </div>



              {/* Decorative circles */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-orange/20 blur-2xl" />
              <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}


