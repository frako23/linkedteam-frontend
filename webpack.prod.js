const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const Dotenv = require("dotenv-webpack");
const { GenerateSW } = require("workbox-webpack-plugin");
module.exports = merge(common, {
  mode: "production",
  output: {
    publicPath: "/",
  },
  plugins: [
    new Dotenv({
      path: "./.env", // Path to .env file
    }),
    // Service worker: solo guarda la app y las fuentes, nunca respuestas de la API.
    new GenerateSW({
      swDest: "sw.js",
      navigateFallback: "/index.html",
      skipWaiting: true,
      clientsClaim: true,
      cleanupOutdatedCaches: true,
      inlineWorkboxRuntime: true,
      exclude: [/\.mp4$/, /\.LICENSE\.txt$/],
      maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
          handler: "StaleWhileRevalidate",
          options: { cacheName: "google-fonts-css" },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
          handler: "CacheFirst",
          options: {
            cacheName: "google-fonts-archivos",
            cacheableResponse: { statuses: [0, 200] },
            expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 },
          },
        },
      ],
    }),
  ],
});
