"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    ExternalLink,
    Github,
    ArrowLeft,
    Layers,
    Filter,
    Eye,
    Sparkles,
} from "lucide-react";

// ──────────────────────────────────────────────
// TIPOS
// ──────────────────────────────────────────────
type Categoria = "Todos" | "Landing Page" | "E-commerce" | "App Web" | "Corporativo";

interface Proyecto {
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    categoria: Categoria;
    tecnologias: string[];
    urlDemo?: string;
    urlRepo?: string;
    destacado?: boolean;
    estado: "En vivo" | "En desarrollo" | "Demo";
    color: string; // gradiente para el card
}

// ──────────────────────────────────────────────
// DATOS DE PROYECTOS
// ──────────────────────────────────────────────
const proyectos: Proyecto[] = [
    {
        id: 1,
        titulo: "Lener Studio — Landing Page",
        descripcion:
            "Landing page de alta conversión para agencia web. Diseño moderno con animaciones fluidas, formulario de contacto integrado con EmailJS y SEO optimizado.",
        imagen:
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&fm=webp&fit=crop",
        categoria: "Landing Page",
        tecnologias: ["React", "Tailwind CSS", "Framer Motion", "EmailJS", "Vite"],
        urlDemo: "https://lenerstudio.vercel.app",
        destacado: true,
        estado: "En vivo",
        color: "from-blue-600 to-cyan-500",
    },
    {
        id: 2,
        titulo: "Landing Page + Tienda Online — E-commerce",
        descripcion:
            "Plataforma de comercio electrónico completa con carrito, pagos y panel de administración. Gestión de products, pedidos y clientes en tiempo real.",
        imagen:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&fm=webp&fit=crop",
        categoria: "E-commerce",
        tecnologias: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Vercel"],
        urlDemo: "#",
        estado: "Demo",
        color: "from-purple-600 to-pink-500",
    },
    {
        id: 3,
        titulo: "Dashboard SaaS — App Web",
        descripcion:
            "Panel de control para gestión de métricas de negocio. Gráficas interactivas, exportación de reportes y gestión de usuarios con roles y permisos.",
        imagen:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fm=webp&fit=crop",
        categoria: "App Web",
        tecnologias: ["React", "Node.js", "MySQL", "Chart.js", "JWT"],
        urlDemo: "#",
        estado: "En desarrollo",
        color: "from-orange-500 to-red-500",
    },
    {
        id: 4,
        titulo: "Despacho Jurídico — Corporativo",
        descripcion:
            "Web corporativa para bufete de abogados. Diseño elegante y profesional con secciones de áreas de práctica, equipo y formulario de consulta.",
        imagen:
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80&fm=webp&fit=crop",
        categoria: "Corporativo",
        tecnologias: ["WordPress", "Elementor", "SEO", "WPForms"],
        urlDemo: "#",
        estado: "En vivo",
        color: "from-slate-600 to-gray-500",
    },
    {
        id: 5,
        titulo: "Clínica Dental — Landing Page",
        descripcion:
            "Landing page para clínica dental con sistema de citas online, galería de tratamientos, testimonios reales y optimización local SEO.",
        imagen:
            "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80&fm=webp&fit=crop",
        categoria: "Landing Page",
        tecnologias: ["React", "Tailwind CSS", "Calendly", "Google Maps"],
        urlDemo: "#",
        estado: "Demo",
        color: "from-emerald-500 to-teal-500",
    },
    {
        id: 6,
        titulo: "Restaurante — Web Completa",
        descripcion:
            "Sitio web para restaurante con carta digital interactiva, sistema de reservas online, galería de platos y gestión desde panel de administración.",
        imagen:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&fm=webp&fit=crop",
        categoria: "Corporativo",
        tecnologias: ["Next.js", "Laravel", "MySQL", "Stripe", "Cloudinary"],
        urlDemo: "#",
        estado: "En vivo",
        color: "from-yellow-500 to-orange-500",
    },
];

const categorias: Categoria[] = ["Todos", "Landing Page", "E-commerce", "App Web", "Corporativo"];

const estadoColors: Record<string, string> = {
    "En vivo": "bg-green-500/20 text-green-400 border-green-500/30",
    "En desarrollo": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Demo: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

// ──────────────────────────────────────────────
// COMPONENTE CARD
// ──────────────────────────────────────────────
const ProyectoCard: React.FC<{ proyecto: Proyecto; index: number }> = ({
    proyecto,
    index,
}) => {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-500/60 transition-all duration-300 flex flex-col"
        >
            {/* Badge destacado */}
            {proyecto.destacado && (
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-yellow-500/90 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    <Sparkles size={12} aria-hidden="true" />
                    Destacado
                </div>
            )}

            {/* Estado */}
            <div className="absolute top-3 right-3 z-20">
                <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-sm ${estadoColors[proyecto.estado]}`}
                >
                    {proyecto.estado === "En vivo" && (
                        <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse" aria-hidden="true" />
                    )}
                    {proyecto.estado}
                </span>
            </div>

            {/* Imagen con overlay en hover */}
            <div className="relative overflow-hidden h-56">
                <img
                    src={proyecto.imagen}
                    alt={`Captura de pantalla del proyecto ${proyecto.titulo}`}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay degradado siempre visible (bottom) */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

                {/* Overlay hover con acciones */}
                <div className="absolute inset-0 bg-gray-900/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {proyecto.urlDemo && proyecto.urlDemo !== "#" && (
                        <a
                            href={proyecto.urlDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Ver demo en vivo de ${proyecto.titulo}`}
                            className="flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:scale-105 shadow-xl"
                        >
                            <Eye size={16} aria-hidden="true" />
                            Ver Demo
                        </a>
                    )}
                    {proyecto.urlRepo && (
                        <a
                            href={proyecto.urlRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Ver código fuente de ${proyecto.titulo}`}
                            className="flex items-center gap-2 bg-gray-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-all duration-200 hover:scale-105 shadow-xl border border-gray-600"
                        >
                            <Github size={16} aria-hidden="true" />
                            Código
                        </a>
                    )}
                    {(!proyecto.urlDemo || proyecto.urlDemo === "#") && !proyecto.urlRepo && (
                        <p className="text-white text-sm font-medium bg-black/40 px-4 py-2 rounded-xl">
                            Próximamente
                        </p>
                    )}
                </div>
            </div>

            {/* Contenido */}
            <div className="flex flex-col flex-1 p-6">
                {/* Categoria badge */}
                <div
                    className={`self-start text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${proyecto.color} text-white mb-3`}
                >
                    {proyecto.categoria}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    {proyecto.titulo}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                    {proyecto.descripcion}
                </p>

                {/* Stack de tecnologías */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {proyecto.tecnologias.map((tech) => (
                        <span
                            key={tech}
                            className="text-xs bg-gray-700/80 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-600/50"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Enlace rápido al demo */}
                {proyecto.urlDemo && proyecto.urlDemo !== "#" ? (
                    <a
                        href={proyecto.urlDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visitar proyecto ${proyecto.titulo}`}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors group/link"
                    >
                        <ExternalLink
                            size={14}
                            className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            aria-hidden="true"
                        />
                        Visitar proyecto
                    </a>
                ) : (
                    <span className="text-gray-600 text-sm">Demo disponible próximamente</span>
                )}
            </div>
        </motion.article>
    );
};

// ──────────────────────────────────────────────
// PÁGINA PRINCIPAL
// ──────────────────────────────────────────────
export default function PortafolioPage() {
    const router = useRouter();
    const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("Todos");
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const proyectosFiltrados = proyectos.filter((p) => {
        const matchCat = categoriaActiva === "Todos" || p.categoria === categoriaActiva;
        const matchBusqueda =
            busqueda === "" ||
            p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.tecnologias.some((t) => t.toLowerCase().includes(busqueda.toLowerCase()));
        return matchCat && matchBusqueda;
    });

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* ── HERO ── */}
            <div className="relative overflow-hidden">
                {/* Fondo con gradientes */}
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-700/15 blur-3xl" />
                    <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-purple-700/15 blur-3xl" />
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
                            <Layers size={16} aria-hidden="true" />
                            Proyectos y Demos
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Nuestro{" "}
                            <span className="text-gradient">Portafolio</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8">
                            Cada proyecto es único. Explora una selección de trabajos reales
                            que hemos construido para nuestros clientes y demos que demuestran
                            nuestras capacidades.
                        </p>

                        {/* Contador rápido */}
                        <div className="flex justify-center gap-8 text-center">
                            {[
                                { num: proyectos.length, label: "Proyectos" },
                                { num: proyectos.filter((p) => p.estado === "En vivo").length, label: "En vivo" },
                                { num: categorias.length - 1, label: "Categorías" },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-3xl font-bold text-white">{stat.num}+</div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── FILTROS ── */}
            <div className="container mx-auto px-4 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col md:flex-row gap-4 items-center justify-between"
                >
                    {/* Filtro por categoría */}
                    <div
                        role="group"
                        aria-label="Filtrar proyectos por categoría"
                        className="flex flex-wrap gap-2 justify-center md:justify-start"
                    >
                        <Filter size={18} className="text-gray-500 self-center hidden md:block" aria-hidden="true" />
                        {categorias.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategoriaActiva(cat)}
                                aria-pressed={categoriaActiva === cat}
                                aria-label={`Filtrar por ${cat}`}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${categoriaActiva === cat
                                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/25"
                                    : "bg-gray-800/60 border-gray-700/50 text-gray-400 hover:border-gray-500 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Búsqueda */}
                    <div className="relative w-full md:w-64">
                        <label htmlFor="busqueda-proyectos" className="sr-only">
                            Buscar proyectos por nombre o tecnología
                        </label>
                        <input
                            id="busqueda-proyectos"
                            type="search"
                            placeholder="Buscar proyecto o tecnología..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full bg-gray-800/60 border border-gray-700/50 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                        {busqueda && (
                            <button
                                onClick={() => setBusqueda("")}
                                aria-label="Limpiar búsqueda"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* ── GRID DE PROYECTOS ── */}
            <div className="container mx-auto px-4 pb-24">
                <AnimatePresence mode="popLayout">
                    {proyectosFiltrados.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {proyectosFiltrados.map((proyecto, index) => (
                                <ProyectoCard
                                    key={proyecto.id}
                                    proyecto={proyecto}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-24"
                        >
                            <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                No encontramos proyectos
                            </h2>
                            <p className="text-gray-400">
                                Intenta con otra búsqueda o categoría
                            </p>
                            <button
                                onClick={() => {
                                    setBusqueda("");
                                    setCategoriaActiva("Todos");
                                }}
                                className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
                            >
                                Ver todos los proyectos
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-24 text-center bg-gradient-to-br from-blue-900/40 via-gray-800/60 to-purple-900/40 rounded-3xl p-12 border border-gray-700/50 relative overflow-hidden"
                >
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl" />
                        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            ¿Tienes un proyecto en mente?
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Cuéntanos tu idea y lo convertimos en realidad. Cada proyecto
                            comienza con una conversación gratuita.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => router.push("/#contacto")}
                                aria-label="Ir al formulario de contacto"
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-xl shadow-blue-600/25"
                            >
                                Hablar de mi proyecto
                            </button>
                            <a
                                href="https://wa.me/+34624432245?text=Hola,%20vi%20el%20portafolio%20y%20me%20interesa%20un%20proyecto%20similar"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Contactar por WhatsApp sobre un nuevo proyecto"
                                className="px-8 py-4 bg-green-600/20 hover:bg-green-600/30 text-green-400 font-semibold rounded-xl border border-green-600/30 transition-all duration-200 hover:scale-105"
                            >
                                💬 WhatsApp directo
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
