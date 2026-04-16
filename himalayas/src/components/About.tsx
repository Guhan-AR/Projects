import { motion } from "motion/react";
import { Mountain, Compass, Map, Camera } from "lucide-react";

const features = [
  {
    icon: <Mountain className="w-8 h-8" />,
    title: "Mountain Trekking",
    description: "Experience the thrill of climbing the highest peaks with our expert guides.",
  },
  {
    icon: <Compass className="w-8 h-8" />,
    title: "Expert Guidance",
    description: "Our team of professionals ensures your safety and provides the best routes.",
  },
  {
    icon: <Map className="w-8 h-8" />,
    title: "Custom Routes",
    description: "Tailor-made adventures that suit your skill level and interests.",
  },
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Breathtaking Views",
    description: "Capture unforgettable moments in the most scenic locations on Earth.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            About <span className="text-primary italic">Himalayas</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-600 text-lg"
          >
            We are dedicated to providing the most authentic and exhilarating mountain experiences.
            Our passion for nature drives everything we do.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
