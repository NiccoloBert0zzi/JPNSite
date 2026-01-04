"use client";
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { currentTrip, homeData } from '@/data';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="home" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${currentTrip.heroImage}')`,
              filter: currentTrip.heroFilter
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent via-70% to-white" />
        </motion.div>

        {/* Hero Content */}
        <div className="container relative z-10 text-center text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium tracking-wider mb-6">
              {currentTrip.label}
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 text-white drop-shadow-lg">
              {currentTrip.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light tracking-wide">
              {currentTrip.dates}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/itinerary" className="btn bg-white text-black hover:bg-[var(--primary)] hover:text-white border-none transition-colors duration-300">
                Esplora Itinerario
              </Link>
              <Link href="/budget" className="btn glass text-white hover:bg-white/20">
                Vedi Budget
              </Link>
            </div>
          </motion.div>
        </div>




      </section>

      {/* Intro Stats Section */}
      <section className="relative z-20 -mt-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeData.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[var(--primary)] text-center"
              >
                <span className="block text-5xl font-display font-bold text-[var(--primary)] mb-2">{stat.value}</span>
                <span className="text-gray-400 uppercase text-xs tracking-widest font-semibold">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">{homeData.texts.highlightsTitle}</h2>
              <p className="max-w-xl text-gray-500">{homeData.texts.highlightsDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeData.highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2 text-white/80">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-wider">Esperienza</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-[var(--primary-light)] transition-colors">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation / Features Grid */}
      <section className="py-24 bg-[var(--background)]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{homeData.texts.planningTitle}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{homeData.texts.planningDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeData.features.map((feature, i) => (
              <Link href={feature.href} key={i} className="block h-full">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                    <div className="p-3 bg-gray-50 rounded-lg text-[var(--primary)]">
                      <feature.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {feature.desc}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-[var(--primary)] group">
                    Vedi Dettagli
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div >
  );
}
