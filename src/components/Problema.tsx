"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, XCircle, HelpCircle } from "lucide-react";
import type { Problem } from "../types";

export interface ProblemaProps { }

const Problema: React.FC<ProblemaProps> = () => {
  const problems: Problem[] = [
    {
      icon: <XCircle className="w-12 h-12" />,
      title: "No reciben clientes online",
      description:
        "Tu competencia está captando clientes mientras tu negocio permanece invisible en internet.",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: <AlertCircle className="w-12 h-12" />,
      title: "Web obsoleta o inexistente",
      description:
        "Una página desactualizada transmite desconfianza y ahuyenta a potenciales clientes.",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: <HelpCircle className="w-12 h-12" />,
      title: "No saben por dónde empezar",
      description:
        "El mundo digital puede ser abrumador sin la guía adecuada. Te ayudamos a dar el primer paso.",
      color: "from-amber-500 to-yellow-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Por qué muchos negocios no generan clientes online?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Identificamos los obstáculos que frenan tu crecimiento digital
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 h-full border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-lg bg-gradient-to-br ${problem.color} flex items-center justify-center text-white mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  {problem.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-orange-400">
                  {problem.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-2xl font-semibold text-orange-400">
            Es momento de cambiar esta situación →
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Problema;
