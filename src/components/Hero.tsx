"use client";

import React from "react";
import { motion } from "framer-motion";
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Overlay - LCP optimizado con srcSet responsive */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1688760871131-29afc15029ec?w=1920&q=75&fm=webp&fit=crop"
          srcSet="
            https://images.unsplash.com/photo-1688760871131-29afc15029ec?w=480&q=75&fm=webp&fit=crop  480w,
            https://images.unsplash.com/photo-1688760871131-29afc15029ec?w=768&q=75&fm=webp&fit=crop  768w,
            https://images.unsplash.com/photo-1688760871131-29afc15029ec?w=1280&q=75&fm=webp&fit=crop 1280w,
            https://images.unsplash.com/photo-1688760871131-29afc15029ec?w=1920&q=75&fm=webp&fit=crop 1920w
          "
          sizes="100vw"
          alt="Agencia de Diseño Web en Sevilla - Lener Studio, desarrollo de sitios web profesionales en España"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-800/90 to-blue-950/95" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-center"
          >
            <span className="text-grow-animation">
              Expertos en <span className="text-gradient">Diseño Web Sevilla</span> y Landing Pages de{" "}
              <span className="text-gradient">Alta Conversión</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed"
          >
            Soluciones web personalizadas para emprendedores, autónomos y pymes
            que quieren crecer online
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => scrollToSection("#contacto")}
              aria-label="Agendar llamada diagnóstica gratuita - ir a sección de contacto"
              className="bg-primary-blue hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-h-[48px] min-w-[44px]"
            >
              <Calendar size={20} aria-hidden="true" />
              Agendar Llamada Diagnóstica Gratis
            </Button>
            <Button
              onClick={() => scrollToSection("#testimonios")}
              variant="outline"
              aria-label="Ver casos de éxito - ir a sección de testimonios"
              className="bg-transparent border-2 border-white text-white hover:bg-primary-blue hover:border-blue-400  px-8 py-6 text-lg rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-h-[48px] min-w-[44px]"
            >
              <TrendingUp size={20} aria-hidden="true" />
              Ver Casos de Éxito
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative scroll indicator */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50"
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor" aria-hidden="true">
          <path
            d="M15 3L15 27M15 27L9 21M15 27L21 21"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
