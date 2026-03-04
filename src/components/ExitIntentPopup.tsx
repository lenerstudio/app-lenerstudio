"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Mail } from "lucide-react";

export interface ExitIntentPopupProps { }

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Verificar si ya se mostro en esta sesion
        const sessionShown = sessionStorage.getItem("exitIntentShown");
        if (sessionShown) {
            setHasShown(true);
            return;
        }

        const mouseEvent = (e: MouseEvent) => {
            // Si el cursor sale por arriba (hacia la barra de navegacion/pestañas)
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem("exitIntentShown", "true");
            }
        };

        document.addEventListener("mouseleave", mouseEvent);

        return () => {
            document.removeEventListener("mouseleave", mouseEvent);
        };
    }, [hasShown]);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() !== "") {
            // Aqui integrarias con tu proveedor de email marketing
            console.log("Suscrito:", email);
            setSubmitted(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 z-10"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-20 bg-gray-100/50 dark:bg-gray-800/50 rounded-full"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative h-32 bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative z-10 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-lg mt-12 rotate-[-5deg]"
                            >
                                <div className="w-12 h-16 border-2 border-blue-500 rounded flex flex-col items-center justify-center p-1 bg-blue-50">
                                    <div className="w-full h-1 bg-blue-200 mb-1 rounded"></div>
                                    <div className="w-3/4 h-1 bg-blue-200 mb-1 rounded"></div>
                                    <div className="w-full h-1 bg-blue-200 mb-1 rounded"></div>
                                    <div className="w-1/2 h-1 bg-blue-200 rounded"></div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="p-8 pt-10 text-center">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-8"
                                >
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Download size={32} className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        ¡Guía en camino!
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Revisa tu bandeja de entrada en unos minutos.
                                    </p>
                                </motion.div>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                                        ¡Espera! Antes de irte...
                                    </h2>
                                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 font-medium">
                                        Descarga gratis nuestra guía:
                                    </p>

                                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-xl p-4 mb-6">
                                        <p className="text-blue-700 dark:text-blue-300 font-bold text-lg leading-tight">
                                            "5 errores que arruinan tu web (y cómo evitarlos)"
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                placeholder="Tu mejor email..."
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                                        >
                                            Descargar gratis
                                            <Download size={18} />
                                        </button>
                                        <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
                                            Sin spam. Solo valor.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ExitIntentPopup;
