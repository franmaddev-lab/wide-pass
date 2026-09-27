import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: '/about', destination: '/us', permanent: true }]
  },
}

export default nextConfig
