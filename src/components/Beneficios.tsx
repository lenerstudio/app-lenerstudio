"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Target,
  Zap,
  TrendingUp,
  Headphones,
  BarChart,
} from "lucide-react";
import type { Beneficio } from "../types";

export interface BeneficiosProps {
  beneficios?: Beneficio[];
}

const Beneficios: React.FC<BeneficiosProps> = () => {
  const benefits: Beneficio[] = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Mayor credibilidad y confianza",
      description:
        "Una web profesional transmite seriedad y genera confianza instantánea en tus clientes potenciales.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Generación de leads cualificados",
      description:
        "Atrae clientes reales e interesados en tus servicios, no solo visitas sin conversión.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Web rápida, segura y responsive",
      description:
        "Tecnología moderna que garantiza velocidad, seguridad y adaptación perfecta a cualquier dispositivo.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Escalable con tu negocio",
      description:
        "Soluciones que crecen contigo. Añade nuevas funcionalidades cuando tu negocio lo necesite.",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: <Headphones className="w-10 h-10" />,
      title: "Soporte técnico real",
      description:
        "No te dejamos solo. Soporte continuo y asesoramiento personalizado cuando lo necesites.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: <BarChart className="w-10 h-10" />,
      title: "ROI medible",
      description:
        "Métricas claras y resultados tangibles. Sabrás exactamente qué retorno obtienes de tu inversión.",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Beneficios que Transforman tu Negocio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Invierte en una web que trabaja para ti 24/7 generando oportunidades
            de negocio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-white rounded-xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent relative overflow-hidden flex flex-col items-center text-center">
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10`}
                >
                  {benefit.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 leading-relaxed relative z-10">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Beneficios;
