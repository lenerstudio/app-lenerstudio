"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Shield,
    Users,
    FileText,
    Clock,
    Share2,
    UserCheck,
    ExternalLink,
} from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

function fadeUp(delay = 0) {
    return {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const },
        transition: { duration: 0.55, delay, ease: EASE },
    };
}

function SectionHeader({
    number,
    title,
    icon,
}: {
    number: string;
    title: string;
    icon?: React.ReactNode;
}) {
    return (
        <div className="flex items-center gap-3 mb-5">
            <span
                className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold flex items-center justify-center shadow-md shadow-blue-500/30"
                aria-hidden="true"
            >
                {number}
            </span>
            <h2 className="text-2xl font-bold text-white leading-tight flex items-center gap-2">
                {icon && <span className="text-blue-400">{icon}</span>}
                {title}
            </h2>
        </div>
    );
}

function ProviderCard({
    name,
    desc,
    delay,
}: {
    name: string;
    desc: string;
    delay?: number;
}) {
    return (
        <motion.div
            {...fadeUp(delay)}
            className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/40 border border-gray-700/40 hover:border-gray-600/50 transition-colors"
        >
            <ExternalLink
                size={16}
                className="text-blue-400 flex-shrink-0 mt-0.5"
                aria-hidden="true"
            />
            <div>
                <span className="text-white font-semibold text-sm">{name}: </span>
                <span className="text-gray-400 text-sm">{desc}</span>
            </div>
        </motion.div>
    );
}

export default function PoliticaPrivacidadPage() {
    const router = useRouter();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const proveedores = [
        {
            name: "Hostinger",
            desc: "Para el alojamiento de bases de datos MySQL y servidores web.",
            delay: 0.05,
        },
        {
            name: "Vercel",
            desc: "Para el despliegue y hosting de aplicaciones Next.js.",
            delay: 0.1,
        },
        {
            name: "Google",
            desc: "Para servicios de correo (Gmail) y analítica web.",
            delay: 0.15,
        },
    ];

    const derechos = [
        "Acceder a sus datos personales.",
        "Solicitar la rectificación de los datos inexactos.",
        "Solicitar su supresión cuando los datos ya no sean necesarios para los fines que fueron recogidos.",
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-indigo-700/15 blur-3xl" />
                    <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-700/10 blur-3xl" />
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-purple-800/10 blur-3xl" />
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
                        <div className="inline-flex items-center gap-2 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                            <Shield size={16} aria-hidden="true" />
                            RGPD · Privacidad de Datos
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
                            Política de{" "}
                            <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                                Privacidad
                            </span>
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Tu privacidad es nuestra prioridad. Aquí encontrarás toda la información
                            sobre cómo gestionamos tus datos personales de forma transparente y
                            conforme al RGPD.
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

                {/* 1. Responsable */}
                <motion.section {...fadeUp()} aria-labelledby="seccion-responsable">
                    <SectionHeader number="1" title="Responsable del Tratamiento" icon={<Users size={18} />} />
                    <div className="bg-gray-800/40 border border-gray-700/40 rounded-2xl p-5 text-gray-400 text-sm leading-relaxed">
                        <p>
                            El responsable del tratamiento de los datos recogidos a través de esta web
                            es{" "}
                            <span className="text-white font-semibold">Lener Studio</span>. Para
                            cualquier duda, puede contactar con nosotros en{" "}
                            <a
                                href="mailto:consultaweb@lenerstudio.com"
                                className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
                            >
                                consultaweb@lenerstudio.com
                            </a>
                            .
                        </p>
                    </div>
                </motion.section>

                {/* 2. Finalidad */}
                <section aria-labelledby="seccion-finalidad">
                    <motion.div {...fadeUp()}>
                        <SectionHeader number="2" title="Finalidad del Tratamiento de Datos" icon={<FileText size={18} />} />
                        <p className="text-gray-400 leading-relaxed mb-5">
                            En Lener Studio, tratamos la información que nos facilitan las personas
                            interesadas con las siguientes finalidades:
                        </p>
                    </motion.div>

                    <div className="space-y-3">
                        {[
                            {
                                title: "Gestión de clientes y servicios",
                                desc: "Facilitar el desarrollo de proyectos web como aplicaciones de logística, e-commerce y CRM de WhatsApp.",
                                delay: 0.05,
                            },
                            {
                                title: "Gestión de pedidos",
                                desc: "En el caso de demos como Momcakespe o Velvet & Art, gestionar la toma de pedidos y contacto para la entrega de productos de pastelería.",
                                delay: 0.1,
                            },
                            {
                                title: "Contacto y soporte",
                                desc: "Atender consultas realizadas a través de formularios de contacto,para contratar servicios de desarrollo web.",
                                delay: 0.15,
                            },
                        ].map((item) => (
                            <motion.div
                                key={item.title}
                                {...fadeUp(item.delay)}
                                className="flex gap-4 p-4 rounded-xl bg-gray-800/40 border border-gray-700/40"
                            >
                                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-500 mt-2" />
                                <div>
                                    <span className="text-white font-semibold text-sm">{item.title}: </span>
                                    <span className="text-gray-400 text-sm">{item.desc}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3. Legitimación */}
                <section aria-labelledby="seccion-legitimacion">
                    <motion.div {...fadeUp()}>
                        <SectionHeader number="3" title="Legitimación" icon={<UserCheck size={18} />} />
                        <p className="text-gray-400 leading-relaxed mb-5">
                            La base legal para el tratamiento de sus datos es:
                        </p>
                    </motion.div>
                    <div className="space-y-3">
                        {[
                            {
                                text: "El consentimiento del usuario al marcar la casilla de aceptación de la política de privacidad en nuestros formularios.",
                                delay: 0.05,
                            },
                            {
                                text: "La ejecución de un contrato o precontrato de servicios de desarrollo de software y diseño UI/UX.",
                                delay: 0.1,
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(item.delay)}
                                className="flex items-start gap-3 p-4 rounded-xl bg-indigo-900/20 border border-indigo-700/30"
                            >
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600/40 text-indigo-300 flex items-center justify-center text-xs font-bold mt-0.5">
                                    ✓
                                </span>
                                <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. Conservación */}
                <motion.section {...fadeUp()} aria-labelledby="seccion-conservacion">
                    <SectionHeader number="4" title="Conservación de Datos" icon={<Clock size={18} />} />
                    <p className="text-gray-400 leading-relaxed">
                        Los datos personales proporcionados se conservarán mientras se mantenga la
                        relación comercial o durante los años necesarios para cumplir con las
                        obligaciones legales. En el caso de las demos, los datos se eliminan
                        periódicamente tras finalizar la fase de pruebas.
                    </p>
                </motion.section>

                {/* 5. Destinatarios */}
                <section aria-labelledby="seccion-destinatarios">
                    <motion.div {...fadeUp()}>
                        <SectionHeader number="5" title="Destinatarios" icon={<Share2 size={18} />} />
                        <p className="text-gray-400 leading-relaxed mb-5">
                            Lener Studio no cederá sus datos a terceros, salvo obligación legal. Sin
                            embargo, utilizamos proveedores tecnológicos externos para el funcionamiento
                            del servicio:
                        </p>
                    </motion.div>
                    <div className="space-y-3">
                        {proveedores.map((p) => (
                            <ProviderCard key={p.name} {...p} />
                        ))}
                    </div>
                </section>

                {/* 6. Derechos */}
                <section aria-labelledby="seccion-derechos">
                    <motion.div {...fadeUp()}>
                        <SectionHeader number="6" title="Derechos del Usuario" icon={<Shield size={18} />} />
                        <p className="text-gray-400 leading-relaxed mb-5">
                            Usted tiene derecho a obtener confirmación sobre si en Lener Studio estamos
                            tratando sus datos personales. Tiene derecho a:
                        </p>
                    </motion.div>
                    <div className="space-y-3 mb-6">
                        {derechos.map((d, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.07)}
                                className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/40 border border-gray-700/40"
                            >
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs font-bold mt-0.5">
                                    {i + 1}
                                </span>
                                <p className="text-gray-300 text-sm leading-relaxed">{d}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Cómo ejercer los derechos */}
                    <motion.div
                        {...fadeUp(0.25)}
                        className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900/30 to-blue-900/30 border border-indigo-700/30"
                    >
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Para ejercer estos derechos, puede enviar un correo a{" "}
                            <a
                                href="mailto:consultaweb@lenerstudio.com"
                                className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors font-medium"
                            >
                                consultaweb@lenerstudio.com
                            </a>{" "}
                            adjuntando una copia de su DNI para verificar su identidad.
                        </p>
                    </motion.div>
                </section>

                {/* ── CTA final ─────────────────────────────────────────────── */}
                <motion.div
                    {...fadeUp(0.1)}
                    className="text-center bg-gradient-to-br from-indigo-900/40 via-gray-800/60 to-blue-900/40 rounded-3xl p-10 border border-gray-700/50 relative overflow-hidden"
                >
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/3 w-48 h-48 rounded-full bg-indigo-600/10 blur-3xl" />
                        <div className="absolute bottom-0 right-1/3 w-48 h-48 rounded-full bg-blue-600/10 blur-3xl" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            ¿Tienes alguna duda?
                        </h2>
                        <p className="text-gray-300 mb-6 max-w-xl mx-auto text-sm leading-relaxed">
                            Si tienes preguntas sobre cómo tratamos tus datos personales, contáctanos
                            sin compromiso.
                        </p>
                        <button
                            onClick={() => router.push("/#contacto")}
                            aria-label="Ir al formulario de contacto"
                            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-xl shadow-indigo-600/25 text-sm"
                        >
                            Contactar con Lener Studio
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
