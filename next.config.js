/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'openseauserdata.com', 'lh3.googleusercontent.com', 'i.seadn.io']
  },
  webpack: (config, { }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "fs": false,
      path: false,
      os: false,
    };
    return config
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    config.experiments = {
      "topLevelAwait": true
    }
    return config
  },
  output: {
    globalObject: 'this',
  },
}

module.exports = nextConfig