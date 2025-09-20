const strapi = require('@strapi/strapi');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

/**
 * Seed script for Blok CMS
 * Creates sample articles with dynamic content sections and images
 */

// Mock image URLs from Unsplash (free to use)
const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop'
];

// Sample article data
const SAMPLE_ARTICLES = [
  {
    title: "The Future of Web Development: Trends to Watch in 2024",
    description: "Explore the latest trends and technologies shaping the future of web development, from AI integration to advanced frameworks.",
    slug: "future-of-web-development-2024",
    publishedDate: "2024-01-15T10:00:00.000Z",
    content: [
      {
        __component: "shared.text-only",
        title: "Introduction",
        subtitle: "The landscape of web development continues to evolve",
        body: "<p>Web development has come a long way since the early days of static HTML pages. Today, we're witnessing a revolution in how we build, deploy, and interact with web applications. From artificial intelligence integration to revolutionary new frameworks, the future of web development is more exciting than ever.</p><p>In this comprehensive guide, we'll explore the key trends that are shaping the industry and what developers need to know to stay ahead of the curve.</p>",
        bulletPoints: [
          "AI and Machine Learning Integration",
          "Progressive Web Applications (PWAs)",
          "Serverless Architecture",
          "WebAssembly (WASM)",
          "Enhanced Developer Experience"
        ]
      },
      {
        __component: "shared.text-with-image",
        title: "AI-Powered Development Tools",
        subtitle: "How artificial intelligence is transforming the development process",
        body: "<p>Artificial Intelligence is no longer just a buzzword in web development—it's becoming an integral part of the development process. From code completion tools like GitHub Copilot to automated testing and debugging, AI is helping developers write better code faster.</p><p>Modern AI tools can suggest optimizations, detect potential security vulnerabilities, and even generate entire components based on natural language descriptions.</p>",
        bulletPoints: [
          "Intelligent code completion and suggestions",
          "Automated testing and bug detection",
          "Natural language to code generation",
          "Performance optimization recommendations"
        ]
      },
      {
        __component: "shared.images-section"
      },
      {
        __component: "shared.text-only",
        title: "The Rise of WebAssembly",
        subtitle: "Bringing near-native performance to web applications",
        body: "<p>WebAssembly (WASM) is revolutionizing web development by enabling developers to run code written in languages like C++, Rust, and Go directly in the browser with near-native performance.</p><p>This opens up new possibilities for complex applications like video editing, 3D graphics, and scientific computing to run seamlessly in web browsers.</p>",
        note: "WebAssembly is supported by all major browsers and continues to gain adoption across the industry."
      }
    ],
    seo: {
      metaTitle: "Future of Web Development 2024 | Latest Trends & Technologies",
      metaDescription: "Discover the latest web development trends for 2024, including AI integration, WebAssembly, and modern frameworks that are shaping the industry.",
    }
  },
  {
    title: "Building Scalable React Applications: Best Practices and Patterns",
    description: "Learn essential patterns and best practices for building maintainable and scalable React applications that can grow with your business needs.",
    slug: "scalable-react-applications-best-practices",
    publishedDate: "2024-01-10T14:30:00.000Z",
    content: [
      {
        __component: "shared.text-with-image",
        title: "Component Architecture",
        subtitle: "Designing components for scalability and reusability",
        body: "<p>A well-designed component architecture is the foundation of any scalable React application. By following established patterns and principles, you can create components that are easy to maintain, test, and extend.</p><p>The key is to think in terms of composition over inheritance, keeping components focused on a single responsibility, and establishing clear data flow patterns.</p>",
        bulletPoints: [
          "Single Responsibility Principle",
          "Composition over Inheritance",
          "Props drilling vs Context API",
          "Custom hooks for shared logic"
        ]
      },
      {
        __component: "shared.text-only",
        title: "State Management Strategies",
        subtitle: "Choosing the right approach for your application's complexity",
        body: "<p>State management is one of the most critical aspects of React application development. The choice between local state, Context API, or external libraries like Redux depends on your application's complexity and requirements.</p><p>For most applications, starting with local state and the Context API is sufficient, with external libraries being introduced only when the complexity justifies the additional overhead.</p>",
        bulletPoints: [
          "Local state with useState and useReducer",
          "Context API for shared state",
          "Redux for complex state management",
          "Zustand for lightweight global state"
        ]
      },
      {
        __component: "shared.images-section"
      },
      {
        __component: "shared.text-only",
        title: "Performance Optimization",
        subtitle: "Techniques to keep your React app fast and responsive",
        body: "<p>Performance optimization in React involves understanding when and why components re-render, and implementing strategies to minimize unnecessary updates. Techniques like memoization, code splitting, and lazy loading can significantly improve your application's performance.</p>",
        note: "Remember: Premature optimization is the root of all evil. Always measure before optimizing."
      }
    ],
    seo: {
      metaTitle: "Scalable React Applications | Best Practices & Patterns",
      metaDescription: "Master React development with proven patterns and best practices for building scalable, maintainable applications that grow with your needs.",
    }
  },
  {
    title: "Mastering TypeScript: From Basics to Advanced Patterns",
    description: "A comprehensive guide to TypeScript that takes you from fundamental concepts to advanced type patterns and best practices.",
    slug: "mastering-typescript-basics-to-advanced",
    publishedDate: "2024-01-05T09:15:00.000Z",
    content: [
      {
        __component: "shared.text-only",
        title: "Why TypeScript?",
        subtitle: "Understanding the benefits of static typing in JavaScript",
        body: "<p>TypeScript has become the de facto standard for large-scale JavaScript applications, and for good reason. By adding static types to JavaScript, TypeScript catches errors at compile time, improves code documentation, and enhances the developer experience with better IDE support.</p><p>The learning curve might seem steep initially, but the long-term benefits in terms of code quality, maintainability, and developer productivity are significant.</p>",
        bulletPoints: [
          "Compile-time error detection",
          "Enhanced IDE support and autocompletion",
          "Better code documentation through types",
          "Improved refactoring capabilities",
          "Gradual adoption in existing projects"
        ]
      },
      {
        __component: "shared.text-with-image",
        title: "Advanced Type Patterns",
        subtitle: "Leveraging TypeScript's powerful type system",
        body: "<p>TypeScript's type system is incredibly powerful and allows for sophisticated type patterns that can express complex relationships and constraints in your code. Understanding these patterns is key to writing type-safe and maintainable TypeScript applications.</p><p>From utility types to conditional types and template literal types, mastering these concepts will significantly improve your TypeScript skills.</p>",
        bulletPoints: [
          "Utility types (Partial, Pick, Omit, etc.)",
          "Conditional types and type inference",
          "Template literal types",
          "Mapped types and key remapping",
          "Generic constraints and variance"
        ]
      },
      {
        __component: "shared.images-section"
      },
      {
        __component: "shared.text-only",
        title: "Best Practices and Common Pitfalls",
        subtitle: "Writing clean and maintainable TypeScript code",
        body: "<p>Writing good TypeScript code goes beyond just adding types to your JavaScript. It involves understanding when to use strict vs. loose typing, how to structure your types for maintainability, and avoiding common pitfalls that can make your code harder to work with.</p>",
        note: "Start with strict mode enabled in your tsconfig.json to catch more potential issues early."
      }
    ],
    seo: {
      metaTitle: "Mastering TypeScript | Complete Guide from Basics to Advanced",
      metaDescription: "Learn TypeScript from fundamentals to advanced patterns. Complete guide covering types, generics, utility types, and best practices.",
    }
  },
  {
    title: "The Complete Guide to Next.js 14: Features and Migration",
    description: "Discover the powerful new features in Next.js 14 and learn how to migrate your existing applications to take advantage of the latest improvements.",
    slug: "complete-guide-nextjs-14-features-migration",
    publishedDate: "2024-01-01T16:45:00.000Z",
    content: [
      {
        __component: "shared.text-with-image",
        title: "What's New in Next.js 14",
        subtitle: "Exploring the latest features and improvements",
        body: "<p>Next.js 14 brings significant performance improvements, new features, and enhanced developer experience. The most notable addition is the stable App Router, which provides a new way to build React applications with improved performance and developer experience.</p><p>Server Components, streaming, and the new caching strategies make Next.js 14 a powerful framework for building modern web applications that are both fast and scalable.</p>",
        bulletPoints: [
          "Stable App Router with enhanced performance",
          "Server Components for better performance",
          "Improved streaming and suspense support",
          "Enhanced image optimization",
          "Better TypeScript support and IntelliSense"
        ]
      },
      {
        __component: "shared.text-only",
        title: "Migration Strategy",
        subtitle: "How to upgrade your existing Next.js applications",
        body: "<p>Migrating to Next.js 14 can be done incrementally, allowing you to adopt new features gradually without rewriting your entire application. The key is to start with the pages that benefit most from the new features and gradually migrate the rest of your application.</p><p>The App Router can coexist with the Pages Router, making migration smooth and manageable for teams of any size.</p>",
        bulletPoints: [
          "Incremental migration approach",
          "App Router and Pages Router coexistence",
          "Component and route migration strategies",
          "Testing and validation procedures"
        ]
      },
      {
        __component: "shared.images-section"
      },
      {
        __component: "shared.text-only",
        title: "Performance Optimizations",
        subtitle: "Making the most of Next.js 14's performance features",
        body: "<p>Next.js 14 introduces several performance optimizations that can significantly improve your application's speed and user experience. From automatic code splitting to enhanced caching strategies, these features work together to deliver fast, responsive applications.</p>",
        note: "Use the built-in analytics and performance monitoring tools to measure the impact of these optimizations."
      }
    ],
    seo: {
      metaTitle: "Next.js 14 Complete Guide | Features, Migration & Best Practices",
      metaDescription: "Master Next.js 14 with our comprehensive guide covering new features, migration strategies, and performance optimizations.",
    }
  },
  {
    title: "CSS Grid vs Flexbox: When to Use Each Layout Method",
    description: "A practical comparison of CSS Grid and Flexbox, helping you choose the right layout method for your specific design needs.",
    slug: "css-grid-vs-flexbox-layout-comparison",
    publishedDate: "2023-12-20T11:20:00.000Z",
    content: [
      {
        __component: "shared.text-only",
        title: "Understanding the Fundamentals",
        subtitle: "The core differences between Grid and Flexbox",
        body: "<p>CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes and excel in different scenarios. Understanding when to use each one is crucial for creating efficient and maintainable CSS layouts.</p><p>Flexbox is designed for one-dimensional layouts (either rows or columns), while CSS Grid excels at two-dimensional layouts where you need to control both rows and columns simultaneously.</p>",
        bulletPoints: [
          "Flexbox: One-dimensional layouts (row OR column)",
          "CSS Grid: Two-dimensional layouts (rows AND columns)",
          "Flexbox: Content-driven layout decisions",
          "CSS Grid: Layout-driven content placement",
          "Both: Modern browser support and responsive capabilities"
        ]
      },
      {
        __component: "shared.text-with-image",
        title: "When to Use Flexbox",
        subtitle: "Perfect scenarios for flexible box layouts",
        body: "<p>Flexbox shines when you need to distribute space along a single axis, align items within a container, or create flexible components that adapt to content size. It's particularly useful for navigation bars, button groups, and centering content.</p><p>The flexible nature of Flexbox makes it ideal for responsive designs where content size may vary, and you need elements to grow or shrink accordingly.</p>",
        bulletPoints: [
          "Navigation bars and menus",
          "Button groups and toolbars",
          "Centering content horizontally and vertically",
          "Equal-height columns",
          "Media objects and card layouts"
        ]
      },
      {
        __component: "shared.text-with-image",
        title: "When to Use CSS Grid",
        subtitle: "Leveraging the power of two-dimensional layouts",
        body: "<p>CSS Grid is your go-to choice for complex layouts that require precise control over both rows and columns. It's perfect for page layouts, image galleries, and any design where you need to position items in a two-dimensional space.</p><p>Grid's ability to create explicit track sizes and position items anywhere within the grid makes it invaluable for creating sophisticated layouts with minimal code.</p>",
        bulletPoints: [
          "Complete page layouts and templates",
          "Image galleries and portfolios",
          "Dashboard and admin interfaces",
          "Magazine-style layouts",
          "Complex form layouts"
        ]
      },
      {
        __component: "shared.images-section"
      },
      {
        __component: "shared.text-only",
        title: "Combining Grid and Flexbox",
        subtitle: "Using both layout methods together effectively",
        body: "<p>The most powerful approach is often to combine CSS Grid and Flexbox. Use Grid for the overall page layout and major sections, then use Flexbox within those sections for component-level layouts and content alignment.</p>",
        note: "Don't think of Grid vs Flexbox as an either/or choice. They complement each other beautifully in modern web layouts."
      }
    ],
    seo: {
      metaTitle: "CSS Grid vs Flexbox | Complete Layout Comparison Guide",
      metaDescription: "Master CSS layouts with our comprehensive guide comparing Grid and Flexbox. Learn when to use each method with practical examples.",
    }
  }
];

// Utility function to download and save images
async function downloadImage(url, filename) {
  const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
  
  // Ensure upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  const filePath = path.join(uploadDir, filename);
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`Image already exists: ${filename}`);
    return filePath;
  }
  
  try {
    console.log(`Downloading image: ${filename} from ${url}`);
    const response = await new Promise((resolve, reject) => {
      https.get(url, resolve).on('error', reject);
    });
    
    await pipeline(response, fs.createWriteStream(filePath));
    console.log(`Successfully downloaded: ${filename}`);
    return filePath;
  } catch (error) {
    console.error(`Failed to download ${filename}:`, error.message);
    return null;
  }
}

// Function to upload image to Strapi
async function uploadImageToStrapi(imagePath, name) {
  if (!imagePath || !fs.existsSync(imagePath)) {
    console.log(`Skipping upload for missing image: ${imagePath}`);
    return null;
  }
  
  try {
    const stats = fs.statSync(imagePath);
    const fileBuffer = fs.readFileSync(imagePath);
    
    const fileData = {
      name: name,
      alternativeText: name.replace(/\.[^/.]+$/, "").replace(/-/g, " "),
      caption: "",
      path: null,
      buffer: fileBuffer,
      size: stats.size,
      mime: 'image/jpeg',
      ext: path.extname(imagePath),
    };

    // Use Strapi's upload service
    const uploadedFile = await strapi.plugins.upload.services.upload.upload({
      data: {
        refId: null,
        ref: null,
        field: null,
      },
      files: fileData,
    });

    console.log(`Uploaded image to Strapi: ${name}`);
    return uploadedFile[0];
  } catch (error) {
    console.error(`Failed to upload image ${name}:`, error.message);
    return null;
  }
}

// Main seeding function
async function seedArticles() {
  console.log('🌱 Starting to seed articles...');
  
  try {
    // Download images first
    console.log('📥 Downloading mock images...');
    const imagePromises = MOCK_IMAGES.map(async (url, index) => {
      const filename = `mock-image-${index + 1}.jpg`;
      return await downloadImage(url, filename);
    });
    
    const downloadedImages = await Promise.all(imagePromises);
    const validImages = downloadedImages.filter(Boolean);
    
    console.log(`✅ Downloaded ${validImages.length} images successfully`);
    
    // Upload images to Strapi
    console.log('📤 Uploading images to Strapi...');
    const uploadPromises = validImages.map(async (imagePath, index) => {
      const filename = `mock-image-${index + 1}.jpg`;
      return await uploadImageToStrapi(imagePath, filename);
    });
    
    const uploadedImages = await Promise.all(uploadPromises);
    const validUploadedImages = uploadedImages.filter(Boolean);
    
    console.log(`✅ Uploaded ${validUploadedImages.length} images to Strapi`);
    
    // Create articles
    console.log('📝 Creating articles...');
    for (let i = 0; i < SAMPLE_ARTICLES.length; i++) {
      const articleData = { ...SAMPLE_ARTICLES[i] };
      
      // Assign cover image
      if (validUploadedImages[i]) {
        articleData.cover = validUploadedImages[i].id;
      }
      
      // Process content blocks and assign images
      articleData.content = articleData.content.map((block, blockIndex) => {
        if (block.__component === 'shared.text-with-image') {
          const imageIndex = (i * 3 + blockIndex) % validUploadedImages.length;
          if (validUploadedImages[imageIndex]) {
            block.image = validUploadedImages[imageIndex].id;
          }
        } else if (block.__component === 'shared.images-section') {
          const image1Index = (i * 3 + blockIndex) % validUploadedImages.length;
          const image2Index = (i * 3 + blockIndex + 1) % validUploadedImages.length;
          
          if (validUploadedImages[image1Index]) {
            block.image1 = validUploadedImages[image1Index].id;
          }
          if (validUploadedImages[image2Index]) {
            block.image2 = validUploadedImages[image2Index].id;
          }
        }
        return block;
      });
      
      // Set timestamps
      const now = new Date().toISOString();
      articleData.updatedDate = now;
      
      // Create the article
      const article = await strapi.entityService.create('api::article.article', {
        data: {
          ...articleData,
          publishedAt: articleData.publishedDate || now,
        },
      });
      
      console.log(`✅ Created article: ${article.title}`);
    }
    
    console.log('🎉 Seeding completed successfully!');
    console.log(`Created ${SAMPLE_ARTICLES.length} articles with images`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

// Function to clear existing data
async function clearExistingData() {
  console.log('🧹 Clearing existing articles...');
  
  try {
    const articles = await strapi.entityService.findMany('api::article.article');
    
    for (const article of articles) {
      await strapi.entityService.delete('api::article.article', article.id);
    }
    
    console.log(`✅ Cleared ${articles.length} existing articles`);
  } catch (error) {
    console.error('❌ Failed to clear existing data:', error);
  }
}

// Export functions for use in different contexts
module.exports = {
  seedArticles,
  clearExistingData,
  
  // Main execution function
  async run() {
    console.log('🚀 Starting Blok CMS seeding process...');
    
    try {
      await clearExistingData();
      await seedArticles();
      console.log('✨ All done! Your CMS is now seeded with sample content.');
    } catch (error) {
      console.error('💥 Seeding process failed:', error);
      process.exit(1);
    }
  }
};

// Run if called directly
if (require.main === module) {
  console.log('🚀 Starting Blok CMS seeding process...');
  console.log('⚠️  Note: Make sure Strapi is running on http://localhost:1337');
  console.log('📡 Using Strapi REST API for seeding...');
  
  // Use REST API instead of direct Strapi instance
  seedWithAPI();
}

// Alternative seeding using REST API
async function seedWithAPI() {
  const STRAPI_URL = 'http://localhost:1337';
  
  console.log('🌱 Starting API-based seeding...');
  
  try {
    // Check if Strapi is running
    const healthCheck = await fetch(`${STRAPI_URL}/admin`);
    if (!healthCheck.ok) {
      throw new Error('Strapi is not running. Please start it with: pnpm run develop');
    }
    
    console.log('✅ Strapi is running, proceeding with seeding...');
    
    // Download images first
    console.log('📥 Downloading mock images...');
    const imagePromises = MOCK_IMAGES.map(async (url, index) => {
      const filename = `mock-image-${index + 1}.jpg`;
      return await downloadImage(url, filename);
    });
    
    const downloadedImages = await Promise.all(imagePromises);
    const validImages = downloadedImages.filter(Boolean);
    
    console.log(`✅ Downloaded ${validImages.length} images successfully`);
    
    // For now, we'll create articles without images using the API
    // Note: Full seeding with images requires admin authentication
    console.log('📝 Creating sample articles via API...');
    
    const simpleArticles = SAMPLE_ARTICLES.map(article => ({
      data: {
        title: article.title,
        description: article.description,
        slug: article.slug,
        publishedAt: article.publishedDate,
        content: article.content.map(block => ({
          ...block,
          // Remove image references for API creation
          image: undefined,
          image1: undefined,
          image2: undefined
        })),
        seo: article.seo
      }
    }));
    
    // Create articles via API (requires authentication, so this is a simplified version)
    console.log('ℹ️  For full seeding with images, you need to:');
    console.log('1. Create an admin user at http://localhost:1337/admin');
    console.log('2. Generate an API token in Settings > API Tokens');
    console.log('3. Use the Strapi admin panel to create articles manually');
    console.log('');
    console.log('📋 Sample articles prepared:');
    
    simpleArticles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.data.title}`);
    });
    
    console.log('');
    console.log('✨ Seeding preparation completed!');
    console.log('🎯 Next steps:');
    console.log('1. Go to http://localhost:1337/admin');
    console.log('2. Create your admin user');
    console.log('3. Create articles manually using the sample data structure');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('- Make sure Strapi is running: pnpm run develop');
    console.log('- Check that http://localhost:1337 is accessible');
  }
}
