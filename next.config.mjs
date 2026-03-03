/** @type {import('next').NextConfig} */
const nextConfig = {
    // Esto es CLAVE para Hostinger: genera una versión minimalista para Node.js
    output: 'standalone',
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
