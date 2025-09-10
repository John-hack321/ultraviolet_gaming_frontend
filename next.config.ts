import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable server-side rendering for the chess match interface
  experimental: {
    serverComponentsExternalPackages: ['worker_threads'],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `worker_threads` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        worker_threads: false,
      };
    }

    // Handle worker files
    config.module.rules.push({
      test: /\.worker\.(js|ts)$/,
      loader: 'worker-loader',
      options: {
        filename: 'static/worker.[hash].js',
        publicPath: '/_next/',
      },
    });

    // Add rule to handle .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
  // Disable static optimization for the problematic page
  output: 'standalone',
};

export default nextConfig;
