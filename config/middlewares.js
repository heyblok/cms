module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': ['https://cdn.ckeditor.com'],
          'connect-src': ['https://proxy-event.ckeditor.com']
        },
      },
    },
  },
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'http://localhost:*'],
          'img-src': [
            "'self'", 
            'data:', 
            'blob:', 
            'https://res.cloudinary.com',
            'https://images.unsplash.com',
            'https://picsum.photos',
            `https://${env('STRAPI_CLOUD_MEDIA_URL', 'localhost')}`,

          ],
          'media-src': [
            "'self'", 
            'data:', 
            'blob:', 
            'https://res.cloudinary.com',
            `https://${env('STRAPI_CLOUD_MEDIA_URL', 'localhost')}`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000',
        'https://localhost:3000',
        'http://localhost:3001',
        'https://localhost:3001',
        env('FRONTEND_URL'),
        env('FRONTEND_URL_PROD'),
        env('FRONTEND_URL_STAGING'),
      ].filter(Boolean),
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '256mb',
      jsonLimit: '256mb',
      textLimit: '256mb',
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // 200mb
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
