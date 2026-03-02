/** @type {import('next').NextConfig} */
const nextConfig = {
    // Esto es CLAVE para Hostinger: genera una versión minimalista para Node.js
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
