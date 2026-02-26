import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const ParaQuienEs = dynamic(() => import("@/components/ParaQuienEs"), {
    loading: () => <SectionSkeleton minHeight="500px" />,
});
const Problema = dynamic(() => import("@/components/Problema"), {
    loading: () => <SectionSkeleton minHeight="400px" />,
});
const Soluciones = dynamic(() => import("@/components/Soluciones"), {
    loading: () => <SectionSkeleton minHeight="800px" />,
});
const Beneficios = dynamic(() => import("@/components/Beneficios"), {
    loading: () => <SectionSkeleton minHeight="600px" />,
});
const Oferta = dynamic(() => import("@/components/Oferta"), {
    loading: () => <SectionSkeleton minHeight="500px" />,
});
const Testimonios = dynamic(() => import("@/components/Testimonios"), {
    loading: () => <SectionSkeleton minHeight="500px" />,
});
const Autoridad = dynamic(() => import("@/components/Autoridad"), {
    loading: () => <SectionSkeleton minHeight="600px" />,
});
const Garantia = dynamic(() => import("@/components/Garantia"), {
    loading: () => <SectionSkeleton minHeight="500px" />,
});
const ContactoFinal = dynamic(() => import("@/components/ContactoFinal"), {
    loading: () => <SectionSkeleton minHeight="700px" />,
});

const SectionSkeleton = ({ minHeight = "400px" }: { minHeight?: string }) => (
    <div
        style={{ minHeight }}
        className="flex justify-center items-center"
        aria-hidden="true"
    >
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
);

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Hero />

            <Suspense fallback={<SectionSkeleton minHeight="500px" />}>
                <ParaQuienEs />
            </Suspense>
            <Suspense fallback={<SectionSkeleton minHeight="400px" />}>
                <Problema />
            </Suspense>
            <Suspense fallback={<SectionSkeleton minHeight="800px" />}>
                <Soluciones />
            </Suspense>
            <Suspense fallback={<SectionSkeleton minHeight="600px" />}>
                <Beneficios />
            </Suspense>
            <Suspense fallback={<SectionSkeleton minHeight="500px" />}>
                <Oferta />
            </Suspense>
            <Suspense fallback={<SectionSkeleton minHeight="500px" />}>
                <Testimonios />
            </Suspense>
            <Suspense fallback={<SectionSkeleton minHeight="600px" />}>
                <Autoridad />
            </Suspense>
            <Suspense fallback={<SectionSkeleton minHeight="500px" />}>
                <Garantia />
            </Suspense>
            <Suspense fallback={<SectionSkeleton minHeight="700px" />}>
                <ContactoFinal />
            </Suspense>
        </div>
    );
}
