"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Mail, Loader2, CheckCircle } from "lucide-react";

export interface ExitIntentPopupProps { }

const MAX_SHOWS = 5;
const LS_KEY = "popupShowCount";
const LS_SESSION_KEY = "popupShownThisSession"; // Evita mostrarlo 2 veces en la misma visita

// Contenido por defecto si no hay popup activo en la BD
const DEFAULT_POPUP = {
    id: null as number | null,
    title: "¡Espera! Antes de irte...",
    subtitle: "Descarga gratis nuestra guía:",
    cta_text: "\"5 errores que arruinan tu web (y cómo evitarlos)\"",
    download_url: null as string | null,
    trigger_delay: 5,
};

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [popup, setPopup] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        // ① No repetir en la misma sesión del navegador
        if (sessionStorage.getItem(LS_SESSION_KEY)) return;

        // ② Verificar límite total (localStorage persiste entre sesiones)
        const count = parseInt(localStorage.getItem(LS_KEY) ?? "0", 10);
        if (count >= MAX_SHOWS) return;

        let timer: ReturnType<typeof setTimeout>;

        const scheduleShow = (popupData: any) => {
            const delayMs = Math.max(3, Number(popupData?.trigger_delay ?? 5)) * 1000;
            setPopup(popupData);
            timer = setTimeout(() => {
                localStorage.setItem(LS_KEY, String(count + 1));
                sessionStorage.setItem(LS_SESSION_KEY, "1");
                setIsVisible(true);
            }, delayMs);
        };

        // ③ Intentar cargar popup activo desde la BD
        fetch("/api/admin/popups?active=1")
            .then(r => { if (!r.ok) throw new Error("api-error"); return r.json(); })
            .then((data: any) => {
                const list = Array.isArray(data) ? data : [];
                // Usa el popup activo de la BD o fallback al default
                scheduleShow(list.length > 0 ? list[0] : DEFAULT_POPUP);
            })
            .catch(() => {
                // Si la API falla por cualquier razón, usar el popup por defecto
                scheduleShow(DEFAULT_POPUP);
            });

        return () => clearTimeout(timer);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClose = () => setIsVisible(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = email.trim();
        if (!trimmed) return;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setErrorMsg("Por favor ingresa un email válido.");
            return;
        }
        setErrorMsg("");
        setStatus("sending");

        try {
            const res = await fetch("/api/popup-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: trimmed, popup_id: popup?.id }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error ?? "Error");

            setStatus("sent");
            setTimeout(() => setIsVisible(false), 3500);
        } catch (err: any) {
            setStatus("error");
            setErrorMsg(err?.message ?? "Error al enviar. Inténtalo de nuevo.");
        }
    };

    // Nunca renderiza nada si el popup no está listo
    if (!popup) return null;

    const hasDownload = !!popup.download_url;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 z-10"
                    >
                        {/* Botón cerrar */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors z-20 bg-gray-100/50 dark:bg-gray-800/50 rounded-full"
                        >
                            <X size={20} />
                        </button>

                        {/* Header gradient */}
                        <div className="relative h-32 bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative z-10 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-lg mt-12 rotate-[-5deg]"
                            >
                                {hasDownload
                                    ? <Download size={28} className="text-blue-600" />
                                    : <Mail size={28} className="text-blue-600" />
                                }
                            </motion.div>
                        </div>

                        <div className="p-8 pt-10 text-center">
                            {/* Estado éxito */}
                            {status === "sent" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-6"
                                >
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        ¡Enviado!
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {hasDownload
                                            ? "Revisa tu bandeja de entrada — te hemos enviado el enlace de descarga."
                                            : "Gracias por suscribirte. Pronto recibirás noticias."}
                                    </p>
                                </motion.div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                                        {popup.title}
                                    </h2>
                                    {popup.subtitle && (
                                        <p className="text-base text-gray-500 dark:text-gray-400 mb-5">
                                            {popup.subtitle}
                                        </p>
                                    )}

                                    {/* Banner de descarga */}
                                    {hasDownload && (
                                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
                                            <Download size={18} className="text-blue-600 shrink-0" />
                                            <p className="text-blue-700 dark:text-blue-300 font-semibold text-sm text-left">
                                                {popup.cta_text || "Descarga gratuita — ingresa tu email para recibirlo"}
                                            </p>
                                        </div>
                                    )}

                                    {/* Sin descarga: mostrar texto descriptivo */}
                                    {!hasDownload && popup.cta_text && (
                                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-xl px-4 py-3 mb-5">
                                            <p className="text-blue-700 dark:text-blue-300 font-bold text-lg leading-tight">
                                                {popup.cta_text}
                                            </p>
                                        </div>
                                    )}

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
                                                onChange={e => { setEmail(e.target.value); setErrorMsg(""); }}
                                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        {errorMsg && (
                                            <p className="text-red-500 text-xs text-left">{errorMsg}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "sending"}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-60"
                                        >
                                            {status === "sending" ? (
                                                <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                                            ) : hasDownload ? (
                                                <><Download size={18} /> Recibir descarga gratis</>
                                            ) : (
                                                "Descargar gratis"
                                            )}
                                        </button>

                                        <p className="text-xs text-gray-400 text-center">
                                            Sin spam. Solo valor. ✓
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
