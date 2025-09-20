module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/articles/slug/:slug',
      handler: 'article.findBySlug',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
