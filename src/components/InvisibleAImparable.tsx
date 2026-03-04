"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles, TrendingUp, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const COMPARATIVAS = [
    { antes: "❌ Sin diseño profesional", despues: "✅ Diseño premium que impresiona" },
    { antes: "❌ Invisible en Google", despues: "✅ Optimizada para SEO & conversión" },
    { antes: "❌ 0 clientes desde la web", despues: "✅ Leads automáticos 24/7" },
    { antes: "❌ No adaptada al móvil", despues: "✅ 100% responsive & rápida" },
];

export default function InvisibleAImparable() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [sliderX, setSliderX] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
        setSliderX(pct);
    };

    const handleMouseMove = (e: React.MouseEvent) => { if (isDragging) handleMove(e.clientX); };
    const handleTouchMove = (e: React.TouchEvent) => { handleMove(e.touches[0].clientX); };
    const handleClick = (e: React.MouseEvent) => handleMove(e.clientX);

    return (
        <section
            ref={ref}
            className="py-24 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 overflow-hidden relative"
        >
            {/* Background glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles size={12} />
                        La transformación real
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        De{" "}
                        <span className="text-red-400 line-through opacity-70">Invisible</span>
                        {" "}a{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                            Imparable
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Así se ve tu negocio hoy vs. cómo lo verán tus clientes
                        cuando trabajemos juntos. Arrastra el divisor para comparar.
                    </p>
                </motion.div>

                {/* Before/After Slider */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-16"
                >
                    <div
                        ref={containerRef}
                        className="relative w-full rounded-2xl overflow-hidden cursor-col-resize select-none shadow-2xl shadow-black/40 border border-slate-800"
                        style={{ aspectRatio: "16/7" }}
                        onMouseMove={handleMouseMove}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                        onTouchMove={handleTouchMove}
                        onClick={handleClick}
                    >
                        {/* ANTES — blurry old website */}
                        <div className="absolute inset-0">
                            <Image
                                src="/web-antes.png"
                                alt="Web antigua y desactualizada (antes)"
                                fill
                                className="object-cover object-top"
                                style={{ filter: "blur(3px) saturate(0.6) brightness(0.7)" }}
                                quality={85}
                                priority
                            />
                            <div className="absolute inset-0 bg-red-950/40 mix-blend-multiply" />
                            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600/90 text-white px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg backdrop-blur-sm">
                                <EyeOff size={15} />
                                Antes
                            </div>
                        </div>

                        {/* DESPUÉS — modern website, clipped */}
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
                        >
                            <Image
                                src="/web-despues.png"
                                alt="Web moderna y profesional (después)"
                                fill
                                className="object-cover object-top"
                                style={{ filter: "brightness(1.05) saturate(1.1)" }}
                                quality={90}
                                priority
                            />
                            <div className="absolute top-4 left-4 flex items-center gap-2 bg-blue-600/90 text-white px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg backdrop-blur-sm">
                                <Eye size={15} />
                                Después
                            </div>
                        </div>

                        {/* Slider handle */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20"
                            style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl border-2 border-slate-200 flex items-center justify-center cursor-col-resize">
                                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-slate-600" stroke="currentColor" strokeWidth={2.5}>
                                    <path d="M8 9l-3 3 3 3M16 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Hint */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/10 pointer-events-none">
                            ← Arrastra para comparar →
                        </div>
                    </div>
                </motion.div>

                {/* Comparison list */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16"
                >
                    {COMPARATIVAS.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                            className="grid grid-cols-2 gap-3"
                        >
                            <div className="flex items-center gap-3 bg-red-950/30 border border-red-800/30 px-4 py-3 rounded-xl">
                                <span className="text-sm text-red-300 font-medium leading-snug">{item.antes}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-blue-950/30 border border-blue-700/30 px-4 py-3 rounded-xl">
                                <span className="text-sm text-blue-200 font-medium leading-snug">{item.despues}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            href="/#contacto"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-black px-8 py-4 rounded-2xl text-base shadow-xl shadow-blue-500/25 hover:scale-[1.03] transition-all duration-300"
                        >
                            <TrendingUp size={20} />
                            Quiero mi web imparable
                            <ArrowRight size={18} />
                        </Link>
                        <span className="text-slate-500 text-sm">
                            ✓ Sin compromiso · Respuesta en 24h
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
