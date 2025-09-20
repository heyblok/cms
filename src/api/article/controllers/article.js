'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    
    const sanitizedEntities = await Promise.all(
      data.map(async (entity) => {
        return await strapi.entityService.findOne('api::article.article', entity.id, {
          populate: {
            content: {
              populate: {
                image: true,
                image1: true,
                image2: true,
              }
            },
            cover: true,
            seo: true,
          }
        });
      })
    );
    
    return { data: sanitizedEntities, meta };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    
    const entity = await strapi.entityService.findOne('api::article.article', id, {
      populate: {
        content: {
          populate: {
            image: true,
            image1: true,
            image2: true,
          }
        },
        cover: true,
        seo: true,
      }
    });

    return { data: entity };
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;
    
    const entities = await strapi.entityService.findMany('api::article.article', {
      filters: { slug },
      populate: {
        content: {
          populate: {
            image: true,
            image1: true,
            image2: true,
          }
        },
        cover: true,
        seo: true,
      }
    });

    if (!entities || entities.length === 0) {
      return ctx.notFound('Article not found');
    }

    return { data: entities[0] };
  },

  async create(ctx) {
    const result = await super.create(ctx);
    
    // Update timestamps
    if (result.data.id) {
      const now = new Date().toISOString();
      await strapi.entityService.update('api::article.article', result.data.id, {
        data: {
          publishedDate: now,
          updatedDate: now,
        }
      });
    }
    
    // Trigger revalidation if configured
    if (process.env.FRONTEND_REVALIDATE_URL) {
      try {
        await fetch(`${process.env.FRONTEND_REVALIDATE_URL}/api/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REVALIDATE_SECRET}`
          },
          body: JSON.stringify({
            path: `/article/${result.data.slug}`,
            type: 'article'
          })
        });
      } catch (error) {
        strapi.log.error('Failed to trigger revalidation:', error);
      }
    }
    
    return result;
  },

  async update(ctx) {
    const result = await super.update(ctx);
    
    // Update timestamp
    if (result.data.id) {
      await strapi.entityService.update('api::article.article', result.data.id, {
        data: {
          updatedDate: new Date().toISOString(),
        }
      });
    }
    
    // Trigger revalidation if configured
    if (process.env.FRONTEND_REVALIDATE_URL) {
      try {
        await fetch(`${process.env.FRONTEND_REVALIDATE_URL}/api/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REVALIDATE_SECRET}`
          },
          body: JSON.stringify({
            path: `/article/${result.data.slug}`,
            type: 'article'
          })
        });
      } catch (error) {
        strapi.log.error('Failed to trigger revalidation:', error);
      }
    }
    
    return result;
  }
}));
