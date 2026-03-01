"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

const WhatsAppButton: React.FC = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [hasShownTooltip, setHasShownTooltip] = useState(false);



    const whatsappNumber = "+34624432245";
    const whatsappMessage =
        "Hola, me interesa saber más sobre sus servicios de diseño web 👋";
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodeURIComponent(whatsappMessage)}`;

    // Mostrar el botón después de 2 segundos de scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            }
        };

        // También mostrar después de 3 segundos aunque no haga scroll
        const timer = setTimeout(() => setIsVisible(true), 3000);

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        };
    }, []);

    // Mostrar tooltip automáticamente 1 vez después de que aparezca el botón
    useEffect(() => {
        if (isVisible && !hasShownTooltip) {
            const timer = setTimeout(() => {
                setIsTooltipOpen(true);
                setHasShownTooltip(true);
                // Cerrar automaticamente después de 5 segundos
                setTimeout(() => setIsTooltipOpen(false), 5000);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isVisible, hasShownTooltip]);

    // No mostrar en el dashboard administrativo
    if (pathname?.startsWith("/admin")) return null;

    return (
        <div
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
            role="complementary"
            aria-label="Contacto por WhatsApp"
        >
            {/* Tooltip / Mensaje de burbuja */}
            <AnimatePresence>
                {isTooltipOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10, x: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative max-w-[240px] bg-white rounded-2xl rounded-br-sm shadow-2xl border border-gray-100 p-4"
                    >
                        {/* Botón cerrar */}
                        <button
                            onClick={() => setIsTooltipOpen(false)}
                            aria-label="Cerrar mensaje de WhatsApp"
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                        >
                            <X size={14} aria-hidden="true" />
                        </button>

                        {/* Avatar */}
                        <div className="flex items-start gap-3 mb-3 pr-4">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                <MessageCircle size={18} className="text-white" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-900">Lener Studio</p>
                                <p className="text-xs text-green-600 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" aria-hidden="true" />
                                    En línea
                                </p>
                            </div>
                        </div>

                        {/* Mensaje */}
                        <div className="bg-green-50 rounded-xl rounded-tl-sm p-3">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                👋 ¡Hola! ¿Tienes alguna pregunta sobre tu proyecto web?{" "}
                                <strong>¡Escríbenos!</strong>
                            </p>
                        </div>

                        {/* CTA */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Abrir conversación en WhatsApp"
                            className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] shadow-md shadow-green-500/30"
                            onClick={() => setIsTooltipOpen(false)}
                        >
                            Iniciar conversación
                        </a>

                        {/* Cola del bocadillo */}
                        <div
                            aria-hidden="true"
                            className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-b border-r border-gray-100 rotate-45"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Botón principal de WhatsApp */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="relative"
                    >
                        {/* Anillo pulsante */}
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full bg-green-500/40"
                        />
                        {/* Segundo anillo */}
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full bg-green-400/30"
                        />

                        <motion.a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Contactar por WhatsApp - Lener Studio"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsTooltipOpen(false)}
                            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/40 transition-shadow hover:shadow-green-500/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-400 focus-visible:ring-offset-2"
                        >
                            {/* Icono WhatsApp SVG oficial */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                width="32"
                                height="32"
                                fill="white"
                                aria-hidden="true"
                            >
                                <path d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.322,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z" opacity=".3" />
                                <path d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.322,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z" fill="none" stroke="white" strokeWidth="0" />
                                <path fill="white" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z M24.014,38.112h-0.005c-2.523-0.001-4.999-0.679-7.171-1.961l-0.516-0.306l-5.350,1.402l1.426-5.206l-0.336-0.533c-1.408-2.237-2.152-4.816-2.151-7.443c0.003-7.728,6.292-14.011,14.022-14.011c3.743,0.001,7.269,1.46,9.95,4.014c2.679,2.556,4.154,5.956,4.153,9.572C37.987,31.828,31.723,38.112,24.014,38.112z M31.897,27.184c-0.399-0.199-2.363-1.166-2.73-1.299c-0.367-0.133-0.634-0.199-0.901,0.199c-0.267,0.399-1.034,1.299-1.267,1.566c-0.233,0.267-0.467,0.3-0.866,0.1c-0.399-0.2-1.686-0.621-3.21-1.981c-1.187-1.058-1.988-2.365-2.221-2.764c-0.233-0.399-0.025-0.615,0.175-0.814c0.18-0.179,0.399-0.466,0.599-0.699c0.2-0.233,0.267-0.399,0.4-0.666c0.133-0.267,0.067-0.5-0.033-0.699c-0.1-0.199-0.901-2.167-1.234-2.966c-0.325-0.779-0.656-0.674-0.901-0.686c-0.233-0.011-0.5-0.013-0.767-0.013c-0.267,0-0.7,0.1-1.067,0.499c-0.367,0.4-1.4,1.367-1.4,3.334c0,1.966,1.433,3.866,1.633,4.132c0.2,0.267,2.818,4.304,6.832,6.034c0.954,0.412,1.699,0.658,2.28,0.843c0.958,0.305,1.831,0.262,2.52,0.159c0.769-0.115,2.363-0.966,2.696-1.9c0.333-0.933,0.333-1.733,0.233-1.9C32.531,27.484,32.297,27.384,31.897,27.184z" />
                            </svg>
                        </motion.a>

                        {/* Badge con número no leído */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            aria-hidden="true"
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-md"
                        >
                            <span className="text-white text-xs font-bold">1</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WhatsAppButton;
