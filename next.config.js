const withTM = require('next-transpile-modules')(['ol']); // pass the modules you would like to see transpiled
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withTM({
    images: {
      domains: ['firebasestorage.googleapis.com'],
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      return config;
    },
    i18n: {
      locales: ['en', 'pl'],
      defaultLocale: 'en',
    },
    reactStrictMode: true,
  })
);
