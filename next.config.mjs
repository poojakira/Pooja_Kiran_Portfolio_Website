/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Pooja_Kiran_Portfolio_Website',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // required for static export
  },
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei', 'gsap'],
  },
};

export default nextConfig;
