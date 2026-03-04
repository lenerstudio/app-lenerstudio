"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

/**
 * Wrapper Client Component para:
 * 1. Cargar el CSS de devicons de forma NO bloqueante (después del paint inicial)
 * 2. Cargar componentes que solo deben ejecutarse en el navegador (ssr: false)
 */

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });
const ExitIntentPopup = dynamic(() => import("@/components/ExitIntentPopup"), { ssr: false });

const DEVICONS_URL = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css";

export default function ClientOnlyComponents() {
    useEffect(() => {
        // Carga el CSS de devicons DESPUÉS del primer paint, sin bloquear el LCP
        const existing = document.querySelector(`link[href="${DEVICONS_URL}"]`);
        if (existing) return; // Ya estaba cargado

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = DEVICONS_URL;
        // Insertamos al final del head para no bloquear nada crítico
        document.head.appendChild(link);
    }, []);

    return (
        <>
            <WhatsAppButton />
            <CookieBanner />
            <ExitIntentPopup />
        </>
    );
}
