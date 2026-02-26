"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Palette, Zap, MessageCircle } from "lucide-react";
import type { Autoridad, Technology } from "../types";

export interface AutoridadProps {
  autoridades?: Autoridad[];
}

const Autoridad: React.FC<AutoridadProps> = () => {
  const technologies: Technology[] = [
    { name: "React", icon: "devicon-react-original colored" },
    { name: "Next.js", icon: "devicon-nextjs-plain colored" },
    { name: "Laravel", icon: "devicon-laravel-original colored" },
    { name: "WordPress", icon: "devicon-wordpress-plain colored" },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored" },
    { name: "MySQL", icon: "devicon-mysql-original colored" },
  ];

  const differentiators: Autoridad[] = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "100% Personalizado",
      description: "Cada proyecto es único. No usamos plantillas genéricas.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Enfoque en Conversión",
      description: "Diseñamos pensando en resultados, no solo en estética.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Comunicación Clara",
      description:
        "Mantenemos contacto constante y transparente durante todo el proyecto.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Entrega Rápida",
      description: "Cumplimos plazos sin sacrificar calidad.",
      gradient: "from-green-500 to-teal-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1697638164340-6c5fc558bdf2?w=1920&q=60&fm=webp&fit=crop"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tecnologías Modernas y Experiencia Comprobada
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Utilizamos las mejores herramientas del mercado para crear
            soluciones web de alta calidad
          </p>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-300">
            Stack Tecnológico
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center gap-3 border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                <i className={`${tech.icon} text-5xl mb-2`}></i>
                <div className="font-semibold text-gray-200">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 h-full border border-gray-700 hover:border-transparent transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-4 transition-transform duration-300 group-hover:scale-110 relative z-10`}
                >
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-2 relative z-10">
                  {item.title}
                </h3>

                <p className="text-gray-400 relative z-10">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
            ✓ Proyectos entregados con éxito desde 2020
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Autoridad;
