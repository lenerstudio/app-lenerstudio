import { MetadataRoute } from 'next';
import { query } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lenerstudio.com';

    // 1. Rutas Estáticas
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/portafolio`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/politica-de-cookies`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/politica-de-privacidad`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/gracias`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.1,
        }
    ];

    // 2. Rutas Dinámicas (Blog)
    let dynamicRoutes: MetadataRoute.Sitemap = [];

    try {
        // Obtenemos todos los blogs publicados
        const blogs = await query(
            "SELECT slug, created_at, updated_at FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC"
        ) as any[];

        dynamicRoutes = blogs.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updated_at || post.created_at || new Date()),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));
    } catch (error) {
        console.error("Error al generar sitemap de blog_posts:", error);
    }

    return [...staticRoutes, ...dynamicRoutes];
}
