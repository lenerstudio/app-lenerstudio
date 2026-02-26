"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Cookie, Shield, BarChart2, Megaphone, Settings } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

function fadeUp(delay = 0) {
    return {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const },
        transition: { duration: 0.55, delay, ease: EASE },
    };
}

interface CookieTypeCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
    delay?: number;
}

function CookieTypeCard({ icon, title, description, color, delay = 0 }: CookieTypeCardProps) {
    return (
        <motion.div
            {...fadeUp(delay)}
            className="flex gap-4 p-5 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/60 transition-all duration-300"
        >
            <div
                className={`flex-shrink-0 w-11 h-11 rounded-xl ${color} flex items-center justify-center shadow-lg`}
            >
                {icon}
            </div>
            <div>
                <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}

function SectionHeader({ number, title }: { number: string; title: string }) {
    return (
        <div className="flex items-center gap-3 mb-5">
            <span
                className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold flex items-center justify-center shadow-md shadow-blue-500/30"
                aria-hidden="true"
            >
                {number}
            </span>
            <h2 className="text-2xl font-bold text-white leading-tight">{title}</h2>
        </div>
    );
}

export default function PoliticaDeCookiesPage() {
    const router = useRouter();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const cookieTypes = [
        {
            icon: <Shield className="w-5 h-5 text-white" />,
            title: "Cookies Técnicas (Necesarias)",
            description:
                "Son aquellas esenciales para que la web funcione correctamente. Incluyen, por ejemplo, las que permiten gestionar el inicio de sesión de clientes en demos como la de Momcakespe o el control de tráfico y comunicación de datos.",
            color: "bg-gradient-to-br from-blue-500 to-indigo-600",
            delay: 0.05,
        },
        {
            icon: <Settings className="w-5 h-5 text-white" />,
            title: "Cookies de Personalización",
            description:
                "Permiten al usuario acceder al servicio con algunas características de carácter general predefinidas (por ejemplo, el idioma o el tipo de navegador).",
            color: "bg-gradient-to-br from-purple-500 to-violet-600",
            delay: 0.1,
        },
        {
            icon: <BarChart2 className="w-5 h-5 text-white" />,
            title: "Cookies de Análisis",
            description:
                "Son aquellas que, tratadas por nosotros o por terceros (como Google Analytics), nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico de la utilización que hacen los usuarios de nuestra web para mejorar la oferta de servicios de Lener Studio.",
            color: "bg-gradient-to-br from-cyan-500 to-teal-600",
            delay: 0.15,
        },
        {
            icon: <Megaphone className="w-5 h-5 text-white" />,
            title: "Cookies de Publicidad Comportamental",
            description:
                "Almacenan información del comportamiento de los usuarios obtenida a través de la observación continuada de sus hábitos de navegación, lo que permite desarrollar un perfil específico para mostrar publicidad en función del mismo.",
            color: "bg-gradient-to-br from-orange-500 to-red-600",
            delay: 0.2,
        },
    ];

    const tablaCookies = [
        {
            proveedor: "Propia",
            nombre: "cookie-consent",
            finalidad: "Almacena la preferencia del usuario sobre el banner de cookies.",
            expiracion: "1 año",
        },
        {
            proveedor: "Google",
            nombre: "_ga, _gid",
            finalidad: "Análisis estadístico de visitas para optimización de proyectos.",
            expiracion: "2 años",
        },
        {
            proveedor: "Hostinger",
            nombre: "X-Mapping-*",
            finalidad:
                "Optimización del servidor y balanceo de carga en nuestra infraestructura.",
            expiracion: "Sesión",
        },
    ];

    const browserLinks = [
        {
            name: "Google Chrome",
            desc: "Configuración → Mostrar opciones avanzadas → Privacidad → Configuración de contenido",
        },
        {
            name: "Mozilla Firefox",
            desc: "Herramientas → Opciones → Privacidad → Historial → Configuración Personalizada",
        },
        { name: "Apple Safari", desc: "Preferencias → Seguridad" },
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden">
                {/* Fondo decorativo */}
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-700/15 blur-3xl" />
                    <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-purple-700/10 blur-3xl" />
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cyan-800/10 blur-3xl" />
                </div>

                <div className="container mx-auto px-4 pt-6 pb-12 relative z-10">
                    {/* Botón volver */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.push("/")}
                        aria-label="Volver a la página de inicio"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 group"
                    >
                        <ArrowLeft
                            size={18}
                            className="transition-transform group-hover:-translate-x-1"
                            aria-hidden="true"
                        />
                        Volver al inicio
                    </motion.button>

                    {/* Título */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                            <Cookie size={16} aria-hidden="true" />
                            Transparencia y Privacidad
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
                            Política de{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Cookies
                            </span>
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            En Lener Studio creemos en la total transparencia sobre cómo utilizamos las
                            cookies. Aquí encontrarás todo lo que necesitas saber.
                        </p>
                        <p className="text-sm text-gray-600 mt-4">
                            Última actualización:{" "}
                            <time dateTime="2026-02-23">23 de febrero de 2026</time>
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── CONTENIDO ────────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 pb-24 max-w-4xl space-y-14">

                {/* 1. ¿Qué son las cookies? */}
                <motion.section
                    {...fadeUp()}
                    aria-labelledby="seccion-que-son"
                >
                    <SectionHeader number="1" title="¿Qué son las cookies?" />
                    <p className="text-gray-400 leading-relaxed">
                        Una cookie es un pequeño archivo que se almacena en el ordenador, smartphone o
                        tablet del usuario al acceder a determinadas páginas web. Las cookies permiten a
                        una web, entre otras cosas, almacenar y recuperar información sobre los hábitos de
                        navegación de un usuario o de su equipo para mejorar el servicio ofrecido.
                    </p>
                </motion.section>

                {/* 2. Tipos de cookies */}
                <section aria-labelledby="seccion-tipos">
                    <motion.div {...fadeUp()}>
                        <SectionHeader number="2" title="¿Qué tipos de cookies utiliza este sitio web?" />
                        <p className="text-gray-400 leading-relaxed mb-6">
                            En{" "}
                            <span className="text-white font-medium">lenerstudio.com</span>, utilizamos las
                            siguientes categorías de cookies:
                        </p>
                    </motion.div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {cookieTypes.map((ct) => (
                            <CookieTypeCard key={ct.title} {...ct} />
                        ))}
                    </div>
                </section>

                {/* 3. Cuadro informativo */}
                <section aria-labelledby="seccion-tabla">
                    <motion.div {...fadeUp()}>
                        <SectionHeader number="3" title="Cuadro Informativo de Cookies Utilizadas" />
                        <p className="text-gray-400 leading-relaxed mb-6">
                            A continuación detallamos las cookies específicas que podemos instalar:
                        </p>
                    </motion.div>

                    {/* Tabla responsive */}
                    <motion.div
                        {...fadeUp(0.05)}
                        className="overflow-x-auto rounded-2xl border border-gray-700/60"
                    >
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-800/80 text-gray-300">
                                    <th className="px-5 py-3.5 text-left font-semibold whitespace-nowrap">
                                        Proveedor
                                    </th>
                                    <th className="px-5 py-3.5 text-left font-semibold whitespace-nowrap">
                                        Nombre
                                    </th>
                                    <th className="px-5 py-3.5 text-left font-semibold">Finalidad</th>
                                    <th className="px-5 py-3.5 text-left font-semibold whitespace-nowrap">
                                        Expiración
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tablaCookies.map((row, i) => (
                                    <tr
                                        key={row.nombre}
                                        className={`border-t border-gray-700/50 transition-colors ${i % 2 === 0 ? "bg-gray-900/30" : "bg-gray-800/20"
                                            } hover:bg-gray-700/30`}
                                    >
                                        <td className="px-5 py-4 text-gray-300 font-medium whitespace-nowrap">
                                            {row.proveedor}
                                        </td>
                                        <td className="px-5 py-4">
                                            <code className="bg-blue-500/15 text-blue-300 px-2 py-0.5 rounded-md text-xs font-mono">
                                                {row.nombre}
                                            </code>
                                        </td>
                                        <td className="px-5 py-4 text-gray-400 leading-relaxed">{row.finalidad}</td>
                                        <td className="px-5 py-4 text-gray-400 whitespace-nowrap">{row.expiracion}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </section>

                {/* 4. Consentimiento y Configuración */}
                <section aria-labelledby="seccion-consentimiento">
                    <motion.div {...fadeUp()}>
                        <SectionHeader number="4" title="Consentimiento y Configuración" />
                        <p className="text-gray-400 leading-relaxed mb-6">
                            El usuario puede aceptar, bloquear o eliminar las cookies instaladas en su equipo
                            mediante la configuración de las opciones del navegador instalado en su
                            ordenador:
                        </p>
                    </motion.div>

                    <div className="space-y-3">
                        {browserLinks.map((b, i) => (
                            <motion.div
                                key={b.name}
                                {...fadeUp(i * 0.07)}
                                className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/40 border border-gray-700/40"
                            >
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs font-bold mt-0.5">
                                    {i + 1}
                                </span>
                                <div>
                                    <span className="text-white font-medium text-sm">{b.name}: </span>
                                    <span className="text-gray-400 text-sm">{b.desc}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA reabrir banner */}
                    <motion.div
                        {...fadeUp(0.25)}
                        className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-700/30"
                    >
                        <p className="text-gray-300 text-sm leading-relaxed">
                            <span className="text-white font-semibold">¿Quieres cambiar tu preferencia?</span>{" "}
                            Puedes gestionar tus cookies en cualquier momento haciendo clic en el botón
                            inferior o borrando la clave{" "}
                            <code className="bg-blue-500/15 text-blue-300 px-1.5 py-0.5 rounded text-xs font-mono">
                                cookie-consent
                            </code>{" "}
                            de tu navegador y recargando la página.
                        </p>
                        <button
                            id="reopen-cookie-banner-btn"
                            onClick={() => {
                                localStorage.removeItem("cookie-consent");
                                window.location.reload();
                            }}
                            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-blue-600/25"
                        >
                            <Cookie size={15} aria-hidden="true" />
                            Gestionar mis cookies
                        </button>
                    </motion.div>
                </section>

                {/* 5. Actualización */}
                <motion.section
                    {...fadeUp()}
                    aria-labelledby="seccion-actualizacion"
                >
                    <SectionHeader number="5" title="Actualización de la Política" />
                    <p className="text-gray-400 leading-relaxed">
                        Lener Studio puede modificar esta Política de Cookies en función de nuevas
                        exigencias legislativas o reglamentarias. Se recomienda al usuario visitar esta
                        página periódicamente para estar informado de los cambios.
                    </p>
                </motion.section>

                {/* ── CTA final ─────────────────────────────────────────────── */}
                <motion.div
                    {...fadeUp(0.1)}
                    className="text-center bg-gradient-to-br from-blue-900/40 via-gray-800/60 to-purple-900/40 rounded-3xl p-10 border border-gray-700/50 relative overflow-hidden"
                >
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/3 w-48 h-48 rounded-full bg-blue-600/10 blur-3xl" />
                        <div className="absolute bottom-0 right-1/3 w-48 h-48 rounded-full bg-purple-600/10 blur-3xl" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            ¿Tienes alguna pregunta?
                        </h2>
                        <p className="text-gray-300 mb-6 max-w-xl mx-auto text-sm leading-relaxed">
                            Si tienes dudas sobre nuestra política de cookies o sobre el tratamiento de tus
                            datos, no dudes en contactarnos.
                        </p>
                        <button
                            onClick={() => router.push("/#contacto")}
                            aria-label="Ir al formulario de contacto"
                            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-xl shadow-blue-600/25 text-sm"
                        >
                            Contactar con Lener Studio
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
