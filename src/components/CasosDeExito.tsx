"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
        beforeImg: "/caso-coaching-antes.png",
        afterImg: "/caso-coaching-despues.png",
    },
    {
        id: "legal",
        industry: "Legal / Abogados",
        problem: "Sitio web invisible en Google, clientes solo llegaban por boca a boca.",
        solution: "Nueva web corporativa optimizada para SEO local y artículos de autoridad legal.",
        result: "+80% consultas cualificadas mensual",
        beforeImg: "/caso-legal-antes.png",
        afterImg: "/caso-legal-despues.png",
    },
    {
        id: "ecommerce",
        industry: "E-commerce",
        problem: "Tasa de abandono de carrito superior al 70%, mal rendimiento en móviles.",
        solution: "Tienda online rápida, checkout simplificado en 1 paso y diseño mobile-first.",
        result: "Duplicaron ventas online en 60 días",
        beforeImg: "/caso-ecommerce-antes.png",
        afterImg: "/caso-ecommerce-despues.png",
    }
];


const CasosDeExito: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [sliderPct, setSliderPct] = useState(0);   // 0 = full ANTES, 100 = full DESPUÉS
    const [isHovering, setIsHovering] = useState(false);
    const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const dirRef = useRef<1 | -1>(1);                // 1 = avanzando, -1 = retrocediendo
    const containerRef = useRef<HTMLDivElement>(null);

    // Animación automática: avanza de 0→100 y vuelve 100→0 suavemente
    const startAuto = useCallback(() => {
        if (autoRef.current) clearInterval(autoRef.current);
        autoRef.current = setInterval(() => {
            setSliderPct(prev => {
                const next = prev + dirRef.current * 0.6;
                if (next >= 100) { dirRef.current = -1; return 100; }
                if (next <= 0) { dirRef.current = 1; return 0; }
                return next;
            });
        }, 16); // ~60fps
    }, []);

    // Resetea slider al cambiar de caso
    useEffect(() => {
        setSliderPct(0);
        dirRef.current = 1;
        startAuto();
        return () => { if (autoRef.current) clearInterval(autoRef.current); };
    }, [activeTab, startAuto]);

    // Pausa al hover
    useEffect(() => {
        if (isHovering) {
            if (autoRef.current) clearInterval(autoRef.current);
        } else {
            startAuto();
        }
    }, [isHovering, startAuto]);

    // Permite arrastrar manualmente
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const pct = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
        setSliderPct(pct);
    };

    const nextCase = () => setActiveTab(prev => (prev === casosDeExito.length - 1 ? 0 : prev + 1));
    const prevCase = () => setActiveTab(prev => (prev === 0 ? casosDeExito.length - 1 : prev - 1));
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
                                {/* ── Slider automático ANTES / DESPUÉS ── */}
                                <div
                                    ref={containerRef}
                                    className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800 cursor-ew-resize select-none"
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => setIsHovering(false)}
                                    onMouseMove={handleMouseMove}
                                >
                                    {/* ANTES — imagen base (siempre visible) */}
                                    <img
                                        src={currentCase.beforeImg}
                                        alt="Antes del rediseño"
                                        className="absolute inset-0 w-full h-full object-cover brightness-75 grayscale"
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    {/* DESPUÉS — se revela con clipPath animado */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            clipPath: `inset(0 ${100 - sliderPct}% 0 0)`,
                                            transition: isHovering ? "none" : "clip-path 0ms linear",
                                        }}
                                    >
                                        <img
                                            src={currentCase.afterImg}
                                            alt="Después del rediseño"
                                            className="absolute inset-0 w-full h-full object-cover"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>

                                    {/* Línea divisora */}
                                    <div
                                        className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
                                        style={{ left: `${sliderPct}%`, transition: isHovering ? "none" : "left 0ms linear" }}
                                    >
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-none">
                                            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-slate-500" stroke="currentColor" strokeWidth={2}>
                                                <path d="M6 8l-3 3 3 3M14 8l3 3-3 3" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 bg-red-500/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow z-30 backdrop-blur-sm">ANTES</div>
                                    <div className="absolute top-3 right-3 bg-green-500/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow z-30 backdrop-blur-sm">DESPUÉS</div>

                                    {/* Hint cuando slider está al inicio */}
                                    {sliderPct < 5 && (
                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/50 text-white text-[10px] font-semibold rounded-full backdrop-blur-sm pointer-events-none animate-pulse">
                                            ← Revelando →
                                        </div>
                                    )}
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
