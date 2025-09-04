import { build } from "velite";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false
  },
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(new VeliteWebpackPlugin());
    
    // Enhanced polyfill configuration
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };

    // Optimize core-js for better tree-shaking
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js/es': 'core-js/es',
        'core-js/stable': 'core-js/stable',
      };
    }

    // Add source maps in development for better debugging
    if (dev) {
      config.devtool = 'eval-source-map';
    }

    return config;
  },
  
  // Optimize for better browser compatibility
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },

  // Enhanced browser support
  swcMinify: true,
  poweredByHeader: false,
};

class VeliteWebpackPlugin {
  static started = false;
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default nextConfig;
