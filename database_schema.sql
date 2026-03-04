-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-03-2026 a las 01:03:44
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lener_studio_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `analytics_events`
--

CREATE TABLE `analytics_events` (
  `id` int(11) NOT NULL,
  `event_type` enum('page_view','cta_click','whatsapp_click','form_submit') NOT NULL,
  `page_path` varchar(255) DEFAULT NULL,
  `visitor_ip` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `analytics_events`
--

INSERT INTO `analytics_events` (`id`, `event_type`, `page_path`, `visitor_ip`, `user_agent`, `created_at`) VALUES
(52, 'form_submit', '/', NULL, NULL, '2026-03-01 17:55:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `business_name` varchar(150) DEFAULT NULL,
  `service_type` enum('landing_page','web_corporativa','ecommerce','otro') DEFAULT 'landing_page',
  `message` text DEFAULT NULL,
  `status` enum('nuevo','contactado','en_negociacion','ganado','perdido') DEFAULT 'nuevo',
  `source_url` varchar(255) DEFAULT '/' COMMENT 'Desde qué página envió el formulario',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `leads`
--

INSERT INTO `leads` (`id`, `name`, `email`, `phone`, `business_name`, `service_type`, `message`, `status`, `source_url`, `created_at`, `updated_at`) VALUES
(52, 'Giovanna Espinoza Torre', 'giovannaexpinoza23@gmail.com', '349586325147', 'Panaderia', 'landing_page', 'Solicito informacion para una pagina de una panaderia y tortas, con venta online', 'nuevo', '/', '2026-03-01 17:55:20', '2026-03-01 17:55:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `portfolio`
--

CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `main_image` varchar(255) NOT NULL COMMENT 'URL o ruta de la imagen principal',
  `category` varchar(50) DEFAULT NULL COMMENT 'Ej: Real Estate, Salud, Startup',
  `technologies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Lista de tecnologías usadas: ["React", "Next.js", "Laravel"]' CHECK (json_valid(`technologies`)),
  `live_url` varchar(255) DEFAULT NULL COMMENT 'Enlace real al sitio web del cliente',
  `is_published` tinyint(1) DEFAULT 1,
  `display_order` int(11) DEFAULT 0 COMMENT 'Para ordenar los proyectos manualmente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `portfolio`
--

INSERT INTO `portfolio` (`id`, `title`, `slug`, `description`, `main_image`, `category`, `technologies`, `live_url`, `is_published`, `display_order`, `created_at`) VALUES
(51, 'Landing Page + Tienda Online — E-commerce', 'landing-page--tienda-online--e-commerce', 'Plataforma de comercio electrónico completa con carrito, pagos y panel de administración. Gestión de products, pedidos y clientes en tiempo real.', '/uploads/f0e7b5c5-9214-458e-88f7-2fff4f87b9c6.webp', 'E-commerce', '[\"React\",\"Next.js\",\"TypeScript\"]', 'https://web-momcakespe.vercel.app/', 1, 0, '2026-03-01 17:40:57'),
(52, 'Gimnasio Élite — Web Corporativa', 'gimnasio-elite-corporativa', 'Sitio web completo para centro deportivo de alto rendimiento. Galería de instalaciones, horarios interactivos y panel de inscripción.', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fm=webp&fit=crop', 'Web Corporativa', '[\"React\",\"Tailwind CSS\",\"Framer Motion\",\"MySQL\"]', NULL, 1, 0, '2026-03-01 17:51:05'),
(53, 'Inmobiliaria Lujo — Landing Page', 'inmobiliaria-lujo-landing', 'Landing page premium para captación de leads en el sector Real Estate. Formulario avanzado, video tours integrados y Google Maps.', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&fm=webp&fit=crop', 'Landing Page', '[\"Next.js\",\"Google Maps API\",\"Tailwind\",\"Node.js\"]', NULL, 1, 0, '2026-03-01 17:51:05'),
(54, 'Restaurante Gourmet — E-commerce', 'restaurante-gourmet-ecommerce', 'Tienda online de productos gourmet y sistema de reservas. Carrito de compra optimizado para móviles y pagos con Stripe.', 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?w=800&q=80&fm=webp&fit=crop', 'E-commerce', '[\"WordPress\",\"WooCommerce\",\"Stripe\",\"PHP\"]', NULL, 1, 0, '2026-03-01 17:51:05'),
(55, 'App Fitness — SaaS / App', 'app-fitness-saas', 'Plataforma de entrenamiento personalizado con métricas en tiempo real. Dashboard administrativo para entrenadores y área de clientes.', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&fm=webp&fit=crop', 'SaaS / App', '[\"React\",\"TypeScript\",\"Node.js\",\"PostgreSQL\",\"Chart.js\"]', NULL, 1, 0, '2026-03-01 17:51:05'),
(56, 'Blog de Viajes — Web Corporativa', 'blog-viajes-corporativa', 'Revista digital de viajes con sistema de gestión de contenidos (CMS) a medida. Optimización SEO y velocidad de carga extrema.', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80&fm=webp&fit=crop', 'Web Corporativa', '[\"Next.js\",\"Vercel\",\"Sanity CMS\",\"Tailwind\"]', NULL, 1, 0, '2026-03-01 17:51:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL,
  `setting_key` varchar(50) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `setting_group` enum('contacto','seo','rrss','estilo') DEFAULT 'contacto',
  `description` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `site_settings`
--

INSERT INTO `site_settings` (`id`, `setting_key`, `setting_value`, `setting_group`, `description`, `updated_at`) VALUES
(1, 'whatsapp_number', '+34624432245', 'contacto', 'Número de WhatsApp para el botón flotante', '2026-02-26 00:47:20'),
(2, 'contact_email', 'consultaweb@lenerstudio.com', 'contacto', 'Email principal de recepción de leads', '2026-02-26 00:47:20'),
(3, 'seo_home_title', 'Diseño Web Sevilla y Landing Pages de Alta Conversión', 'seo', 'Título que aparecerá en Google', '2026-02-26 00:47:20'),
(4, 'seo_home_description', 'Agencia experta en diseño web profesional...', 'seo', 'Meta descripción global', '2026-02-26 00:47:20'),
(5, 'maintenance_mode', 'false', 'estilo', 'Activar/Desactivar modo mantenimiento', '2026-02-26 00:47:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `business_name` varchar(100) DEFAULT NULL,
  `quote` text NOT NULL,
  `result_badge` varchar(100) DEFAULT NULL COMMENT 'Ej: +150% contactos',
  `avatar_url` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT 5,
  `is_approved` tinyint(1) DEFAULT 0,
  `display_on_home` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL COMMENT 'Hash de la contraseña',
  `role` enum('admin','editor') DEFAULT 'admin',
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'Administrador Lener', 'admin@lenerstudio.com', '$2b$10$DyuEkSlmQfisZV1NMJFc9.zZwThIStuuOn6OJ8gB1ALaX1ik3WznS', 'admin', NULL, '2026-02-26 00:47:20', '2026-02-28 18:01:09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `analytics_events`
--
ALTER TABLE `analytics_events`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indices de la tabla `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`);

--
-- Indices de la tabla `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `analytics_events`
--
ALTER TABLE `analytics_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ============================================================
-- NUEVAS TABLAS: blog_posts, popups, pricing_plans
-- Ejecutar en phpMyAdmin sobre la base de datos lener_studio_db
-- ============================================================

-- --------------------------------------------------------
-- Tabla: blog_posts
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text NOT NULL,
  `content` longtext DEFAULT NULL,
  `category` varchar(80) NOT NULL DEFAULT 'General',
  `image` varchar(255) DEFAULT NULL COMMENT 'URL de la imagen de portada',
  `author` varchar(100) NOT NULL DEFAULT 'Lener Studio',
  `is_published` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_published` (`is_published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos de ejemplo (los 3 posts actuales del código)
INSERT INTO `blog_posts` (`title`, `slug`, `excerpt`, `content`, `category`, `image`, `author`, `is_published`) VALUES
(
  '5 razones por las que tu web no genera clientes',
  '5-razones-tu-web-no-genera-clientes',
  'Tener visitas no equivale a tener clientes. Descubre los errores más comunes en diseño web que están arruinando tu ratio de conversión y cómo solucionarlos hoy mismo.',
  'Contenido completo del artículo próximamente...',
  'Diseño Web',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&fm=webp&q=80',
  'Lener Studio',
  1
),
(
  'Landing page vs web corporativa: ¿cuál necesitas?',
  'landing-page-vs-web-corporativa',
  '¿Vas a lanzar un infoproducto o quieres posicionar tu marca a largo plazo? La elección de la arquitectura adecuada determinará el éxito de tu proyecto.',
  'Contenido completo del artículo próximamente...',
  'Marketing Digital',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&fm=webp&q=80',
  'Lener Studio',
  1
),
(
  'Cuánto cuesta una web profesional en España en 2026',
  'cuanto-cuesta-web-profesional-espana-2026',
  'Desglosamos los costes reales, desde el hosting y dominio hasta el diseño a medida y SEO técnico. Descubre en qué debes invertir y qué puedes ahorrar.',
  'Contenido completo del artículo próximamente...',
  'SEO',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&fm=webp&q=80',
  'Lener Studio',
  1
);

-- --------------------------------------------------------
-- Tabla: popups
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `popups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `cta_text` varchar(100) NOT NULL DEFAULT 'Ver oferta',
  `cta_url` varchar(255) NOT NULL DEFAULT '/#contacto',
  `trigger_type` enum('exit_intent','delay','scroll') NOT NULL DEFAULT 'exit_intent',
  `trigger_delay` int(11) NOT NULL DEFAULT 0 COMMENT 'Segundos para trigger tipo delay',
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Popup de ejemplo por defecto
INSERT INTO `popups` (`title`, `subtitle`, `cta_text`, `cta_url`, `trigger_type`, `trigger_delay`, `is_active`) VALUES
(
  '¿Te vas sin pedir tu presupuesto?',
  'Te regalamos una auditoría web gratuita de 30 min para descubrir qué le falta a tu negocio online.',
  'Quiero mi auditoría gratis',
  '/#contacto',
  'exit_intent',
  0,
  1
);

-- --------------------------------------------------------
-- Tabla: pricing_plans
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `pricing_plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` varchar(20) NOT NULL COMMENT 'Ej: 497, 997, Personalizado',
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `cta_text` varchar(100) NOT NULL DEFAULT 'Contratar',
  `cta_url` varchar(255) NOT NULL DEFAULT '/#contacto',
  `is_popular` tinyint(1) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `display_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_published` (`is_published`),
  KEY `idx_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Planes de ejemplo (los 3 actuales del código)
INSERT INTO `pricing_plans` (`name`, `description`, `price`, `features`, `cta_text`, `cta_url`, `is_popular`, `is_published`, `display_order`) VALUES
(
  'Plan Starter',
  'Ideal para dar el primer paso online.',
  '497',
  '["Landing page de 1 página","Diseño responsive","Formulario de contacto","SEO básico","Entrega en 7 días"]',
  'Quiero mi Landing Page',
  '/#contacto',
  0, 1, 1
),
(
  'Plan Profesional',
  'Para negocios que buscan crecer.',
  '997',
  '["Web corporativa hasta 5 páginas","Panel de administración","Blog integrado","SEO avanzado","Google Analytics","Entrega en 14 días"]',
  'Quiero mi Web Profesional',
  '/#contacto',
  1, 1, 2
),
(
  'Plan Premium',
  'Soluciones completas y avanzadas.',
  '1.997',
  '["Web autogestionable completa","E-commerce o funcionalidades avanzadas","Estrategia SEO 3 meses","Soporte prioritario 6 meses","Entrega en 21 días"]',
  'Quiero el Plan Premium',
  '/#contacto',
  0, 1, 3
);
