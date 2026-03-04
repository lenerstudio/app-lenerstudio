"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Calendar, TrendingUp } from "lucide-react";

export interface HeroProps { }

const Hero: React.FC<HeroProps> = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      aria-label="Sección principal"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12"
    >
      {/* Background Gradient Oscuro Profesional */}
      <div className="absolute inset-0 z-0 bg-gray-950 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px] opacity-50" />
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />

      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">

          {/* Text Content */}
          <div className="text-center lg:text-left pt-10 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
                📍 Basados en Sevilla, trabajamos en toda España
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1]"
            >
              Expertos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Diseño Web</span> y Landing Pages de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Conversión</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
            >
              Soluciones web personalizadas para emprendedores, autónomos y pymes
              que quieren crecer online.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <Button
                onClick={() => scrollToSection("#contacto")}
                aria-label="Agendar llamada diagnóstica gratuita"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 transform hover:scale-105 flex items-center gap-2 w-full sm:w-auto"
              >
                <Calendar size={20} />
                Agendar Llamada Gratis
              </Button>
              <Button
                onClick={() => scrollToSection("#testimonios")}
                variant="outline"
                aria-label="Ver casos de éxito"
                className="bg-gray-900/50 border-gray-700 text-white hover:bg-gray-800 hover:text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 flex items-center gap-2 w-full sm:w-auto"
              >
                <TrendingUp size={20} />
                Casos de Éxito
              </Button>
            </motion.div>
          </div>

          {/* 3D Mockup Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="relative h-[400px] md:h-[500px] w-full mt-10 lg:mt-0 flex items-center justify-center lg:justify-end"
          >
            {/* Laptop Mockup */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-10 w-[85%] md:w-[80%] max-w-[600px] right-0 lg:-right-4 shadow-2xl rounded-xl"
              style={{ perspective: "1000px" }}
            >
              <div
                className="bg-gray-800 p-2 rounded-t-2xl border-t border-x border-gray-700 shadow-2xl overflow-hidden relative"
                style={{ transform: "rotateY(-15deg) rotateX(5deg) translateZ(0)", transformStyle: "preserve-3d" }}
              >
                {/* Browser Bar */}
                <div className="flex items-center gap-1.5 mb-2 px-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  <div className="ml-2 bg-gray-900 rounded-md h-4 w-1/2 flex-1 opacity-50"></div>
                </div>
                {/* Browser Content */}
                <div className="bg-gray-950 aspect-[16/10] rounded-b-lg overflow-hidden relative">
                  <Image
                    src="/hero-laptop.png"
                    alt="Ejemplo de diseño web profesional Lener Studio"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 85vw, 600px"
                  />
                  {/* Shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />
                </div>
              </div>
              <div className="bg-gray-700 h-3 rounded-b-3xl mx-auto w-full relative z-0" style={{ transform: "rotateY(-15deg) rotateX(5deg) translateZ(0)" }}>
                <div className="w-1/4 h-1 bg-gray-500 rounded-b-md mx-auto"></div>
              </div>
            </motion.div>

            {/* Mobile Mockup */}
            <motion.div
              animate={{ y: [10, -15, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute z-20 w-[30%] min-w-[120px] max-w-[180px] left-4 md:left-10 bottom-4 md:bottom-12"
            >
              <div className="bg-gray-900 p-1.5 rounded-[2rem] border-[4px] border-gray-800 shadow-2xl relative overflow-hidden h-auto aspect-[9/19]">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-gray-800 rounded-b-xl z-30"></div>
                {/* Mobile Content */}
                <div className="bg-gray-950 w-full h-full rounded-[1.5rem] relative overflow-hidden">
                  <Image
                    src="/hero-mobile.png"
                    alt="Ejemplo de diseño web móvil Lener Studio"
                    fill
                    className="object-cover object-top"
                    sizes="180px"
                  />
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-40 pointer-events-none" />
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
