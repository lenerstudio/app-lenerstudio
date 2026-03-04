import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { query } from "@/lib/db";
import BlogPostClient from "./BlogPostClient";

interface Props {
    params: Promise<{ slug: string }>;
}

// Datos de posts estáticos como fallback
const staticPosts: Record<string, any> = {
    "5-razones-tu-web-no-genera-clientes": {
        id: 1,
        title: "5 razones por las que tu web no genera clientes",
        excerpt: "Tener visitas no equivale a tener clientes. Descubre los errores más comunes en diseño web que están arruinando tu ratio de conversión y cómo solucionarlos hoy mismo.",
        content: `
## El tráfico sin conversión es dinero perdido

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

¿Tu web tiene alguno de estos problemas? Agenda una llamada y te diré exactamente qué está fallando.
        `,
        category: "Diseño Web",
        date: "12 Mar 2026",
        author: "Lener Studio",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&fm=webp&q=80",
        slug: "5-razones-tu-web-no-genera-clientes",
    },
    "landing-page-vs-web-corporativa": {
        id: 2,
        title: "Landing page vs web corporativa: ¿cuál necesitas?",
        excerpt: "¿Vas a lanzar un infoproducto o quieres posicionar tu marca a largo plazo? La elección de la arquitectura adecuada determinará el éxito de tu proyecto.",
        content: `
## Dos herramientas diferentes para objetivos diferentes

Antes de invertir en tu presencia online, es fundamental entender qué tipo de web necesitas para tu momento actual.

### ¿Qué es una Landing Page?

Una landing page es una página de una sola sección, 100% enfocada en conseguir una acción concreta: una venta, un registro, una llamada.

**Cuándo elegir landing page:**
- Tienes un producto o servicio muy concreto que vender
- Estás haciendo publicidad de pago (Google Ads, Meta Ads)
- Quieres validar una idea de negocio rápidamente
- Tu presupuesto es ajustado y necesitas ROI inmediato

**Ventajas:**
- Más barata y rápida de desarrollar
- Mayor tasa de conversión al eliminar distracciones
- Fácil de medir y optimizar

### ¿Qué es una Web Corporativa?

Una web corporativa es un sitio completo con múltiples páginas: inicio, servicios, sobre nosotros, blog, contacto...

**Cuándo elegir web corporativa:**
- Quieres posicionamiento SEO a largo plazo
- Tienes múltiples servicios o productos
- Necesitas credibilidad y autoridad de marca
- Planeas crear contenido y atraer tráfico orgánico

**Ventajas:**
- Mejor posicionamiento en Google
- Más credibilidad y profesionalismo
- Escalable con el tiempo

### La respuesta honesta

Si estás empezando y necesitas clientes YA: **landing page**.
Si piensas a 12-24 meses y quieres construir marca: **web corporativa**.

Lo ideal es comenzar con una landing page que genere resultados y luego evolucionarla a una web corporativa.
        `,
        category: "Marketing Digital",
        date: "28 Feb 2026",
        author: "Lener Studio",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&fm=webp&q=80",
        slug: "landing-page-vs-web-corporativa",
    },
    "cuanto-cuesta-web-profesional-espana-2026": {
        id: 3,
        title: "Cuánto cuesta una web profesional en España en 2026",
        excerpt: "Desglosamos los costes reales, desde el hosting y dominio hasta el diseño a medida y SEO técnico. Descubre en qué debes invertir y qué puedes ahorrar.",
        content: `
## El precio real de una web profesional

La pregunta que todo emprendedor hace antes de contratar: *¿cuánto me va a costar esto?* La respuesta honesta es: depende. Pero aquí tienes los rangos reales del mercado español en 2026.

### Costes base (anuales)
- **Dominio .es o .com:** 10-15€/año
- **Hosting compartido:** 50-120€/año
- **Hosting VPS o cloud:** 150-600€/año
- **Certificado SSL:** Gratis (Let's Encrypt) o 50-200€
- **Email corporativo (Google Workspace):** 72€/usuario/año

### Costes de desarrollo (único)

| Tipo de web | Rango de precio |
|-------------|----------------|
| Landing page básica (plantilla) | 150-400€ |
| Landing page a medida | 500-1.500€ |
| Web corporativa (plantilla) | 500-1.500€ |
| Web corporativa a medida | 1.500-5.000€ |
| E-commerce básico | 2.000-8.000€ |
| Plataforma SaaS | 10.000€+ |

### ¿En qué NO debes escatimar?

1. **Diseño UX:** Una web fea o confusa pierde clientes. El diseño no es estética, es conversión.
2. **Velocidad de carga:** Afecta directamente al SEO y a la experiencia de usuario.
3. **SEO técnico:** Sin esto, tu web será invisible en Google.
4. **Seguridad:** Backups, firewall, actualizaciones. Un hackeo puede costarte más que la web.

### ¿Dónde puedes ahorrar?

- **Fotos de stock:** Usa Unsplash o Pexels (gratis) en vez de bancos de imágenes de pago.
- **Copywriting:** Si tienes tiempo, puedes escribir los textos tú mismo (con ayuda de IA).
- **Funcionalidades extra:** No necesitas todo desde el día 1. Empieza simple y escala.

### Conclusión

Para una web que realmente genere clientes, presupuesta entre **800€ y 3.000€** dependiendo de la complejidad. Invertir menos casi siempre sale más caro a largo plazo.
        `,
        category: "SEO",
        date: "15 Feb 2026",
        author: "Lener Studio",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop&fm=webp&q=80",
        slug: "cuanto-cuesta-web-profesional-espana-2026",
    },
};

async function getPost(slug: string) {
    try {
        const rows = await query(
            "SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1 LIMIT 1",
            [slug]
        ) as any[];

        if (rows && rows.length > 0) {
            const r = rows[0];
            return {
                id: r.id,
                title: r.title,
                excerpt: r.excerpt,
                content: r.content || "",
                category: r.category,
                date: new Date(r.created_at).toLocaleDateString("es-ES", {
                    day: "numeric", month: "long", year: "numeric"
                }),
                author: r.author,
                image: r.image || "",
                slug: r.slug,
            };
        }
    } catch {
        // BD no disponible, usar fallback
    }

    // Fallback estático
    return staticPosts[slug] || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return { title: "Artículo no encontrado | Lener Studio" };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lenerstudio.com";
    const imageUrl = post.image
        ? (post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`)
        : "";

    return {
        title: `${post.title} | Blog Lener Studio`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `${siteUrl}/blog/${post.slug}`,
            images: imageUrl ? [{ url: imageUrl }] : [],
            type: "article",
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return <BlogPostClient post={post} />;
}
