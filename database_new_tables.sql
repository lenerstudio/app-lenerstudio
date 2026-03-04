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
