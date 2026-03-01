# 🛠️ Skill de Producto: Lener Panel v1.0 (Gestión de Leads & CMS)

Este documento describe la arquitectura lógica y operativa para el panel de administración de **Lener Studio**. Este sistema actúa como un "Cerebro Digital" que centraliza la operación, métricas y captación de clientes.

## 1. Visión General
El **Lener Panel** es una herramienta de administración privada (Back-office) construida sobre Next.js y MySQL. Su objetivo es transformar una landing page estática en una plataforma dinámica que permita gestionar el contenido, medir el interés de los usuarios y agilizar el contacto comercial.

## 2. Arquitectura de Datos (Entidades Clave)

El sistema opera bajo una estructura de base de datos relacional (`lener_studio_db`) con las siguientes responsabilidades:

* **Gestión de Acceso (`User`):** Control de identidad para asegurar que solo el administrador pueda visualizar datos sensibles de clientes y analíticas.
* **Captación de Prospectos (`Contact`):** Almacenamiento estructurado de cada mensaje recibido. Permite el seguimiento del estado del cliente (Nuevo, En Proceso, Cerrado).
* **Inteligencia de Mercado (`AnalyticsEvents`):** Registro de comportamiento del usuario (clics en botones, vistas de secciones, origen de la visita) para optimizar campañas de Google Ads.
* **Gestor de Contenidos (CMS):**
    * **`Portfolio`:** Control de proyectos destacados con metadatos específicos para demos.
    * **`Testimonial`:** Administración de prueba social para generar confianza inmediata.
    * **`SiteSettings`:** Configuración global del sitio (teléfonos, textos del Hero, avisos) sin necesidad de editar código.

## 3. Lógica Operativa y Flujos

### A. Automatización de Prospección (WhatsApp Direct)
El panel integra un conector lógico que vincula la base de datos de proyectos con la API de WhatsApp. Al seleccionar un prospecto y un proyecto del portafolio, el sistema genera automáticamente un mensaje persuasivo que incluye el link de la demo correspondiente, eliminando tiempos de respuesta manuales.

### B. Tracking de Performance
El sistema registra eventos en tiempo real. Esto permite al administrador identificar qué proyectos del portafolio generan más clics y qué secciones de la página tienen mayor tasa de rebote, permitiendo ajustes basados en datos y no en suposiciones.

### C. Escalabilidad "White Label"
La estructura está diseñada para ser replicable. Una vez validada en Lener Studio, esta lógica puede ser empaquetada y vendida a clientes finales como un "Dashboard de Negocio", aumentando el valor percibido del servicio de desarrollo web.

## 4. Beneficios del Skill

1.  **Centralización:** Toda la información del negocio en un solo lugar (Contactos + Métricas + Contenido).
2.  **Agilidad Comercial:** Reducción del tiempo de envío de propuestas y demos mediante el botón de enlace directo.
3.  **Recurrencia:** Justifica el cobro de mantenimiento anual al ofrecer una herramienta de gestión activa para el cliente.
4.  **Autoridad:** Funciona como la mejor carta de presentación frente a prospectos al mostrar un sistema propio de gestión.

---
*Diseñado para Lener Studio - Febrero 2026*