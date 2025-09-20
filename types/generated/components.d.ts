import type { Schema, Struct } from '@strapi/strapi';

export interface SharedImagesSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_images_sections';
  info: {
    description: 'A section with two images';
    displayName: 'Images Section';
    icon: 'picture';
  };
  attributes: {
    image1: Schema.Attribute.Media<'images'>;
    image2: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata for articles';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedTextOnly extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_only';
  info: {
    description: 'A text block with title, subtitle, body, and bullet points';
    displayName: 'Text Only';
    icon: 'align-left';
  };
  attributes: {
    body: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'rich';
        }
      >;
    note: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedTextWithImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_with_images';
  info: {
    description: 'A text block with an optional image';
    displayName: 'Text with Image';
    icon: 'image';
  };
  attributes: {
    body: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'rich';
        }
      >;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.images-section': SharedImagesSection;
      'shared.seo': SharedSeo;
      'shared.text-only': SharedTextOnly;
      'shared.text-with-image': SharedTextWithImage;
    }
  }
}
