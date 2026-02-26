-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS lener_studio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lener_studio_db;

-- 1. USUARIOS (Autenticación para el Dashboard)
-- Almacena los usuarios que pueden acceder al panel administrativo
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL COMMENT 'Hash de la contraseña',
    role ENUM('admin', 'editor') DEFAULT 'admin',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. LEADS (Mensajes y Conversiones)
-- Almacena los contactos del formulario de la landing
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(25) NULL,
    business_name VARCHAR(150) NULL,
    service_type ENUM('landing_page', 'web_corporativa', 'ecommerce', 'otro') DEFAULT 'landing_page',
    message TEXT,
    status ENUM('nuevo', 'contactado', 'en_negociacion', 'ganado', 'perdido') DEFAULT 'nuevo',
    source_url VARCHAR(255) DEFAULT '/' COMMENT 'Desde qué página envió el formulario',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. PORTAFOLIO (Gestión de Proyectos)
-- Permite subir y administrar tus trabajos realizados
CREATE TABLE IF NOT EXISTS portfolio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    main_image VARCHAR(255) NOT NULL COMMENT 'URL o ruta de la imagen principal',
    category VARCHAR(50) COMMENT 'Ej: Real Estate, Salud, Startup',
    technologies JSON COMMENT 'Lista de tecnologías usadas: ["React", "Next.js", "Laravel"]',
    live_url VARCHAR(255) NULL COMMENT 'Enlace real al sitio web del cliente',
    is_published BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0 COMMENT 'Para ordenar los proyectos manualmente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TESTIMONIOS (Social Proof)
-- Controla los testimonios que se muestran en la web
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    business_name VARCHAR(100),
    quote TEXT NOT NULL,
    result_badge VARCHAR(100) COMMENT 'Ej: +150% contactos',
    avatar_url VARCHAR(255),
    rating INT DEFAULT 5,
    is_approved BOOLEAN DEFAULT FALSE,
    display_on_home BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. CONFIGURACIÓN Y SEO (Ajustes Globales)
-- Almacena variables de la web para cambiarlas sin tocar código
CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(50) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_group ENUM('contacto', 'seo', 'rrss', 'estilo') DEFAULT 'contacto',
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. MÉTRICAS (Simulación de Analytics Interno)
-- Registra eventos clave para mostrar en el dashboard
CREATE TABLE IF NOT EXISTS analytics_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type ENUM('page_view', 'cta_click', 'whatsapp_click', 'form_submit') NOT NULL,
    page_path VARCHAR(255),
    visitor_ip VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- INSERTAR DATOS INICIALES
-- ==========================================

-- Usuario administrador inicial (Contraseña: admin123)
INSERT INTO users (name, email, password, role) 
VALUES ('Administrador Lener', 'admin@lenerstudio.com', '$2b$10$CR5ohjLhFOIptMLxtNCNnueioQyY9lxFSMy/CoW1ia8RqPuKYlK1i', 'admin');

INSERT INTO site_settings (setting_key, setting_value, setting_group, description) VALUES
('whatsapp_number', '+34624432245', 'contacto', 'Número de WhatsApp para el botón flotante'),
('contact_email', 'consultaweb@lenerstudio.com', 'contacto', 'Email principal de recepción de leads'),
('seo_home_title', 'Diseño Web Sevilla y Landing Pages de Alta Conversión', 'seo', 'Título que aparecerá en Google'),
('seo_home_description', 'Agencia experta en diseño web profesional...', 'seo', 'Meta descripción global'),
('maintenance_mode', 'false', 'estilo', 'Activar/Desactivar modo mantenimiento');

-- Ejemplo de un primer testimonio real
INSERT INTO testimonials (client_name, business_name, quote, result_badge, rating, is_approved) 
VALUES ('María González', 'Coaching Personal', 'Desde que lanzó mi web con Lener Studio, mis contactos aumentaron un 150%.', '+150% contactos', 5, 1);

