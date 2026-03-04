"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Zap, Check } from "lucide-react";
import type { Testimonio } from "../types";

export interface TestimoniosProps {
  testimonios?: Testimonio[];
}

const Testimonios: React.FC<TestimoniosProps> = () => {
  const testimonials = [
    {
      name: "María González",
      business: "Life & Business Coaching",
      role: "Fundadora",
      city: "Madrid",
      quote:
        "Desde que lanzó mi web con Lener Studio, mis contactos aumentaron un 150%. El diseño es profesional y realmente convierte visitantes en clientes.",
      result: "+150% contactos en los primeros 3 meses",
      rating: 5,
    },
    {
      name: "Carlos Ruiz",
      business: "TechSolutions IT",
      role: "Director de Operaciones",
      city: "Barcelona",
      quote:
        "Profesionales comprometidos que entienden las necesidades del negocio. Mi web ahora refleja la calidad de mis servicios y genera confianza inmediata.",
      result: "+40% conversión en los primeros 3 meses",
      rating: 5,
    },
    {
      name: "Ana Martínez",
      business: "AM Estudio Interiorismo",
      role: "Directora Creativa",
      city: "Valencia",
      quote:
        "La web que me crearon superó todas mis expectativas. Es rápida, hermosa y fácil de gestionar. Mis clientes me felicitan constantemente por ella.",
      result: "+200% visibilidad en los primeros 3 meses",
      rating: 5,
    },
    {
      name: "Roberto Sánchez",
      business: "Sánchez & Asociados",
      role: "Socio Principal",
      city: "Sevilla",
      quote:
        "Invertir en una web profesional fue la mejor decisión. Ahora recibo consultas de clientes que nunca hubieran conocido mi despacho de otra forma.",
      result: "+80% leads en los primeros 3 meses",
      rating: 5,
    },
  ];

  return (
    <section id="testimonios" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
              Testimonio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Resultados Reales de <span className="text-primary-blue">Negocios Reales</span>
            </h2>
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              Explora cómo hemos ayudado a emprendedores y empresas a alcanzar sus metas digitales con soluciones a medida.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <div className="relative mb-8 flex-grow">
                <Quote className="absolute -top-4 -left-2 w-10 h-10 text-blue-500/5 rotate-180" />
                <p className="text-gray-700 text-[15px] italic leading-relaxed relative z-10 line-clamp-5">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="mt-auto">
                <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs mb-8 border border-blue-100">
                  <Zap size={12} className="mr-2" />
                  {testimonial.result}
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-2xl shadow-md flex items-center justify-center text-white font-black text-lg select-none"
                      style={{ background: `hsl(${(testimonial.name.charCodeAt(0) * 37) % 360}, 65%, 45%)` }}
                      aria-label={`Foto de ${testimonial.name}`}
                    >
                      {testimonial.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-base leading-tight flex items-center gap-1">
                      {testimonial.name}
                      <div className="w-[14px] h-[14px] bg-blue-500 rounded-full flex items-center justify-center text-white ml-0.5" title="Perfil Verificado">
                        <Check size={8} strokeWidth={4} />
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 font-medium mt-0.5">
                      {testimonial.role} en {testimonial.business}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1 flex items-center">
                      📍 {testimonial.city}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
