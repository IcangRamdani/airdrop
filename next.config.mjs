const nextConfig = {
  reactStrictMode: true,
  // Exclude functions directory from Next.js build
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin', 'firebase-functions'],
  },
  // Ignore functions directory during build
  webpack: (config, { isServer }) => {
    // Exclude functions directory from webpack
    config.externals.push('firebase-admin', 'firebase-functions');

    // Ignore functions directory in webpack
    config.module.rules.push({
      test: /functions\/.*\.ts$/,
      use: 'ignore-loader'
    });

    return config;
  },
  // Exclude functions from TypeScript compilation
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
