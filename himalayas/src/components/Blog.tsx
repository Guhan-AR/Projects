import { motion } from "motion/react";

const posts = [
  {
    id: 1,
    title: "The Ultimate Guide to Trekking in the Himalayas",
    date: "May 15, 2026",
    image: "https://picsum.photos/seed/blog1/800/500",
    excerpt: "Everything you need to know before embarking on your first mountain adventure.",
  },
  {
    id: 2,
    title: "Top 10 Scenic Routes You Must Visit",
    date: "May 10, 2026",
    image: "https://picsum.photos/seed/blog2/800/500",
    excerpt: "Discover the most beautiful trails that offer breathtaking views of the peaks.",
  },
  {
    id: 3,
    title: "Essential Gear for Mountain Climbing",
    date: "May 5, 2026",
    image: "https://picsum.photos/seed/blog3/800/500",
    excerpt: "A comprehensive list of high-quality gear to ensure your safety and comfort.",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Latest <span className="text-primary italic">News</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-primary mx-auto mb-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {post.date}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <a href="#" className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all">
                Read More <span>&rarr;</span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
