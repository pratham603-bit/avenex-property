/** @type {import('next').NextConfig} */
const basePath = '/avenex-property';

const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static HTML exports
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true, // Required for static exports on GitHub Pages
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // If your GitHub URL is https://<username>.github.io/<repository-name>, 
  // you must add the basePath below so links route correctly:
  basePath: '/avenex-property',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;
