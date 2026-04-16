import { motion } from "motion/react";

const portfolioItems = [
  { id: 1, category: "Nature", image: "https://picsum.photos/seed/p1/800/600" },
  { id: 2, category: "Adventure", image: "https://picsum.photos/seed/p2/800/600" },
  { id: 3, category: "Wildlife", image: "https://picsum.photos/seed/p3/800/600" },
  { id: 4, category: "Nature", image: "https://picsum.photos/seed/p4/800/600" },
  { id: 5, category: "Adventure", image: "https://picsum.photos/seed/p5/800/600" },
  { id: 6, category: "Wildlife", image: "https://picsum.photos/seed/p6/800/600" },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our <span className="text-primary italic">Portfolio</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto mb-6"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img
                src={item.image}
                alt={`Portfolio ${item.id}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-bold text-xl">{item.category}</p>
                  <div className="w-10 h-0.5 bg-white mx-auto mt-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
