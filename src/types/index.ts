import React from "react";

export interface Testimonio {
  name: string;
  business: string;
  role: string;
  city: string;
  quote: string;
  result: string;
  avatar: string;
  rating: number;
}

export interface Beneficio {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export interface Solucion {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  features: string[];
  gradient: string;
}

export interface Servicio {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export interface Autoridad {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export interface Garantia {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  tipoNegocio: string;
  lugarContacto: string;
  mensaje: string;
}

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export interface Offer {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  cta: string;
  gradient: string;
}

export interface Technology {
  name: string;
  icon: string;
}

export interface Problem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface TargetAudience {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  accent?: string;
}
