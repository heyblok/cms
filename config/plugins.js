module.exports = ({ env }) => ({
  
  
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
