import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function loadEnv() {
    const envPath = path.join(rootDir, '.env.local');
    if (!fs.existsSync(envPath)) {
        console.error('❌ No se encontró el archivo .env.local');
        process.exit(1);
    }
    const content = fs.readFileSync(envPath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts) {
            env[key.trim()] = valueParts.join('=').trim();
        }
    });
    return env;
}

async function addExamples() {
    const env = loadEnv();
    let connection;

    try {
        connection = await mysql.createConnection({
            host: env.MYSQL_HOST,
            user: env.MYSQL_USER,
            password: env.MYSQL_PASSWORD,
            database: env.MYSQL_DATABASE,
        });

        console.log(`✅ Conectado a "${env.MYSQL_DATABASE}" para añadir ejemplos...`);

        const examples = [
            {
                title: "Gimnasio Élite — Web Corporativa",
                slug: "gimnasio-elite-corporativa",
                description: "Sitio web completo para centro deportivo de alto rendimiento. Galería de instalaciones, horarios interactivos y panel de inscripción.",
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fm=webp&fit=crop",
                category: "Web Corporativa",
                technologies: JSON.stringify(['React', 'Tailwind CSS', 'Framer Motion', 'MySQL'])
            },
            {
                title: "Inmobiliaria Lujo — Landing Page",
                slug: "inmobiliaria-lujo-landing",
                description: "Landing page premium para captación de leads en el sector Real Estate. Formulario avanzado, video tours integrados y Google Maps.",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&fm=webp&fit=crop",
                category: "Landing Page",
                technologies: JSON.stringify(['Next.js', 'Google Maps API', 'Tailwind', 'Node.js'])
            },
            {
                title: "Restaurante Gourmet — E-commerce",
                slug: "restaurante-gourmet-ecommerce",
                description: "Tienda online de productos gourmet y sistema de reservas. Carrito de compra optimizado para móviles y pagos con Stripe.",
                image: "https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?w=800&q=80&fm=webp&fit=crop",
                category: "E-commerce",
                technologies: JSON.stringify(['WordPress', 'WooCommerce', 'Stripe', 'PHP'])
            },
            {
                title: "App Fitness — SaaS / App",
                slug: "app-fitness-saas",
                description: "Plataforma de entrenamiento personalizado con métricas en tiempo real. Dashboard administrativo para entrenadores y área de clientes.",
                image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&fm=webp&fit=crop",
                category: "SaaS / App",
                technologies: JSON.stringify(['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Chart.js'])
            },
            {
                title: "Blog de Viajes — Web Corporativa",
                slug: "blog-viajes-corporativa",
                description: "Revista digital de viajes con sistema de gestión de contenidos (CMS) a medida. Optimización SEO y velocidad de carga extrema.",
                image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80&fm=webp&fit=crop",
                category: "Web Corporativa",
                technologies: JSON.stringify(['Next.js', 'Vercel', 'Sanity CMS', 'Tailwind'])
            }
        ];

        for (const ex of examples) {
            await connection.query(
                "INSERT INTO portfolio (title, slug, description, main_image, category, technologies, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [ex.title, ex.slug, ex.description, ex.image, ex.category, ex.technologies, true]
            );
            console.log(`+ Proyecto añadido: ${ex.title}`);
        }

        console.log('\n🚀 ¡Ejemplos añadidos satisfactoriamente!');

    } catch (error) {
        console.error('\n❌ Error:');
        console.error(error.message);
    } finally {
        if (connection) await connection.end();
    }
}

addExamples();
