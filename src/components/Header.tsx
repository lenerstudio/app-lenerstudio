"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Layers } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../assets/img/logo.webp";

export interface HeaderProps {
  scrolled?: boolean;
}

interface NavLink {
  label: string;
  href: string;
  isRoute?: boolean; // true = ruta de página, false = anchor scroll
}

const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) return null;

  const navLinks: NavLink[] = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Casos de Éxito", href: "#testimonios" },
    { label: "Portafolio", href: "/portafolio", isRoute: true },
    { label: "Garantía", href: "#garantia" },
    { label: "Contacto", href: "#contacto" },
  ];

  // Función de navegación: scroll si es anchor, ruta si es página
  const handleNavClick = (link: NavLink) => {
    setIsMobileMenuOpen(false);

    if (link.isRoute) {
      router.push(link.href);
      return;
    }

    // Si estamos en una subpágina, volvemos al inicio primero
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const element = document.querySelector(link.href);
        if (element) {
          const headerOffset = 80;
          const offsetPosition =
            element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 300);
      return;
    }

    setTimeout(() => {
      const element = document.querySelector(link.href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
  };

  const isPortafolio = pathname === "/portafolio";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isPortafolio
        ? "bg-gray-900/90 backdrop-blur-md shadow-sm py-4"
        : "bg-transparent py-4"
        }`}
    >
      <nav className="container mx-auto px-6" aria-label="Navegación principal">
        <div className="flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push("/")}
            aria-label="Ir al inicio - Lener Studio"
            className="cursor-pointer"
          >
            <Image
              src={logo}
              alt="Logo de Lener Studio - Expertos en desarrollo web para emprendedores"
              width={120}
              height={48}
              priority
              className="h-12 w-auto object-contain"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                aria-label={`Ir a ${link.label}`}
                aria-current={link.isRoute && isPortafolio ? "page" : undefined}
                className={`nav-link-premium text-sm font-medium transition-colors duration-300 flex items-center gap-1.5 ${link.isRoute && isPortafolio
                  ? "text-emerald-400"
                  : isScrolled || isPortafolio
                    ? "text-cyan-500 hover:text-emerald-400"
                    : "text-white hover:text-emerald-400"
                  }`}
              >
                {link.isRoute && (
                  <Layers size={14} className="opacity-70" aria-hidden="true" />
                )}
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleNavClick({ label: "Contacto", href: "#contacto" })}
              aria-label="Agendar llamada diagnóstica - ir a sección de contacto"
              className="bg-primary-blue hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md"
            >
              Agendar Llamada
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${isScrolled || isMobileMenuOpen || isPortafolio
              ? "text-gray-200"
              : "text-white"
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X size={28} aria-hidden="true" />
            ) : (
              <Menu size={28} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación móvil"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute left-4 right-4 top-20 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="p-8 flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => handleNavClick(link)}
                    aria-label={`Ir a ${link.label}`}
                    className="text-left text-xl font-semibold text-gray-800 hover:text-primary-blue transition-colors flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2">
                      {link.isRoute && (
                        <Layers
                          size={18}
                          className="text-primary-blue"
                          aria-hidden="true"
                        />
                      )}
                      {link.label}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-blue">
                      →
                    </span>
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={() =>
                      handleNavClick({ label: "Contacto", href: "#contacto" })
                    }
                    className="w-full bg-primary-blue text-white py-6 text-lg rounded-xl"
                  >
                    Agendar Llamada
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
