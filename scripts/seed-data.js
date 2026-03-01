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

async function seedData() {
    const env = loadEnv();
    let connection;

    try {
        connection = await mysql.createConnection({
            host: env.MYSQL_HOST,
            user: env.MYSQL_USER,
            password: env.MYSQL_PASSWORD,
            database: env.MYSQL_DATABASE,
        });

        console.log(`✅ Conectado a "${env.MYSQL_DATABASE}" para seeding...`);

        // 1. SEED LEADS (50 rows)
        console.log('Inserting 50 leads...');
        const names = ['Juan', 'María', 'Carlos', 'Ana', 'Pedro', 'Lucía', 'Roberto', 'Elena', 'Diego', 'Sofía'];
        const lastNames = ['García', 'Rodríguez', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martin', 'Jiménez', 'Ruiz'];
        const services = ['landing_page', 'web_corporativa', 'ecommerce', 'otro'];
        const statuses = ['nuevo', 'contactado', 'en_negociacion', 'ganado', 'perdido'];

        for (let i = 1; i <= 50; i++) {
            const name = `${names[Math.floor(Math.random() * names.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
            const email = `test${i}@example.com`;
            const phone = `600${Math.floor(100000 + Math.random() * 900000)}`;
            const business = `Empresa ${i} S.L.`;
            const service = services[Math.floor(Math.random() * services.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const message = `Este es un mensaje de prueba número ${i} interesado en el servicio de ${service}.`;

            await connection.query(
                "INSERT INTO leads (name, email, phone, business_name, service_type, message, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [name, email, phone, business, service, message, status]
            );
        }

        // 2. SEED PORTFOLIO (50 rows)
        console.log('Inserting 50 portfolio items...');
        const categories = ['Landing Page', 'Web Corporativa', 'E-commerce', 'SaaS / App'];
        for (let i = 1; i <= 50; i++) {
            const title = `Proyecto de Éxito ${i}`;
            const slug = `proyecto-exito-${i}`;
            const description = `Descripción detallada para el proyecto ${i}. Un caso de éxito que transformó el negocio del cliente.`;
            const image = `https://picsum.photos/seed/${i}/800/600`;
            const category = categories[Math.floor(Math.random() * categories.length)];

            await connection.query(
                "INSERT INTO portfolio (title, slug, description, main_image, category, technologies, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [title, slug, description, image, category, JSON.stringify(['React', 'Next.js', 'Tailwind']), true]
            );
        }

        // 3. SEED TESTIMONIALS (50 rows)
        console.log('Inserting 50 testimonials...');
        for (let i = 1; i <= 50; i++) {
            const name = `${names[Math.floor(Math.random() * names.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
            const business = `Negocio Local ${i}`;
            const quote = `Trabajar con Lener Studio en el proyecto ${i} fue la mejor decisión para mi empresa. Los resultados hablan por sí solos.`;
            const badge = `+${Math.floor(Math.random() * 200 + 50)}% conversión`;

            await connection.query(
                "INSERT INTO testimonials (client_name, business_name, quote, result_badge, rating, is_approved) VALUES (?, ?, ?, ?, ?, ?)",
                [name, business, quote, badge, 5, i % 5 === 0 ? 0 : 1] // Some pending approval
            );
        }

        // 4. SEED ANALYTICS EVENTS (50 rows)
        console.log('Inserting 50 analytics events...');
        const eventTypes = ['page_view', 'cta_click', 'whatsapp_click', 'form_submit'];
        const paths = ['/', '/portafolio', '/contacto', '/politica-de-cookies'];
        for (let i = 1; i <= 50; i++) {
            const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            const pagePath = paths[Math.floor(Math.random() * paths.length)];

            // Random date within last 7 days
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 7));

            await connection.query(
                "INSERT INTO analytics_events (event_type, page_path, visitor_ip, created_at) VALUES (?, ?, ?, ?)",
                [eventType, pagePath, '127.0.0.1', date]
            );
        }

        console.log('\n🚀 ¡Seeding completado satisfactoriamente!');

    } catch (error) {
        console.error('\n❌ Error durante el seeding:');
        console.error(error.message);
    } finally {
        if (connection) await connection.end();
    }
}

seedData();
