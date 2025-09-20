module.exports = ({ env }) => ({
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000
        }
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      sizeLimit: 200 * 1024 * 1024, // 200mb
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64
      },
    }
  },
  // Documentation plugin configuration
  documentation: {
    enabled: env.bool('DOCUMENTATION_ENABLED', false),
    config: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'Blok CMS API',
        description: 'Dynamic article management system API',
        contact: {
          name: 'Blok CMS Team'
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT'
        }
      },
      'x-strapi-config': {
        plugins: ['upload', 'users-permissions']
      }
    }
  }
});
