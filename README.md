# Blok CMS

A modern Strapi CMS for dynamic article management with flexible content sections.

## Features

- **Dynamic Articles**: Create articles with flexible content sections
- **Content Components**: Text-only, text-with-image, and images sections
- **SEO Optimized**: Built-in SEO metadata for each article
- **API Ready**: RESTful API with slug-based routing
- **Media Support**: Image upload and management

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` with your configuration.

3. **Start development server:**
   ```bash
   pnpm run develop
   ```

4. **Create admin user:**
   Visit http://localhost:1337/admin and create your first admin user.

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Server Configuration
HOST=0.0.0.0
PORT=1337
NODE_ENV=development

# Application Keys (Generate random keys)
APP_KEYS="your_app_key_1,your_app_key_2"
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret

# Frontend Configuration (Optional)
FRONTEND_REVALIDATE_URL=http://localhost:3000
REVALIDATE_SECRET=your_revalidate_secret
```

## API Endpoints

- `GET /api/articles` - List all articles
- `GET /api/articles/:id` - Get article by ID
- `GET /api/articles/slug/:slug` - Get article by slug
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update article

## Content Structure

### Article Fields

- **title**: Article title
- **description**: Short description (160 chars max)
- **slug**: URL-friendly identifier
- **cover**: Cover image
- **content**: Dynamic content sections
- **seo**: SEO metadata
- **publishedDate**: Publication date
- **updatedDate**: Last update date

### Content Components

#### Text Only
- title, subtitle, body (rich text), note, bullet points

#### Text with Image  
- title, subtitle, body (rich text), bullet points, image

#### Images Section
- Two images side by side

## Deployment

### Using pnpm (Recommended)

```bash
pnpm run build:production
pnpm run start:production
```

### Using npm (Fallback)

```bash
npm run build
npm run start
```

## Development

```bash
# Start in development mode
pnpm run develop

# Build for production
pnpm run build:production

# Start production server
pnpm run start:production
```

## License

MIT