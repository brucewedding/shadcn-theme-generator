/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath:
    process.env.NODE_ENV === 'production' ? '/shadcn-theme-generator' : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
