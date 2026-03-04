"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Caso {
    id: string;
    industry: string;
    problem: string;
    solution: string;
    result: string;
    beforeImg: string;
    afterImg: string;
}

const casosDeExito: Caso[] = [
    {
        id: "coaching",
        industry: "Coaching / Mentoring",
        problem: "Web antigua no transmitía autoridad, pocos leads y sin un sistema claro para agendar sesiones.",
        solution: "Rediseño completo enfocado en conversión, embudo integrado y sistema automático de reservas.",
        result: "+150% contactos en 90 días",
        beforeImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75&blur=md",
        afterImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    },
    {
        id: "legal",
        industry: "Legal / Abogados",
        problem: "Sitio web invisible en Google, clientes solo llegaban por boca a boca.",
        solution: "Nueva web corporativa optimizada para SEO local y artículos de autoridad legal.",
        result: "+80% consultas cualificadas mensual",
        beforeImg: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=75&blur=md",
        afterImg: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    },
    {
        id: "ecommerce",
        industry: "E-commerce",
        problem: "Tasa de abandono de carrito superior al 70%, mal rendimiento en móviles.",
        solution: "Tienda online rápida, checkout simplificado en 1 paso y diseño mobile-first.",
        result: "Duplicaron ventas online en 60 días",
        beforeImg: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=600&q=75&blur=md",
        afterImg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    }
];

const CasosDeExito: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const nextCase = () => {
        setActiveTab((prev) => (prev === casosDeExito.length - 1 ? 0 : prev + 1));
    };

    const prevCase = () => {
        setActiveTab((prev) => (prev === 0 ? casosDeExito.length - 1 : prev - 1));
    };

    const currentCase = casosDeExito[activeTab];

    return (
        <section id="casos" className="py-24 bg-white dark:bg-gray-950 overflow-hidden relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                            Casos de Éxito
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                            De invisible a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Imparable</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                            Descubre cómo transformamos problemas en resultados medibles para nuestros clientes.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Navigation Tabs (Desktop) */}
                    <div className="hidden md:flex justify-center gap-4 mb-12">
                        {casosDeExito.map((caso, index) => (
                            <button
                                key={caso.id}
                                onClick={() => setActiveTab(index)}
                                className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === index
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                                    }`}
                            >
                                {caso.industry}
                            </button>
                        ))}
                    </div>

                    <div className="relative bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-gray-200 dark:border-gray-800 p-6 md:p-10 shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                            >
                                {/* Images Before / After */}
                                <div className="relative aspect-[4/3] w-full group rounded-2xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800">
                                    <div className="absolute inset-0 w-1/2 h-full border-r-2 border-white/50 z-20">
                                        <img
                                            src={currentCase.beforeImg}
                                            alt="Antes del rediseño"
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 w-[200%] max-w-none h-full object-cover filter brightness-75 grayscale"
                                        />
                                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-30">
                                            ANTES
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 w-1/2 h-full left-1/2 z-10 overflow-hidden">
                                        <img
                                            src={currentCase.afterImg}
                                            alt="Después del rediseño"
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 -left-[100%] w-[200%] max-w-none h-full object-cover rounded-2xl"
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-30">
                                        DESPUÉS
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-center">
                                    <div className="inline-block self-start px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-lg mb-6">
                                        Industria: {currentCase.industry}
                                    </div>

                                    <div className="space-y-6 mb-8">
                                        <div>
                                            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                                Problema
                                            </h4>
                                            <p className="text-gray-800 dark:text-gray-200 text-lg">
                                                {currentCase.problem}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                                Solución
                                            </h4>
                                            <p className="text-gray-800 dark:text-gray-200 text-lg">
                                                {currentCase.solution}
                                            </p>
                                        </div>

                                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 p-4 rounded-xl">
                                            <h4 className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-1">
                                                Resultado logrado
                                            </h4>
                                            <p className="text-green-800 dark:text-green-300 font-bold text-xl">
                                                {currentCase.result}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                            ¿Tu negocio se parece a este caso?
                                        </p>
                                        <a
                                            href="/#contacto"
                                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                                        >
                                            Hablemos
                                            <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Mobile Nav */}
                        <div className="md:hidden flex items-center justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
                            <button onClick={prevCase} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full dark:hover:bg-gray-800">
                                <ChevronLeft size={24} />
                            </button>
                            <span className="text-sm font-medium text-gray-500">
                                {activeTab + 1} / {casosDeExito.length}
                            </span>
                            <button onClick={nextCase} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full dark:hover:bg-gray-800">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CasosDeExito;
