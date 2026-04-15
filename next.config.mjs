const nextConfig = {
  reactStrictMode: true,
  // Exclude functions directory from Next.js build
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin', 'firebase-functions'],
  },
  // Ignore functions directory during build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'firebase-admin': 'firebase-admin',
        'firebase-functions': 'firebase-functions',
      });
    }
    return config;
  },
};

export default nextConfig;
