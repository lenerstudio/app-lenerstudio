/** @type {import('next').NextConfig} */
const nextConfig = {
    // Esto es CLAVE para Hostinger: genera una versión minimalista para Node.js
    output: 'standalone',
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
            },
        ],
        minimumCacheTTL: 86400, // 24h cache
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
};

export default nextConfig;
