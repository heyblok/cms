module.exports = ({ env }) => ({
  // Enable the CKEditor plugin with the correct kebab-case name
  'ckeditor': {
    enabled: true,
    resolve: '@_sh/strapi-plugin-ckeditor',
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
