"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "¿Cuánto cuesta una página web profesional en España?",
        answer: "El costo de una página web profesional en España varía según sus funcionalidades. Una landing page informativa puede empezar desde 497€, una web corporativa completa ronda los 997€, mientras que un e-commerce o portal a medida puede costar desde 1.997€. Nuestro enfoque está en crear sitios que generen un retorno de inversión real para tu negocio."
    },
    {
        question: "¿Cuánto tiempo tarda en estar lista mi web?",
        answer: "En Lener Studio, garantizamos tiempos de entrega rápidos sin sacrificar calidad. Una Landing Page suele estar lista en 7 días hábiles, una Web Corporativa en 14 días y un proyecto más complejo como un E-commerce en unos 21 días, siempre trabajando codo a codo contigo en todas las fases del proyecto."
    },
    {
        question: "¿Necesito conocimientos técnicos para gestionar mi web?",
        answer: "¡En absoluto! Entregamos todas nuestras webs con un panel de administración autogestionable e intuitivo (CMS). Además, te incluimos un tutorial o sesión formativa para que sepas cómo modificar textos, cambiar imágenes o añadir productos y entradas al blog por ti mismo."
    },
    {
        question: "¿Qué diferencia hay entre una landing page y una web corporativa?",
        answer: "Una landing page es una página única diseñada para un objetivo concreto: conversión (captar leads, vender un producto específico). Una web corporativa tiene múltiples secciones (Inicio, Servicios, Nosotros, Blog, Contacto...) y sirve como el escaparate digital completo de la empresa para informar, educar y crear imagen de marca."
    },
    {
        question: "¿Ofrecéis mantenimiento web después de la entrega?",
        answer: "¡Sí! Una vez entregada tu web, ofrecemos planes de mantenimiento opcionales que incluyen optimización de rendimiento, actualizaciones de seguirdad, copias de respaldo y pequeñas modificaciones. Queremos que te enfoques en tu negocio mientras nosotros nos ocupamos de la tecnología."
    },
    {
        question: "¿Trabajáis con clientes fuera de Sevilla?",
        answer: "Aunque tenemos nuestra sede en Sevilla, España, trabajamos de forma 100% remota con clientes de toda España (Madrid, Barcelona, Valencia, etc.) e internacionales en Latinoamérica. Realizamos videollamadas, utilizamos metodologías ágiles de seguimiento y mantenemos un canal de comunicación fluido por WhatsApp y email."
    },
    {
        question: "¿Qué pasa si no quedo satisfecho con el resultado?",
        answer: "Tu satisfacción es nuestra máxima prioridad. Contamos con una política de 'Satisfacción 100% Garantizada'. A lo largo del proyecto hacemos hitos de revisión para ajustar el diseño y asegurarnos de que el resultado final es exactamente lo que tenías en mente antes de dar el visto bueno y lanzarla."
    }
];

// Generar FAQPage Schema
const generateFaqSchema = () => {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
};

export interface FaqSectionProps { }

const FaqSection: React.FC<FaqSectionProps> = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faqs" className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 relative z-10">
            {/* JSON-LD FAQPage Schema — compatible con "use client" */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema()) }}
            />

            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                            <HelpCircle size={14} />
                            Dudas Frecuentes
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                            Respuestas Claras para <span className="text-blue-600">tu Decisión</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
                            Todo lo que necesitas saber antes de empezar a trabajar con nosotros.
                            Sin lenguaje técnico y 100% transparente.
                        </p>
                    </motion.div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
                                        ? "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-900 shadow-xl"
                                        : "bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-gray-600"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                    aria-expanded={isOpen}
                                >
                                    <span className={`text-lg font-bold pr-4 ${isOpen ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-gray-100"
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                                        }`}>
                                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 md:px-8 pb-6 md:pb-8 text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <a href="/#contacto" className="text-gray-500 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                        ¿Tienes otra pregunta? Hablemos →
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FaqSection;
