import type { Metadata } from "next";
import { query } from "@/lib/db";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Precios y Planes de Desarrollo Web | Lener Studio",
  description: "Descubre nuestros planes de diseño y desarrollo web. Landing pages, webs corporativas y e-commerce adaptados a tu negocio. Presupuesto sin compromiso.",
  openGraph: {
    title: "Precios y Planes | Lener Studio",
    description: "Landing pages desde 497€. Webs corporativas desde 997€. E-commerce y proyectos avanzados desde 1.997€.",
    url: "https://lenerstudio.com/precios",
  }
};

// Fallback estático
const staticPlans = [
  {
    id: 1,
    name: "Plan Starter",
    description: "Ideal para dar el primer paso online.",
    price: "497",
    features: ["Landing page de 1 página", "Diseño responsive", "Formulario de contacto", "SEO básico", "Entrega en 7 días"],
    cta_text: "Quiero mi Landing Page",
    cta_url: "/#contacto",
    is_popular: false,
    is_published: true,
    display_order: 1,
  },
  {
    id: 2,
    name: "Plan Profesional",
    description: "Para negocios que buscan crecer.",
    price: "997",
    features: ["Web corporativa hasta 5 páginas", "Panel de administración", "Blog integrado", "SEO avanzado", "Google Analytics", "Entrega en 14 días"],
    cta_text: "Quiero mi Web Profesional",
    cta_url: "/#contacto",
    is_popular: true,
    is_published: true,
    display_order: 2,
  },
  {
    id: 3,
    name: "Plan Premium",
    description: "Soluciones completas y avanzadas.",
    price: "1.997",
    features: ["Web autogestionable completa", "E-commerce o funcionalidades avanzadas", "Estrategia SEO 3 meses", "Soporte prioritario 6 meses", "Entrega en 21 días"],
    cta_text: "Quiero el Plan Premium",
    cta_url: "/#contacto",
    is_popular: false,
    is_published: true,
    display_order: 3,
  },
];

async function getPlans() {
  try {
    const rows = await query("SELECT * FROM pricing_plans WHERE is_published = 1 ORDER BY display_order ASC") as any[];
    if (!rows || rows.length === 0) return staticPlans;
    return rows.map((r: any) => ({
      ...r,
      features: (() => {
        try { return JSON.parse(r.features || "[]"); }
        catch { return []; }
      })(),
      is_popular: !!r.is_popular,
      is_published: !!r.is_published,
    }));
  } catch {
    return staticPlans;
  }
}

export default async function PricingPage() {
  const plans = await getPlans();
  return <PricingContent plans={plans} />;
}
