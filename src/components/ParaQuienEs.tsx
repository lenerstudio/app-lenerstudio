"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Users, Briefcase, Building2, Store } from "lucide-react";
import type { TargetAudience } from "../types";

export interface ParaQuienEsProps { }

const ParaQuienEs: React.FC<ParaQuienEsProps> = () => {
  const targetAudience: TargetAudience[] = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Emprendedores",
      description:
        "Lanza tu proyecto digital con una infraestructura que transmita solidez y visión desde el primer día.",
      gradient: "from-blue-600/20 to-cyan-500/10",
      accent: "blue",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Autónomos",
      description:
        "Eleva tu perfil profesional con una identidad digital que proyecte autoridad y atraiga leads cualificados.",
      gradient: "from-indigo-600/20 to-purple-500/10",
      accent: "indigo",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "PYMEs",
      description:
        "Transforma tu modelo de negocio con soluciones escalables diseñadas para optimizar conversiones.",
      gradient: "from-emerald-600/20 to-teal-500/10",
      accent: "emerald",
    },
    {
      icon: <Store className="w-8 h-8" />,
      title: "Negocios Locales",
      description:
        "Domina tu mercado geográfico con estrategias locales enfocadas en resultados tangibles.",
      gradient: "from-amber-600/20 to-orange-500/10",
      accent: "amber",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0C10]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              Audiencia Objetivo
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              ¿Para quién es <span className="text-gradient">Lener Studio?</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto rounded-full mb-8" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Diseñamos experiencias digitales para empresas y profesionales que no se conforman con lo convencional y buscan un impacto real.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {targetAudience.map((audience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative group h-full"
            >
              <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 transition-all duration-500 group-hover:bg-white/[0.06] group-hover:border-white/[0.15] flex flex-col">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${audience.gradient} flex items-center justify-center text-white mb-8 border border-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-2xl shadow-black/20`}
                >
                  {audience.icon}
                </div>

                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 block">
                    Perfil {index + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                    {audience.title}
                  </h3>
                </div>

                <p className="text-gray-400 font-light leading-relaxed mb-6">
                  {audience.description}
                </p>

                <div className="mt-auto pt-4 flex items-center gap-2 text-white/40 group-hover:text-blue-400 transition-colors duration-300">
                  <div className="w-8 h-[1px] bg-white/10 group-hover:bg-blue-400/50 transition-all duration-300" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Ver más</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 text-sm">
            ¿No encajas en estas categorías? <span className="text-blue-400 cursor-pointer hover:underline font-semibold">Cuéntanos tu caso</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ParaQuienEs;
