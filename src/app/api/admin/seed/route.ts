import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";

export async function POST() {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const results: { table: string; inserted: number; skipped: number; error?: string }[] = [];

    // ─────────────────────────────────
    // BLOG POSTS
    // ─────────────────────────────────
    const blogPosts = [
        {
            title: "5 razones por las que tu web no genera clientes",
            slug: "5-razones-tu-web-no-genera-clientes",
            excerpt: "Tener visitas no equivale a tener clientes. Descubre los errores más comunes en diseño web que están arruinando tu ratio de conversión y cómo solucionarlos hoy mismo.",
            content: `## El tráfico sin conversión es dinero perdido

Muchos negocios invierten en publicidad y SEO para llevar visitas a su web, pero cometen errores fundamentales que impiden que esas visitas se conviertan en clientes.

### 1. Tu propuesta de valor no es clara

El visitante tiene menos de 5 segundos para entender qué haces y cómo te diferencias. Si tu hero section no lo comunica de forma directa y visual, se irá.

**Solución:** Reescribe tu headline para responder: *¿Qué haces? ¿Para quién? ¿Cuál es el resultado?*

### 2. No tienes un CTA principal visible

Muchas webs tienen botones de "Contactar" enterrados en la navegación. El CTA debe ser visible sin hacer scroll, con un texto orientado al beneficio.

**Solución:** Usa botones con verbos de acción: "Quiero mi presupuesto", "Ver mis servicios", "Empezar ahora".

### 3. La velocidad de carga es lenta

Google penaliza y los usuarios abandonan si la web tarda más de 3 segundos. Las imágenes sin comprimir son el culpable número uno.

**Solución:** Convierte todas las imágenes a WebP, usa lazy loading y un CDN.

### 4. No tienes prueba social

Los testimonios, casos de éxito y logotipos de clientes aumentan la confianza y reducen la fricción de compra.

**Solución:** Añade al menos 3 testimonios reales con foto, nombre y resultado concreto.

### 5. El formulario de contacto es demasiado largo

Cada campo extra que añades reduce tus conversiones un 11%. Solo pide lo estrictamente necesario.

**Solución:** Empieza solo con nombre, email y mensaje. El teléfono y otros datos puedes pedirlos después.

---

¿Tu web tiene alguno de estos problemas? Agenda una llamada y te diré exactamente qué está fallando.`,
            category: "Diseño Web",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&fm=webp&q=80",
            author: "Lener Studio",
            is_published: 1,
        },
        {
            title: "Landing page vs web corporativa: ¿cuál necesitas?",
            slug: "landing-page-vs-web-corporativa",
            excerpt: "¿Vas a lanzar un infoproducto o quieres posicionar tu marca a largo plazo? La elección de la arquitectura adecuada determinará el éxito de tu proyecto.",
            content: `## Dos herramientas diferentes para objetivos diferentes

Antes de invertir en tu presencia online, es fundamental entender qué tipo de web necesitas para tu momento actual.

### ¿Qué es una Landing Page?

Una landing page es una página de una sola sección, 100% enfocada en conseguir una acción concreta: una venta, un registro, una llamada.

**Cuándo elegir landing page:**

- Tienes un producto o servicio muy concreto que vender
- Estás haciendo publicidad de pago (Google Ads, Meta Ads)
- Quieres validar una idea de negocio rápidamente
- Tu presupuesto es ajustado y necesitas ROI inmediato

### ¿Qué es una Web Corporativa?

Una web corporativa es un sitio completo con múltiples páginas: inicio, servicios, sobre nosotros, blog, contacto...

**Cuándo elegir web corporativa:**

- Quieres posicionamiento SEO a largo plazo
- Tienes múltiples servicios o productos
- Necesitas credibilidad y autoridad de marca

### La respuesta honesta

Si estás empezando y necesitas clientes YA: **landing page**.
Si piensas a 12-24 meses y quieres construir marca: **web corporativa**.

Lo ideal es comenzar con una landing page que genere resultados y luego evolucionarla a una web corporativa.`,
            category: "Marketing Digital",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&fm=webp&q=80",
            author: "Lener Studio",
            is_published: 1,
        },
        {
            title: "Cuánto cuesta una web profesional en España en 2026",
            slug: "cuanto-cuesta-web-profesional-espana-2026",
            excerpt: "Desglosamos los costes reales, desde el hosting y dominio hasta el diseño a medida y SEO técnico. Descubre en qué debes invertir y qué puedes ahorrar.",
            content: `## El precio real de una web profesional

La pregunta que todo emprendedor hace antes de contratar: *¿cuánto me va a costar esto?* La respuesta honesta es: depende. Pero aquí tienes los rangos reales del mercado español en 2026.

### Costes base (anuales)

- Dominio .es o .com: 10-15€/año
- Hosting compartido: 50-120€/año
- Hosting VPS o cloud: 150-600€/año
- Certificado SSL: Gratis (Let's Encrypt) o 50-200€
- Email corporativo (Google Workspace): 72€/usuario/año

### Costes de desarrollo (único)

| Tipo de web | Rango de precio |
|-------------|----------------|
| Landing page básica (plantilla) | 150-400€ |
| Landing page a medida | 500-1.500€ |
| Web corporativa (plantilla) | 500-1.500€ |
| Web corporativa a medida | 1.500-5.000€ |
| E-commerce básico | 2.000-8.000€ |

### ¿En qué NO debes escatimar?

- **Diseño UX:** Una web fea o confusa pierde clientes.
- **Velocidad de carga:** Afecta directamente al SEO y a la experiencia.
- **SEO técnico:** Sin esto, tu web será invisible en Google.
- **Seguridad:** Backups, firewall, actualizaciones.

---

Para una web que realmente genere clientes, presupuesta entre **800€ y 3.000€** dependiendo de la complejidad.`,
            category: "SEO",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&fm=webp&q=80",
            author: "Lener Studio",
            is_published: 1,
        },
    ];

    let blogInserted = 0;
    let blogSkipped = 0;
    try {
        for (const post of blogPosts) {
            // Comprobar si el slug ya existe
            const existing = await query("SELECT id FROM blog_posts WHERE slug = ? LIMIT 1", [post.slug]) as any[];
            if (existing && existing.length > 0) {
                blogSkipped++;
                continue;
            }
            await query(
                `INSERT INTO blog_posts (title, slug, excerpt, content, category, image, author, is_published)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [post.title, post.slug, post.excerpt, post.content, post.category, post.image, post.author, post.is_published]
            );
            blogInserted++;
        }
        results.push({ table: "blog_posts", inserted: blogInserted, skipped: blogSkipped });
    } catch (err: any) {
        results.push({ table: "blog_posts", inserted: blogInserted, skipped: blogSkipped, error: err.message });
    }

    // ─────────────────────────────────
    // POPUP
    // ─────────────────────────────────
    const popups = [
        {
            title: "¿Te vas sin pedir tu presupuesto?",
            subtitle: "Te regalamos una auditoría web gratuita de 30 min para descubrir qué le falta a tu negocio online.",
            cta_text: "Quiero mi auditoría gratis",
            cta_url: "/#contacto",
            trigger_type: "exit_intent",
            trigger_delay: 0,
            is_active: 1,
        },
    ];

    let popupInserted = 0;
    let popupSkipped = 0;
    try {
        for (const popup of popups) {
            const existing = await query("SELECT id FROM popups WHERE title = ? LIMIT 1", [popup.title]) as any[];
            if (existing && existing.length > 0) {
                popupSkipped++;
                continue;
            }
            await query(
                `INSERT INTO popups (title, subtitle, cta_text, cta_url, trigger_type, trigger_delay, is_active)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [popup.title, popup.subtitle, popup.cta_text, popup.cta_url, popup.trigger_type, popup.trigger_delay, popup.is_active]
            );
            popupInserted++;
        }
        results.push({ table: "popups", inserted: popupInserted, skipped: popupSkipped });
    } catch (err: any) {
        results.push({ table: "popups", inserted: popupInserted, skipped: popupSkipped, error: err.message });
    }

    // ─────────────────────────────────
    // PRICING PLANS
    // ─────────────────────────────────
    const plans = [
        {
            name: "Plan Starter",
            description: "Ideal para dar el primer paso online.",
            price: "497",
            features: JSON.stringify(["Landing page de 1 página", "Diseño responsive", "Formulario de contacto", "SEO básico", "Entrega en 7 días"]),
            cta_text: "Quiero mi Landing Page",
            cta_url: "/#contacto",
            is_popular: 0,
            is_published: 1,
            display_order: 1,
        },
        {
            name: "Plan Profesional",
            description: "Para negocios que buscan crecer.",
            price: "997",
            features: JSON.stringify(["Web corporativa hasta 5 páginas", "Panel de administración", "Blog integrado", "SEO avanzado", "Google Analytics", "Entrega en 14 días"]),
            cta_text: "Quiero mi Web Profesional",
            cta_url: "/#contacto",
            is_popular: 1,
            is_published: 1,
            display_order: 2,
        },
        {
            name: "Plan Premium",
            description: "Soluciones completas y avanzadas.",
            price: "1.997",
            features: JSON.stringify(["Web autogestionable completa", "E-commerce o funcionalidades avanzadas", "Estrategia SEO 3 meses", "Soporte prioritario 6 meses", "Entrega en 21 días"]),
            cta_text: "Quiero el Plan Premium",
            cta_url: "/#contacto",
            is_popular: 0,
            is_published: 1,
            display_order: 3,
        },
    ];

    let priceInserted = 0;
    let priceSkipped = 0;
    try {
        for (const plan of plans) {
            const existing = await query("SELECT id FROM pricing_plans WHERE name = ? LIMIT 1", [plan.name]) as any[];
            if (existing && existing.length > 0) {
                priceSkipped++;
                continue;
            }
            await query(
                `INSERT INTO pricing_plans (name, description, price, features, cta_text, cta_url, is_popular, is_published, display_order)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [plan.name, plan.description, plan.price, plan.features, plan.cta_text, plan.cta_url, plan.is_popular, plan.is_published, plan.display_order]
            );
            priceInserted++;
        }
        results.push({ table: "pricing_plans", inserted: priceInserted, skipped: priceSkipped });
    } catch (err: any) {
        results.push({ table: "pricing_plans", inserted: priceInserted, skipped: priceSkipped, error: err.message });
    }

    return NextResponse.json({ success: true, results });
}
