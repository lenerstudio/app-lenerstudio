"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift, Calendar, FileText } from "lucide-react";
import { Button } from "../components/ui/button";
import type { Offer } from "../types";

export interface OfertaProps { }

const Oferta: React.FC<OfertaProps> = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const offers: Offer[] = [
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Presupuesto Personalizado Gratuito",
      description:
        "Recibe un presupuesto detallado sin compromiso. Analizamos tu proyecto y te ofrecemos la mejor solución adaptada a tus necesidades y presupuesto.",
      features: [
        "Análisis de necesidades",
        "Propuesta personalizada",
        "Sin letra pequeña",
        "Respuesta en 24h",
      ],
      cta: "Solicitar Presupuesto",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Llamada Diagnóstica Gratuita",
      description:
        "Una sesión de 30 minutos donde analizamos tu situación actual, identificamos oportunidades y te mostramos cómo podemos ayudarte a crecer.",
      features: [
        "Auditoría web gratuita",
        "Plan de acción personalizado",
        "Sin compromiso",
        "Asesoramiento experto",
      ],
      cta: "Agendar Llamada",
      gradient: "from-purple-600 to-pink-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-6">
            <Gift className="w-5 h-5" />
            <span className="font-semibold">Oferta Especial</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Oferta Especial para Nuevos Clientes
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comienza tu transformación digital sin riesgos. Descubre cómo
            podemos ayudarte
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              <div
                className={`bg-gradient-to-br ${offer.gradient} rounded-2xl p-1 h-full`}
              >
                <div className="bg-gray-900 rounded-2xl p-8 h-full">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-white mb-6 transition-transform duration-300 group-hover:scale-110">
                    {offer.icon}
                  </div>

                  <h3 className="text-3xl font-bold mb-4">{offer.title}</h3>

                  <p className="text-blue-100 mb-6 leading-relaxed">
                    {offer.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {offer.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-blue-100">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={scrollToContact}
                    className={`w-full bg-gradient-to-r ${offer.gradient} hover:opacity-90 text-white py-6 text-lg rounded-lg shadow-xl transition-all duration-300 transform group-hover:scale-105`}
                  >
                    {offer.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-blue-200 text-lg">
            ⏱️ <span className="font-semibold">Plazas limitadas</span> - Reserva
            tu sesión gratuita hoy mismo
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Oferta;
