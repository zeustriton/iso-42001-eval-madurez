import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración optimizada para producción
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Optimización de imágenes
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // Configuración experimental para Webpack
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*'],
  },
  // Soporte para módulos grandes
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
