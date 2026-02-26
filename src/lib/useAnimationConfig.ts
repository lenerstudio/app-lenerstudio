import { useReducedMotion } from "framer-motion";

/**
 * Hook que retorna configuraciones de animación optimizadas:
 * - Desactiva animaciones si el usuario prefiere movimiento reducido
 * - Reduce la complejidad de animaciones en conexiones lentas
 */
export function useAnimationConfig() {
    const shouldReduceMotion = useReducedMotion();

    return {
        // Para animaciones de entrada (fade + slide)
        fadeInUp: shouldReduceMotion
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
            : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } },

        // Para viewport animations (whileInView)
        viewportFade: shouldReduceMotion
            ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 } }
            : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } },

        // Para hover effects - eliminados en móvil táctil
        hoverLift: shouldReduceMotion ? {} : { whileHover: { y: -10, transition: { duration: 0.3 } } },

        viewport: { once: true, margin: "0px 0px -50px 0px" },
        shouldReduceMotion,
    };
}
