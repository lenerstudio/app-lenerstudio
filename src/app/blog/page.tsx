import type { Metadata } from "next";
import { BlogClient } from "./BlogClient";
import type { Post } from "./BlogClient";
import { query } from "@/lib/db";

export const metadata: Metadata = {
    title: "Blog de Diseño Web y SEO | Lener Studio",
    description: "Artículos sobre diseño web de alta conversión, posicionamiento SEO, marketing digital y estrategias para negocios online en España.",
    openGraph: {
        title: "Blog | Lener Studio",
        description: "Guías y estrategias de diseño web, SEO y marketing digital para pymes y emprendedores.",
        url: "https://lenerstudio.com/blog",
    }
};

// Fallback estático en caso de que la BD no tenga datos aún
const staticPosts: Post[] = [
    {
        id: 1,
        title: "5 razones por las que tu web no genera clientes",
        excerpt: "Tener visitas no equivale a tener clientes. Descubre los errores más comunes en diseño web que están arruinando tu ratio de conversión y cómo solucionarlos hoy mismo.",
        category: "Diseño Web",
        date: "12 Mar 2026",
        author: "Lener Studio",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&fm=webp&q=80",
        slug: "5-razones-tu-web-no-genera-clientes"
    },
    {
        id: 2,
        title: "Landing page vs web corporativa: ¿cuál necesitas?",
        excerpt: "¿Vas a lanzar un infoproducto o quieres posicionar tu marca a largo plazo? La elección de la arquitectura adecuada determinará el éxito de tu proyecto.",
        category: "Marketing Digital",
        date: "28 Feb 2026",
        author: "Lener Studio",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&fm=webp&q=80",
        slug: "landing-page-vs-web-corporativa"
    },
    {
        id: 3,
        title: "Cuánto cuesta una web profesional en España en 2026",
        excerpt: "Desglosamos los costes reales, desde el hosting y dominio hasta el diseño a medida y SEO técnico. Descubre en qué debes invertir y qué puedes ahorrar.",
        category: "SEO",
        date: "15 Feb 2026",
        author: "Lener Studio",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&fm=webp&q=80",
        slug: "cuanto-cuesta-web-profesional-espana-2026"
    }
];

async function getPosts(): Promise<Post[]> {
    try {
        const rows = await query("SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC") as any[];
        if (!rows || rows.length === 0) return staticPosts;
        return rows.map((r: any) => ({
            id: r.id,
            title: r.title,
            excerpt: r.excerpt,
            category: r.category,
            date: new Date(r.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }),
            author: r.author,
            image: r.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&fm=webp&q=80",
            slug: r.slug,
        }));
    } catch {
        // Si la tabla no existe aún, usamos el fallback estático
        return staticPosts;
    }
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
            <BlogClient posts={posts} />
        </div>
    );
}
