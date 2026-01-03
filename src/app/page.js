"use client";
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, Wallet, Train, CheckSquare, ArrowRight, Utensils, Landmark, Zap } from 'lucide-react';
import { budget } from '@/data/budget';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      title: "Itinerario Completo",
      desc: "Osaka, Kyoto, Hiroshima, Tokyo e Fuji. Dettagli giorno per giorno.",
      icon: <Map className="w-6 h-6" />,
      href: "/itinerary",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Budget Tracker",
      desc: "Analisi dei costi: Voli, Hotel, Cibo e Attrazioni. Budget Safe: €" + budget.totalSafe.toLocaleString('it-IT'),
      icon: <Wallet className="w-6 h-6" />,
      href: "/budget",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Logistica & Treni",
      desc: "JR Pass, Shinkansen, Suica e strategie di spostamento.",
      icon: <Train className="w-6 h-6" />,
      href: "/transport",
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Prenotazioni",
      desc: "Checklist di cose da prenotare e mappa del viaggio.",
      icon: <CheckSquare className="w-6 h-6" />,
      href: "/reservations",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  const highlights = [
    { title: "Cultura Millenaria", img: "/images/culture.png", icon: <Landmark className="w-5 h-5" /> },
    { title: "Gastronomia", img: "/images/food.png", icon: <Utensils className="w-5 h-5" /> },
    { title: "Futuro & Neon", img: "/images/modern.png", icon: <Zap className="w-5 h-5" /> },
  ];

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
              backgroundImage: "url('/images/hero.png')",
              filter: "brightness(0.7)"
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
              VIAGGIO DI COPPIA
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 text-white drop-shadow-lg">
              Giappone 2026
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light tracking-wide">
              03 Ottobre — 16 Ottobre
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
            {[
              { label: "Giorni", value: "14" },
              { label: "Città Principali", value: "3" },
              { label: "Budget Stimato", value: "€" + budget.totalSafe.toLocaleString('it-IT') }
            ].map((stat, i) => (
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
              <h2 className="text-4xl font-bold mb-2">Highlights</h2>
              <p className="max-w-xl text-gray-500">Un mix perfetto di tradizione millenaria, natura mozzafiato e innovazione futuristica.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
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
                    {item.icon}
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
            <h2 className="text-4xl font-bold mb-4">Pianificazione Viaggio</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Tutto quello che serve per organizzare il viaggio perfetto, dal budget agli spostamenti.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Link href={feature.href} key={i} className="block h-full">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                    <div className="p-3 bg-gray-50 rounded-lg text-[var(--primary)]">
                      {feature.icon}
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
