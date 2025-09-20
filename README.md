# Blok CMS

A modern Strapi CMS for dynamic article management with flexible content sections and automated seeding.

## 🚀 Features

- **Dynamic Articles**: Create articles with flexible content sections
- **Content Components**: Text-only, text-with-image, and images sections  
- **SEO Optimized**: Built-in SEO metadata for each article
- **API Ready**: RESTful API with slug-based routing
- **Media Support**: Advanced image upload and management
- **Auto Seeding**: Pre-configured with sample articles and images
- **Production Ready**: Optimized for deployment with proper authentication

## 📋 Quick Start

### Prerequisites

- Node.js 22+ 
- pnpm (recommended) or npm

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment (Automatic):**
   ```bash
   pnpm run setup
   ```
   This automatically generates secure keys and creates `.env` files.

3. **Start development server:**
   ```bash
   pnpm run develop
   ```

4. **Create admin user:**
   - Visit http://localhost:1337/admin
   - Create your first admin user
   - Go to Settings > API Tokens
   - Create a new API token for frontend access

5. **Seed sample data (Optional):**
   ```bash
   pnpm run seed
   ```
   This creates 5 sample articles with images from Unsplash.

## 🔧 Environment Configuration

The setup script creates these files automatically:

### CMS `.env`
```env
# Database Configuration
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Server Configuration  
HOST=0.0.0.0
PORT=1337
NODE_ENV=development

# Application Keys (Auto-generated)
APP_KEYS="generated_secure_keys"
API_TOKEN_SALT=generated_salt
ADMIN_JWT_SECRET=generated_secret
TRANSFER_TOKEN_SALT=generated_salt
JWT_SECRET=generated_secret

# Frontend Configuration
FRONTEND_URL=http://localhost:3000
REVALIDATE_SECRET=generated_secret
```

### Frontend `.env.local` 
```env
# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here

# Revalidation Configuration
REVALIDATE_SECRET=matching_cms_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🌐 Production Deployment

### Strapi Cloud Configuration

**Build Settings:**
- **Package Manager:** `pnpm`
- **Build Command:** `pnpm run build:production`
- **Start Command:** `pnpm run start:production`
- **Node Version:** `22.x`

**Required Environment Variables:**
```bash
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_URL=your_database_connection_string

# Copy all keys from your local .env:
APP_KEYS="your_generated_keys"
API_TOKEN_SALT=your_generated_salt
ADMIN_JWT_SECRET=your_generated_secret
TRANSFER_TOKEN_SALT=your_generated_salt
JWT_SECRET=your_generated_secret

# Update for production:
FRONTEND_URL=https://your-frontend-domain.com
CORS_ORIGINS=https://your-frontend-domain.com
```

### Manual Production Setup

```bash
# Build for production
pnpm run build:production

# Start production server
pnpm run start:production
```

## 📡 API Endpoints

- `GET /api/articles` - List all articles with pagination
- `GET /api/articles/:id` - Get article by ID
- `GET /api/articles/slug/:slug` - Get article by slug
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

## 📖 Content Structure

### Article Schema

```javascript
{
  title: "String (Required)",
  description: "Text (160 chars max)",
  slug: "UID (Auto-generated from title)",
  cover: "Media (Single image)",
  content: "Dynamic Zone",
  seo: "Component (SEO metadata)",
  publishedDate: "DateTime",
  updatedDate: "DateTime (Auto-updated)"
}
```

### Dynamic Content Components

#### Text Only
- `title`, `subtitle`, `body` (rich text), `note`, `bulletPoints` (JSON array)

#### Text with Image  
- `title`, `subtitle`, `body` (rich text), `bulletPoints`, `image` (media)

#### Images Section
- `image1`, `image2` (both media fields)

#### SEO Component
- `metaTitle` (60 chars max), `metaDescription` (160 chars max), `shareImage`

## 🔨 Development Commands

```bash
# Development
pnpm run develop          # Start with auto-reload
pnpm run build           # Build admin panel

# Production  
pnpm run build:production # Build for production
pnpm run start:production # Start production server

# Utilities
pnpm run setup           # Generate environment files
pnpm run seed            # Seed sample articles
```

## 🎯 Features & Configuration

### Security & CORS
- Configured for multiple frontend environments
- Secure file upload with size limits (200MB)
- Content Security Policy for external images
- CORS configured for development and production

### Media Handling
- Multiple image breakpoints (xlarge, large, medium, small, xsmall)
- Support for Cloudinary and Strapi Cloud media
- Local development with proper caching

### Performance
- Optimized middleware configuration
- Efficient database connection pooling
- Proper caching headers for static assets

## 🚦 Troubleshooting

### Common Issues

1. **Missing admin secret error:**
   - Run `pnpm run setup` to generate proper environment variables

2. **CORS errors:**
   - Add your frontend URL to `CORS_ORIGINS` in environment variables

3. **Database connection issues:**
   - For production, ensure `DATABASE_URL` is properly configured
   - For development, SQLite files are created automatically

4. **Image upload problems:**
   - Check file size limits in `config/middlewares.js`
   - Verify upload directory permissions

## 📄 License

MIT

---

**Ready to use!** This CMS is production-ready with proper authentication, security, and sample content. Perfect for dynamic article management with a modern Next.js frontend.