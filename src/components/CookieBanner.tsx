"use client";

import { useState, useEffect } from "react";
import { Cookie, Settings, X, ShieldCheck } from "lucide-react";

const COOKIE_KEY = "cookie-consent";

type ConsentValue = "accepted" | "rejected" | null;

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [showConfig, setShowConfig] = useState(false);

    // Leer preferencia al montar el componente
    useEffect(() => {
        const consent = localStorage.getItem(COOKIE_KEY) as ConsentValue;
        if (!consent) {
            // Pequeño delay para que la animación de entrada sea perceptible
            const timer = setTimeout(() => setVisible(true), 800);
            return () => clearTimeout(timer);
        }
    }, []);

    /** Cierra el banner con transición de salida */
    const dismiss = (value: "accepted" | "rejected") => {
        localStorage.setItem(COOKIE_KEY, value);
        setLeaving(true);
        setTimeout(() => setVisible(false), 420);
    };

    const handleAccept = () => dismiss("accepted");
    const handleReject = () => dismiss("rejected");

    if (!visible) return null;

    return (
        <>
            {/* Overlay sutil para la vista de configuración */}
            {showConfig && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
                    onClick={() => setShowConfig(false)}
                    aria-hidden="true"
                />
            )}

            {/* ── Banner principal ─────────────────────────────────────────── */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Banner de consentimiento de cookies"
                className={[
                    "fixed bottom-0 left-0 right-0 z-[999]",
                    "px-4 py-4 sm:px-6",
                    "transition-all duration-[420ms] ease-in-out",
                    leaving
                        ? "opacity-0 translate-y-6 pointer-events-none"
                        : "opacity-100 translate-y-0",
                ].join(" ")}
            >
                <div
                    className={[
                        "max-w-5xl mx-auto",
                        "bg-[#0f1624]/95 backdrop-blur-md",
                        "border border-white/10",
                        "rounded-2xl shadow-[0_-4px_40px_rgba(0,0,0,0.45)]",
                        "px-5 py-4 sm:px-6 sm:py-5",
                        "flex flex-col sm:flex-row gap-4 sm:items-center",
                        showConfig ? "rounded-b-none" : "",
                    ].join(" ")}
                >
                    {/* Icono */}
                    <div className="flex-shrink-0 hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
                        <Cookie className="w-6 h-6 text-white" />
                    </div>

                    {/* Texto */}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-[0.9rem] text-white/90 leading-relaxed">
                            <span className="font-semibold text-white">🍪 Tu privacidad importa. </span>
                            Usamos cookies propias y de terceros para mejorar tu experiencia,
                            analizar el tráfico y personalizar el contenido.{" "}
                            <a
                                href="/politica-de-cookies"
                                className="underline underline-offset-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 whitespace-nowrap"
                            >
                                Más información
                            </a>
                        </p>
                    </div>

                    {/* Botones */}
                    <div className="flex flex-row sm:flex-row gap-2 flex-shrink-0">
                        {/* Configurar */}
                        <button
                            id="cookie-config-btn"
                            onClick={() => setShowConfig((prev) => !prev)}
                            className={[
                                "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium",
                                "border transition-all duration-200",
                                showConfig
                                    ? "bg-white/10 border-white/30 text-white"
                                    : "border-white/20 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5",
                            ].join(" ")}
                            aria-label="Configurar preferencias de cookies"
                        >
                            <Settings className="w-4 h-4" />
                            <span className="hidden xs:inline sm:inline">Configurar</span>
                        </button>

                        {/* Aceptar */}
                        <button
                            id="cookie-accept-btn"
                            onClick={handleAccept}
                            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:from-blue-400 hover:to-indigo-500 hover:shadow-blue-500/50 active:scale-[0.97] transition-all duration-200"
                            aria-label="Aceptar todas las cookies"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            Aceptar
                        </button>

                        {/* Cerrar rápido */}
                        <button
                            id="cookie-close-btn"
                            onClick={handleReject}
                            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl border border-white/15 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
                            aria-label="Rechazar cookies y cerrar"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* ── Panel de configuración ────────────────────────────────── */}
                <div
                    className={[
                        "max-w-5xl mx-auto overflow-hidden",
                        "bg-[#111827]/98 backdrop-blur-md",
                        "border border-t-0 border-white/10",
                        "rounded-b-2xl",
                        "transition-all duration-300 ease-in-out",
                        showConfig
                            ? "max-h-[480px] opacity-100 py-5 px-5 sm:px-6"
                            : "max-h-0 opacity-0 py-0 px-5 sm:px-6",
                    ].join(" ")}
                    aria-hidden={!showConfig}
                >
                    <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                        <Settings className="w-4 h-4 text-blue-400" />
                        Gestionar preferencias de cookies
                    </h3>

                    <div className="space-y-3">
                        {/* Necesarias — siempre activas */}
                        <CookieToggleRow
                            title="Cookies necesarias"
                            description="Esenciales para que el sitio web funcione correctamente. No se pueden desactivar."
                            forcedOn
                        />
                        {/* Analíticas */}
                        <CookieToggleRow
                            title="Cookies analíticas"
                            description="Nos ayudan a entender cómo interactúas con el sitio para mejorar la experiencia."
                        />
                        {/* Marketing */}
                        <CookieToggleRow
                            title="Cookies de marketing"
                            description="Permiten mostrarte anuncios relevantes en otras plataformas."
                        />
                    </div>

                    {/* Acciones del panel */}
                    <div className="flex flex-col xs:flex-row gap-2 mt-5 pt-4 border-t border-white/10">
                        <button
                            id="cookie-reject-all-btn"
                            onClick={handleReject}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-white/20 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
                        >
                            Rechazar opcionales
                        </button>
                        <button
                            id="cookie-save-prefs-btn"
                            onClick={handleAccept}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:from-blue-400 hover:to-indigo-500 active:scale-[0.97] transition-all duration-200"
                        >
                            Guardar preferencias
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

/* ── Fila de toggle individual ──────────────────────────────────────── */
interface CookieToggleRowProps {
    title: string;
    description: string;
    forcedOn?: boolean;
}

function CookieToggleRow({ title, description, forcedOn }: CookieToggleRowProps) {
    const [enabled, setEnabled] = useState(forcedOn ?? false);

    return (
        <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/5 border border-white/8">
            <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium leading-snug">{title}</p>
                <p className="text-white/50 text-xs mt-0.5 leading-relaxed">{description}</p>
            </div>

            {/* Toggle switch */}
            <button
                role="switch"
                aria-checked={enabled}
                aria-label={`${enabled ? "Desactivar" : "Activar"} ${title}`}
                onClick={() => !forcedOn && setEnabled((v) => !v)}
                disabled={forcedOn}
                className={[
                    "flex-shrink-0 relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                    enabled
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                        : "bg-white/20",
                    forcedOn ? "cursor-not-allowed opacity-70" : "cursor-pointer",
                ].join(" ")}
            >
                <span
                    className={[
                        "inline-block w-5 h-5 mt-0.5 rounded-full bg-white shadow transition-transform duration-200",
                        enabled ? "translate-x-5" : "translate-x-0.5",
                    ].join(" ")}
                />
                {forcedOn && (
                    <span className="sr-only">Siempre activo</span>
                )}
            </button>
        </div>
    );
}
