"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, RefreshCw, Shield } from "lucide-react";
import type { Garantia } from "../types";

export interface GarantiaProps {
  garantias?: Garantia[];
}

const Garantia: React.FC<GarantiaProps> = () => {
  const guarantees: Garantia[] = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Satisfacción Garantizada",
      description:
        "Si no estás 100% satisfecho con el resultado, trabajamos hasta que lo estés. Tu éxito es nuestro compromiso.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <RefreshCw className="w-12 h-12" />,
      title: "Ajustes Incluidos",
      description:
        "Incluimos revisiones y ajustes durante el desarrollo para asegurar que el resultado final sea exactamente lo que necesitas.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <CheckCircle2 className="w-12 h-12" />,
      title: "Web Funcional Antes de Finalizar",
      description:
        "Verás tu web funcionando en un entorno de prueba antes del lanzamiento final. Sin sorpresas desagradables.",
      gradient: "from-green-500 to-teal-500",
    },
  ];

  return (
    <section
      id="garantia"
      className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-6">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Garantía Total</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tu Satisfacción es Nuestra Prioridad
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trabajamos contigo hasta lograr el resultado perfecto. Tu
            tranquilidad es nuestra garantía.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-xl bg-gradient-to-br ${guarantee.gradient} flex items-center justify-center text-white mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  {guarantee.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {guarantee.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {guarantee.description}
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
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 max-w-4xl mx-auto shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Compromiso de Calidad
            </h3>
            <p className="text-blue-100 text-lg">
              No cobramos hasta que estés completamente satisfecho con el
              resultado. Esa es nuestra promesa.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Garantia;
