module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    defaultHeaders: {
      'User-Agent': 'Blok-CMS/1.0'
    }
  },
  settings: {
    cors: {
      enabled: true,
      headers: '*',
      origin: env.array('CORS_ORIGINS', ['http://localhost:3000']),
    },
  },
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
});
