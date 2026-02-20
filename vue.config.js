module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/demo/purple-free-vue/preview/demo_1/' : '/' 
  publicPath: '/',
  chainWebpack: config => {
    config.module
      .rule('html')
      .test(/\.html$/)
      .use('html-loader')
      .loader('html-loader')
      .end();

    // Configuration Sass pour réduire les warnings de dépréciation
    const scssRules = ['scss', 'sass'];
    scssRules.forEach(rule => {
      ['normal', 'vue-modules', 'vue', 'normal-modules'].forEach(oneOf => {
        config.module
          .rule(rule)
          .oneOf(oneOf)
          .use('sass-loader')
          .tap(options => {
            return {
              ...options,
              sassOptions: {
                ...(options.sassOptions || {}),
                quietDeps: true,
                silenceDeprecations: ['import'], // Ignorer les warnings de dépréciation @import
                outputStyle: 'expanded'
              }
            };
          });
      });
    });
  },
  // Transpiler jspdf et ses dépendances pour résoudre l'erreur "Cannot use import statement outside a module"
  transpileDependencies: [
    'jspdf',
    'jspdf-autotable',
    'kkiapay'
  ],
  // OPTIMISATION: Configuration de production pour améliorer les performances
  productionSourceMap: false, // Désactiver les source maps en production pour réduire la taille
  configureWebpack: {
    // OPTIMISATION: Optimisations de build
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
    }
  },
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0', // Permet d'accéder depuis l'extérieur du conteneur Docker
    port: 8080,
    // OPTIMISATION: Compression gzip pour le développement
    compress: true,
    // Hot Module Replacement (HMR) - activé par défaut mais explicite pour garantir le fonctionnement
    hot: true,
    // Live reload activé
    liveReload: true,
    // Ouvrir automatiquement le navigateur
    open: false,
    // Overlay pour les erreurs de compilation (compatible Vue CLI 4)
    overlay: {
      warnings: false,
      errors: true
    },
    // Polling pour la détection des fichiers dans Docker (nécessaire sur Windows)
    watchOptions: {
      poll: process.env.CHOKIDAR_USEPOLLING === 'true' ? 1000 : false, // 1000ms pour Windows/Docker
      aggregateTimeout: 500, // Augmenté pour réduire les recompilations
      ignored: [
        /node_modules/,
        /\.git/,
        /dist/,
        /build/,
        /\.cache/
      ]
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: false, // Important: garder le header Host original pour le middleware tenant
        secure: false,
        logLevel: 'warn', // Réduit les logs pour améliorer les performances
        ws: true, // Support WebSocket si nécessaire
        onProxyReq: (proxyReq, req, res) => {
          // Préserver le header Host original pour que le middleware tenant fonctionne
          const host = req.headers.host;
          if (host) {
            // Préserver le Host original (ex: hopital1.localhost:8080)
            proxyReq.setHeader('Host', host);
          }
          // Ajouter le header X-Hospital-Id si disponible dans localStorage
          // Note: Les headers personnalisés doivent être ajoutés côté client (caller.services.js)
        },
        onError: (err, req, res) => {
          console.error('Proxy error:', err);
        }
      }
    }
  }
}
