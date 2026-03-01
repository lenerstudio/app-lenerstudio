"use client";

import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type FooterProps = unknown;

const Footer: React.FC<FooterProps> = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) return null;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { label: "Inicio", href: "#inicio", isAnchor: true },
    { label: "Servicios", href: "#servicios", isAnchor: true },
    { label: "Casos de Éxito", href: "#testimonios", isAnchor: true },
  ];

  const legalLinks = [
    { label: "Política de Privacidad", to: "/politica-de-privacidad" },
    { label: "Política de Cookies", to: "/politica-de-cookies" },
    { label: "Aviso Legal", to: "/aviso-legal" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-primary-blue mb-4">
              Lener Studio
            </h2>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Agencia de Desarrollo Web especializada en crear soluciones
              digitales que convierten visitas en clientes.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Navegación rápida del pie de página">
            <h3 className="text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    aria-label={`Ir a ${link.label}`}
                    className="text-gray-400 hover:text-primary-blue transition-colors min-h-[44px] text-left text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Links */}
          <nav aria-label="Páginas legales del pie de página">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.to}
                    className="text-gray-400 hover:text-primary-blue transition-colors min-h-[44px] flex items-center text-sm"
                    aria-label={link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary-blue flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:consultaweb@lenerstudio.com"
                  className="hover:text-primary-blue transition-colors text-sm"
                  aria-label="Enviar correo a consultaweb@lenerstudio.com"
                >
                  consultaweb@lenerstudio.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary-blue flex-shrink-0" aria-hidden="true" />
                <a
                  href="https://wa.me/34624432245"
                  className="hover:text-primary-blue transition-colors text-sm"
                  aria-label="Contactar por WhatsApp al +34 624 43 22 45"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  +34 624 43 22 45
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-primary-blue flex-shrink-0" aria-hidden="true" />
                <span className="text-sm">España</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright + legal bottom bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Lener Studio. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
              {legalLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  className="text-gray-600 hover:text-gray-400 transition-colors text-xs"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
