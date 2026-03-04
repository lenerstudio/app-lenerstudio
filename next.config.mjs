/** @type {import('next').NextConfig} */
const nextConfig = {
    // Esto es CLAVE para Hostinger: genera una versión minimalista para Node.js
    output: 'standalone',
    compress: true, // Gzip/Brotli en respuestas del servidor
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'ui-avatars.com' },
        ],
        minimumCacheTTL: 31536000, // 1 año de caché para imágenes optimizadas
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-accordion'],
    },
    // Headers HTTP para caché y seguridad
    async headers() {
        return [
            {
                // Imágenes y fuentes — caché máxima (1 año)
                source: '/(.*\\.(?:png|jpg|jpeg|gif|webp|avif|ico|svg|woff|woff2|ttf|otf))',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                // Archivos subidos por el usuario
                source: '/uploads/(.*)',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
                ],
            },
            {
                // Todas las páginas HTML — short cache + revalidation
                source: '/((?!api|admin).*)',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            },
        ];
    },
};

export default nextConfig;
