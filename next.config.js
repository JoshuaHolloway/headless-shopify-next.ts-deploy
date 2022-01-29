const { withFrameworkConfig } = require('./framework/common/config');

// ==============================================

module.exports = withFrameworkConfig({
  framework: {
    name: 'shopify',
  },
  // internationalization configuration
  i18n: {
    locales: ['en-US', 'es'],
    defaultLocale: 'en-US',
  },
  // https://nextjs.org/docs/messages/next-image-unconfigured-host
  images: {
    domains: ['cdn.shopify.com'],
  },
});

// ==============================================

console.log('next.config.js', JSON.stringify(module.exports, null, 2));
