"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    Calendar,
    MessageCircle,
    ArrowLeft,
    Clock,
    Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GraciasPage() {
    const router = useRouter();

    // Scroll al top al cargar la página
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const nextSteps = [
        {
            icon: <Clock className="w-6 h-6" aria-hidden="true" />,
            title: "En menos de 24 horas",
            description: "Recibirás un email de confirmación con los detalles de tu consulta.",
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            icon: <MessageCircle className="w-6 h-6" aria-hidden="true" />,
            title: "Te contactamos",
            description: "Un especialista de Lener Studio se pondrá en contacto contigo para conocer tu proyecto.",
            gradient: "from-purple-500 to-pink-500",
        },
        {
            icon: <Star className="w-6 h-6" aria-hidden="true" />,
            title: "Propuesta personalizada",
            description: "Recibirás una propuesta adaptada a tus necesidades y objetivos de negocio.",
            gradient: "from-green-500 to-teal-500",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 flex items-center justify-center px-4 py-16 relative overflow-hidden">

            {/* Fondo decorativo */}
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
                <div className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full bg-cyan-600/5 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-3xl w-full mx-auto">

                {/* Icono de éxito animado */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="flex justify-center mb-8"
                    aria-hidden="true"
                >
                    <div className="relative">
                        {/* Círculo pulsante */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-full bg-green-500/30"
                        />
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/30">
                            <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={1.5} />
                        </div>
                    </div>
                </motion.div>

                {/* Título y descripción */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                        ¡Mensaje enviado{" "}
                        <span className="text-gradient">con éxito!</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Gracias por contactar con <strong className="text-white">Lener Studio</strong>.
                        Hemos recibido tu mensaje y nos pondremos en contacto contigo muy pronto.
                    </p>
                </motion.div>

                {/* Pasos siguientes */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-xl font-bold text-white mb-6 text-center">
                        ¿Qué pasa ahora?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {nextSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}
                                >
                                    {step.icon}
                                </div>
                                <h3 className="text-white font-semibold mb-2 text-sm">{step.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA - WhatsApp urgente */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-6 mb-8 text-center"
                >
                    <p className="text-gray-300 text-sm mb-3">
                        ¿Prefieres una respuesta inmediata?
                    </p>
                    <a
                        href="https://wa.me/+34624432245?text=Hola,%20acabo%20de%20enviar%20el%20formulario%20y%20me%20gustaría%20hablar%20sobre%20mi%20proyecto"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Contactar ahora por WhatsApp"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/20"
                    >
                        <MessageCircle className="w-5 h-5" aria-hidden="true" />
                        Escribir por WhatsApp ahora
                    </a>
                </motion.div>

                {/* Botones de acción */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button
                        onClick={() => router.push("/")}
                        variant="outline"
                        aria-label="Volver a la página de inicio"
                        className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        Volver al inicio
                    </Button>
                    <Button
                        onClick={() => {
                            router.push("/#servicios");
                        }}
                        aria-label="Ver nuestros servicios"
                        className="bg-primary-blue hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        Ver nuestros servicios
                    </Button>
                </motion.div>

                {/* Datos de contacto por si acaso */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="text-center text-gray-500 text-sm mt-8"
                >
                    También puedes contactarnos en{" "}
                    <a
                        href="mailto:consultaweb@lenerstudio.com"
                        className="text-blue-400 hover:text-blue-300 transition-colors underline"
                        aria-label="Enviar email a consultaweb@lenerstudio.com"
                    >
                        consultaweb@lenerstudio.com
                    </a>
                </motion.p>
            </div>
        </div>
    );
}
