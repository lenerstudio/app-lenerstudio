"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, Calendar, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";
import type { FormData } from "../types";
import emailjs from "@emailjs/browser";
import { trackEvent } from '@/lib/pixel'

export interface ContactoFinalProps {
  onSubmit?: (data: FormData) => void;
}

const ContactoFinal: React.FC<ContactoFinalProps> = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    tipoNegocio: "",
    lugarContacto: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //const form = useRef();
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");

    // Validation
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // Privacidad
    if (!aceptaPrivacidad) {
      toast({
        title: "Acepta la política de privacidad",
        description: "Debes aceptar la Política de Privacidad para continuar.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor introduce un email válido.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // 1. Guardar en Base de Datos (Nuestro API)
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source_url: window.location.pathname
        }),
      });
    } catch (dbError) {
      console.error("Error saving lead to DB:", dbError);
      // No bloqueamos el proceso si solo falla la DB pero el mail puede enviarse
    }

    // 2. Enviar por Email (EmailJS)
    const SERVICE_ID = "service_webmail";
    const TEMPLATE_ID = "template_8znqq9j";
    const PUBLIC_KEY = "cE8bHJ8B4ICIqMkeT";
    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current!,
        PUBLIC_KEY,
      );
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        tipoNegocio: "",
        lugarContacto: "",
        mensaje: "",
      });
      setAceptaPrivacidad(false);
      setStatus("success");
      setIsSubmitting(false);
      trackEvent('Contact') // 👈 agrega esta línea
      router.push("/gracias");
    } catch (error) {
      console.error("Error al enviar EmailJS:", error);
      setStatus("error");
      toast({
        title: "Error",
        description: "Hubo un error al enviar el mensaje, intenta de nuevo.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const contactOptions = [
    {
      icon: <Phone className="w-6 h-6" aria-hidden="true" />,
      title: "WhatsApp",
      description: "Chatea con nosotros",
      action: "Abrir WhatsApp",
      gradient: "from-green-500 to-emerald-500",
      href: "https://wa.me/+34624432245",
      ariaLabel: "Contactar por WhatsApp",
    },
    {
      icon: <Mail className="w-6 h-6" aria-hidden="true" />,
      title: "Email",
      description: "consultaweb@lenerstudio.com",
      action: "Enviar Email",
      gradient: "from-blue-500 to-cyan-500",
      href: "mailto:consultaweb@lenerstudio.com",
      ariaLabel: "Enviar email a consultaweb@lenerstudio.com",
    },
    {
      icon: <Calendar className="w-6 h-6" aria-hidden="true" />,
      title: "Agendar Llamada",
      description: "Reserva tu sesión gratuita",
      action: "Ver Calendario",
      gradient: "from-purple-500 to-pink-500",
      href: "tel:+34624432245",
      ariaLabel: "Llamar al +34 624 432 245",
    },
  ];

  return (
    <section
      id="contacto"
      className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comienza Tu Transformación Digital Hoy
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cuéntanos sobre tu proyecto y descubre cómo podemos ayudarte a
            alcanzar tus objetivos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="+34 600 000 000"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tipoNegocio"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Tipo de Negocio
                  </label>
                  <input
                    type="text"
                    id="tipoNegocio"
                    name="tipoNegocio"
                    value={formData.tipoNegocio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Ej: Consultoría, E-commerce, Servicios..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Cuéntanos sobre tu proyecto..."
                    required
                  />
                </div>
                {/* ── Checkbox Política de Privacidad (custom) ── */}
                <div className="pt-1">
                  <label
                    htmlFor="acepta-privacidad"
                    className="group flex items-start gap-3 cursor-pointer select-none"
                    aria-describedby="privacidad-hint"
                  >
                    {/* Checkbox visual personalizado */}
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        id="acepta-privacidad"
                        name="acepta-privacidad"
                        checked={aceptaPrivacidad}
                        onChange={(e) => setAceptaPrivacidad(e.target.checked)}
                        className="sr-only"
                        aria-required="true"
                      />
                      {/* Caja visual */}
                      <div
                        className={[
                          "w-5 h-5 rounded-md border-2 flex items-center justify-center",
                          "transition-all duration-200",
                          aceptaPrivacidad
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 border-transparent shadow-md shadow-blue-500/40"
                            : "bg-gray-900 border-gray-600 group-hover:border-blue-500/60",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        {/* Check SVG animado */}
                        <svg
                          className={[
                            "w-3 h-3 text-white transition-all duration-200",
                            aceptaPrivacidad ? "opacity-100 scale-100" : "opacity-0 scale-50",
                          ].join(" ")}
                          viewBox="0 0 12 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="1,5 4,9 11,1" />
                        </svg>
                      </div>
                    </div>

                    {/* Texto */}
                    <span className="text-sm text-gray-400 leading-relaxed">
                      He leído y acepto la{" "}
                      <Link
                        href="/politica-de-privacidad"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors font-medium"
                      >
                        Política de Privacidad
                      </Link>
                      <span className="text-red-400 ml-0.5">*</span>
                    </span>
                  </label>

                  {/* Mensaje de ayuda cuando no está marcado */}
                  <p
                    id="privacidad-hint"
                    className={[
                      "text-xs mt-1.5 ml-8 transition-all duration-200",
                      aceptaPrivacidad ? "text-green-500 opacity-100" : "text-gray-600 opacity-100",
                    ].join(" ")}
                  >
                    {aceptaPrivacidad
                      ? "✓ Acepta nuestra política — puedes enviar el mensaje"
                      : "Acepta la política para habilitar el envío"}
                  </p>
                </div>

                {/* Mensajes de feedback encima del botón */}
                <div className="min-h-[30px] flex items-center justify-center">
                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 font-medium text-sm mb-2 flex items-center gap-2"
                    >
                      ✅ ¡Recibido! Te contactaremos pronto.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 font-medium text-sm mb-2"
                    >
                      ❌ Error al enviar. Intenta de nuevo.
                    </motion.p>
                  )}
                </div>

                {/* Botón: desactivado hasta marcar checkbox */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !aceptaPrivacidad}
                  title={!aceptaPrivacidad ? "Acepta la Política de Privacidad para enviar" : undefined}
                  className={[
                    "w-full py-6 text-lg rounded-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-2",
                    aceptaPrivacidad && !isSubmitting
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transform hover:scale-[1.02] shadow-blue-600/30"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed opacity-60",
                  ].join(" ")}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className={["w-5 h-5", !aceptaPrivacidad ? "opacity-40" : ""].join(" ")} />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">
                Otras formas de contacto
              </h3>
              <div className="space-y-4">
                {contactOptions.map((option, index) => (
                  <motion.a
                    key={index}
                    href={option.href}
                    target={option.href.startsWith('http') ? "_blank" : undefined}
                    rel={option.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    aria-label={option.ariaLabel}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="block min-h-[64px]"
                  >
                    <div
                      className={`bg-gradient-to-r ${option.gradient} rounded-xl p-1`}
                    >
                      <div className="bg-gray-900 rounded-xl p-6 flex items-center gap-4 hover:bg-gray-800 transition-colors">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.gradient} flex items-center justify-center text-white flex-shrink-0`}
                        >
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{option.title}</h4>
                          <p className="text-gray-400 text-sm">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">¿Listo para empezar?</h3>
              <p className="text-blue-100 mb-6">
                Respuesta garantizada en menos de 24 horas. Hablemos sobre cómo
                podemos hacer crecer tu negocio online.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-blue-100">
                    Consulta inicial gratuita
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-blue-100">
                    Presupuesto personalizado
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-blue-100">Sin compromisos</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactoFinal;
