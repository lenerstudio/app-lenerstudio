"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";

export interface PricingPlan {
    id: number;
    name: string;
    description: string;
    price: string;
    features: string[];
    cta_text: string;
    cta_url: string;
    is_popular: boolean;
    is_published: boolean;
    display_order: number;
}

interface PricingContentProps {
    plans: PricingPlan[];
}

export default function PricingContent({ plans }: PricingContentProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white pb-24">
            {/* Background gradients */}
            <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 pt-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-12 group"
                    >
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        Volver al inicio
                    </Link>
                </motion.div>

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                            Nuestros Precios
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                            Inversión clara para{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                resultados medibles
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                            Elige el plan que mejor se adapte a la fase actual de tu negocio.
                            Sin costes ocultos ni sorpresas.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-center">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            className={`relative flex flex-col h-full rounded-[2.5rem] p-8 transition-transform duration-300 hover:-translate-y-2 ${plan.is_popular
                                    ? "bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-2xl scale-105 md:scale-110 z-10 border-0"
                                    : "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl"
                                }`}
                        >
                            {plan.is_popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                    <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                                        <Star size={12} className="fill-yellow-900" />
                                        MÁS POPULAR
                                    </div>
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={`text-2xl font-bold mb-2 ${plan.is_popular ? "text-white" : "text-gray-900 dark:text-white"}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm ${plan.is_popular ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-semibold opacity-80">Desde</span>
                                    <span className={`text-5xl font-bold tracking-tight ${plan.is_popular ? "text-white" : "text-gray-900 dark:text-white"}`}>
                                        {plan.price}€
                                    </span>
                                </div>
                            </div>

                            <ul className="flex-1 space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check
                                            size={20}
                                            className={`shrink-0 ${plan.is_popular ? "text-blue-200" : "text-blue-500"}`}
                                        />
                                        <span className={`text-sm leading-tight ${plan.is_popular ? "text-white" : "text-gray-600 dark:text-gray-300"}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.cta_url}
                                className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold transition-all border ${plan.is_popular
                                        ? "bg-white text-blue-600 hover:bg-blue-50 border-transparent shadow-xl"
                                        : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 border-gray-200 dark:border-gray-700"
                                    }`}
                            >
                                {plan.cta_text}
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 text-center"
                >
                    <Link
                        href="/#contacto"
                        className="inline-flex items-center gap-2 text-lg font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group"
                    >
                        ¿Necesitas algo personalizado? Cuéntanos tu proyecto
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
