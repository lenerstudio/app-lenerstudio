"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Building, Settings, Check } from "lucide-react";
import type { Solucion } from "../types";

export interface SolucionesProps {
  soluciones?: Solucion[];
}

const Soluciones: React.FC<SolucionesProps> = () => {
  const services: Solucion[] = [
    {
      title: "Landing Pages de Alta Conversión",
      description:
        "Páginas diseñadas específicamente para convertir visitantes en clientes. Cada elemento está optimizado para maximizar tus conversiones.",
      image: "https://images.unsplash.com/photo-1603985585179-3d71c35a537c?w=800&q=75&fm=webp&fit=crop",
      icon: <Zap className="w-8 h-8" />,
      features: [
        "Diseño enfocado en conversión",
        "Llamados a la acción estratégicos",
        "Optimización de velocidad",
        "Responsive en todos los dispositivos",
        "Integración con herramientas de marketing",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Sitios Web Corporativos",
      description:
        "Webs profesionales que transmiten credibilidad y fortalecen tu marca. Perfectas para empresas que buscan una presencia digital sólida.",
      image: "https://images.unsplash.com/photo-1619593625881-31c618560ef0?w=800&q=75&fm=webp&fit=crop",
      icon: <Building className="w-8 h-8" />,
      features: [
        "Diseño personalizado y profesional",
        "Múltiples secciones y páginas",
        "Portafolio de proyectos",
        "Blog integrado",
        "Optimización SEO avanzada",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Webs Autogestionables",
      description:
        "Toma el control total de tu contenido. Actualiza tu web fácilmente sin conocimientos técnicos mediante un panel intuitivo.",
      image: "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?w=800&q=75&fm=webp&fit=crop",
      icon: <Settings className="w-8 h-8" />,
      features: [
        "Panel de administración intuitivo",
        "Actualiza contenido sin programar",
        "Gestión de productos/servicios",
        "Editor visual drag & drop",
        "Capacitación incluida",
      ],
      gradient: "from-green-500 to-teal-500",
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestras Soluciones
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Servicios web diseñados para impulsar tu negocio y generar
            resultados reales
          </p>
        </motion.div>

        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
            >
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full lg:w-1/2"
              >
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl group h-[280px] sm:h-[350px] lg:h-[400px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  />
                </div>
              </motion.div>

              {/* Content */}
              <div className="lg:w-1/2">
                <div
                  className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r ${service.gradient} text-white mb-6`}
                >
                  {service.icon}
                  <span className="font-semibold">Servicio Premium</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3">
                  {service.features?.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Soluciones;
