"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categorias = ["Todos", "SEO", "Diseño Web", "Marketing Digital", "Casos de Éxito"];

export interface Post {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    author: string;
    image: string;
    slug: string;
}

interface BlogClientProps {
    posts: Post[];
}

export function BlogClient({ posts }: BlogClientProps) {
    const [activeCategory, setActiveCategory] = useState("Todos");

    const filteredPosts = activeCategory === "Todos"
        ? posts
        : posts.filter(post => post.category === activeCategory);

    return (
        <>
            {/* Animated Hero Header */}
            <div className="bg-gray-900 pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-600/20 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-600/20 blur-[100px] rounded-full" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 group"
                        >
                            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                            Volver al inicio
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Insights para tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Crecimiento Digital</span>
                        </h1>
                        <p className="text-xl text-gray-300 font-light">
                            Estrategias, guías y recursos probados sobre diseño web, SEO y conversión para negocios inconformistas.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-4 mb-12 overflow-x-auto hide-scrollbar">
                    <div className="flex gap-2 min-w-max justify-center md:justify-start">
                        {categorias.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl font-medium transition-all text-sm ${activeCategory === cat
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col group hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <Link href={`/blog/${post.slug}`}>
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        loading={index === 0 ? "eager" : "lazy"}
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </Link>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <User size={14} />
                                        {post.author}
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1 text-sm leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
                                    >
                                        Leer artículo completo
                                        <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}

                    {filteredPosts.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-gray-500 text-lg">No hay artículos en esta categoría todavía.</p>
                            <button
                                onClick={() => setActiveCategory("Todos")}
                                className="mt-4 text-blue-600 font-semibold"
                            >
                                Ver todos los artículos
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
