import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/Providers";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    title: "Diseño Web Sevilla y Landing Pages de Alta Conversión | Lener Studio",
    description: "Agencia de diseño web en Sevilla líder en desarrollo de landing pages de alta conversión. Especialistas en diseño profesional para pymes y emprendedores en España y Latinoamérica.",
    keywords: [
        "diseno web sevilla",
        "desarrollo web españa",
        "landing pages alta conversion",
        "agencia seo sevilla",
        "diseno web para emprendedores",
        "creacion de paginas web españa",
        "marketing digital latinoamerica"
    ],
    metadataBase: new URL("https://lenerstudio.com"),
    alternates: {
        canonical: "/",
        languages: {
            "es-ES": "/es",
        },
    },
    openGraph: {
        title: "Lener Studio | Diseño Web y Landing Pages que Venden",
        description: "Transformamos tu presencia digital con webs de alto impacto. Expertos en diseño web Sevilla y desarrollo de negocios online.",
        url: "https://lenerstudio.com",
        siteName: "Lener Studio",
        locale: "es_ES",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Lener Studio - Diseño Web Profesional",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Lener Studio | Diseño Web Sevilla y España",
        description: "Expertos en creación de landing pages de alta conversión y diseño web profesional.",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/logopag.svg",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Lener Studio",
    "image": "https://lenerstudio.com/logopag.svg",
    "description": "Agencia de diseño web y marketing digital especializada en landing pages de alta conversión.",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sevilla",
        "addressRegion": "Andalucía",
        "addressCountry": "ES"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.3891,
        "longitude": -5.9845
    },
    "url": "https://lenerstudio.com",
    "telephone": "+34000000000",
    "priceRange": "$$",
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <meta name="facebook-domain-verification" content="pgvtam3jp2a7dei0t9753m60jpkn6b" />
            </head>
            <body className={`${inter.className} antialiased bg-white text-gray-900`}>
                <a
                    href="#contenido-principal"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-xl"
                >
                    Saltar al contenido principal
                </a>

                <Header />
                <Providers>
                    <main id="contenido-principal">
                        {children}
                    </main>
                </Providers>
                <Footer />
                <Toaster />
                <WhatsAppButton />
                <CookieBanner />
                <ExitIntentPopup />
            </body>
        </html>
    );
}
