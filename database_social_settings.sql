-- ============================================================
-- ACTUALIZACIÓN: Settings de Redes Sociales
-- Ejecutar en phpMyAdmin sobre la base de datos lener_studio_db
--
-- IMPORTANTE: La tabla site_settings NO tiene AUTO_INCREMENT en 'id'
-- por eso debemos especificar los IDs manualmente.
-- Los IDs 1-5 ya están ocupados por los settings originales.
-- ============================================================

INSERT INTO site_settings (id, setting_key, setting_value, setting_group, description)
VALUES
  (6,  'social_facebook',  '', 'rrss', 'URL de la página de Facebook'),
  (7,  'social_instagram', '', 'rrss', 'URL del perfil de Instagram'),
  (8,  'social_linkedin',  '', 'rrss', 'URL de la página de LinkedIn'),
  (9,  'social_twitter',   '', 'rrss', 'URL del perfil de X / Twitter'),
  (10, 'social_whatsapp',  '', 'rrss', 'Link de WhatsApp para contacto')
ON DUPLICATE KEY UPDATE
  description = VALUES(description);

-- Verificar que quedaron bien:
-- SELECT * FROM site_settings;
