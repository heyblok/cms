module.exports = ({ env }) => ({
  // Configure deep populate plugin for Strapi v5
  'strapi-v5-plugin-populate-deep': {
    enabled: true,
    config: {
      defaultDepth: 5, // Maximum depth for populate=deep
    },
  },
  
  // Configure other plugins
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
  
  // Upload provider configuration (if needed)
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 100000000, // 100MB
      },
    },
  },
});
