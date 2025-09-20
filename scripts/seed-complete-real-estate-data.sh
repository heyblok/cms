#!/bin/bash

# =============================================================================
# BLOK CMS - Complete Real Estate Data Seeding Script
# =============================================================================
# 
# This script creates a complete real estate CMS with:
# - 5 comprehensive real estate articles
# - 13 professional real estate images (already uploaded)
# - Proper image linking in article content sections
# - SEO metadata for all articles
# - Dynamic content components (text-only, text-with-image, image galleries)
#
# ⚠️  WARNING: This script will DELETE all existing articles first!
# ⚠️  Only run this if you want to reset the entire article database!
#
# Usage: ./seed-complete-real-estate-data.sh
# =============================================================================

# Create complete real estate articles with properly linked images
STRAPI_URL="https://capable-idea-4abea9084b.strapiapp.com"
API_TOKEN="7683e6a2b3c0a0dcc18dcac39cef38b5d94f16185c5c819ec911bba7efcdc88273297e559469de4594ad95766e9074dea5e9c059adc7556ebd76237b7ab875fcc09d14932682646aa675734a7b5978f6a0cb3fb604fd4489cbbe17973aa0063f08a88dc3d687210be8b6c91e38b649cab5abf9fd5231dd3fcc058074fbee1b9d"

echo "🏠 Creating real estate articles with properly linked images..."
echo "🔗 Target: $STRAPI_URL"

# Clean up any existing articles first
echo "🗑️  Removing any existing articles..."
for id in {1..20}; do
  curl -s -X DELETE -H "Authorization: Bearer $API_TOKEN" "$STRAPI_URL/api/articles/$id" > /dev/null 2>&1
done

# Article 1: Market Trends
echo "📝 Creating Article 1: Market Trends..."
RESPONSE1=$(curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d '{
    "data": {
      "title": "2024 Real Estate Market Trends: What Buyers and Sellers Need to Know",
      "description": "Comprehensive analysis of the current real estate market conditions, emerging trends, and expert predictions for property values in 2024.",
      "slug": "2024-real-estate-market-trends-guide",
      "publishedAt": "2024-01-15T10:00:00.000Z",
      "publishedDate": "2024-01-15T10:00:00.000Z",
      "updatedDate": "2024-01-15T10:00:00.000Z",
      "cover": 2,
      "content": [
        {
          "__component": "shared.text-only",
          "title": "Market Overview",
          "subtitle": "Understanding the current real estate landscape",
          "body": "<p>The 2024 real estate market presents unique opportunities and challenges for both buyers and sellers. After years of rapid price appreciation and historically low inventory, the market is showing signs of stabilization with new dynamics emerging.</p><p>Interest rates, inflation, and changing buyer preferences are reshaping how properties are priced, marketed, and sold. Understanding these trends is crucial for making informed real estate decisions.</p>",
          "bulletPoints": [
            "Interest rate impacts on affordability",
            "Inventory levels showing gradual improvement",
            "Regional market variations",
            "Technology adoption in real estate",
            "Sustainable and smart home preferences"
          ]
        },
        {
          "__component": "shared.text-with-image",
          "title": "Buyer Market Opportunities",
          "subtitle": "How current market conditions favor homebuyers",
          "body": "<p>Todays buyers have more negotiating power than theyve had in years. With increased inventory and longer days on market, buyers can take their time to find the right property and negotiate favorable terms.</p><p>First-time homebuyer programs and innovative financing options are making homeownership more accessible, while sellers are becoming more willing to make concessions on price and repairs.</p>",
          "bulletPoints": [
            "Increased selection of available properties",
            "More time for due diligence and inspections",
            "Seller concessions becoming common",
            "Competitive financing options available"
          ],
          "image": 7
        },
        {
          "__component": "shared.images-section",
          "image1": 6,
          "image2": 12
        }
      ],
      "seo": {
        "metaTitle": "2024 Real Estate Market Trends | Expert Analysis",
        "metaDescription": "Stay informed about 2024 real estate market trends, including buyer opportunities, seller strategies, and investment insights.",
        "shareImage": 2
      }
    }
  }' \
  "$STRAPI_URL/api/articles")

echo "Response 1: $(echo $RESPONSE1 | jq '.data.title // .error.message')"

# Article 2: First-Time Buyers
echo "📝 Creating Article 2: First-Time Buyer Guide..."
RESPONSE2=$(curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d '{
    "data": {
      "title": "First-Time Home Buyer Complete Guide: From Search to Closing",
      "description": "Everything first-time homebuyers need to know about the home buying process, financing options, and avoiding common pitfalls.",
      "slug": "first-time-home-buyer-guide",
      "publishedAt": "2024-01-10T14:30:00.000Z",
      "publishedDate": "2024-01-10T14:30:00.000Z",
      "updatedDate": "2024-01-10T14:30:00.000Z",
      "cover": 8,
      "content": [
        {
          "__component": "shared.text-with-image",
          "title": "Getting Pre-Approved for a Mortgage",
          "subtitle": "Understanding your buying power and financial readiness",
          "body": "<p>Before you start looking at homes, getting pre-approved for a mortgage is crucial. This process involves a lender reviewing your credit score, income, employment history, and debts to determine how much theyre willing to lend you.</p><p>Pre-approval gives you a clear budget, shows sellers youre a serious buyer, and can speed up the closing process once you find the right home.</p>",
          "bulletPoints": [
            "Credit score requirements and improvement tips",
            "Documentation needed for pre-approval",
            "Understanding debt-to-income ratios",
            "Shopping for the best mortgage rates"
          ],
          "image": 10
        },
        {
          "__component": "shared.text-only",
          "title": "The Home Search Process",
          "subtitle": "Finding the right property in the right neighborhood",
          "body": "<p>Successful home searching requires a clear understanding of your needs versus wants, thorough neighborhood research, and patience. Consider factors like commute times, school districts, future development plans, and resale potential.</p><p>Working with an experienced buyers agent can provide valuable insights into local market conditions and help you navigate competitive situations.</p>",
          "bulletPoints": [
            "Creating a prioritized wish list",
            "Researching neighborhoods and schools",
            "Understanding property taxes and HOA fees",
            "Scheduling and conducting home tours"
          ]
        },
        {
          "__component": "shared.images-section",
          "image1": 3,
          "image2": 5
        }
      ],
      "seo": {
        "metaTitle": "First-Time Home Buyer Guide | Complete Process",
        "metaDescription": "Complete guide for first-time homebuyers covering pre-approval, home search, making offers, and closing.",
        "shareImage": 8
      }
    }
  }' \
  "$STRAPI_URL/api/articles")

echo "Response 2: $(echo $RESPONSE2 | jq '.data.title // .error.message')"

# Article 3: Home Staging
echo "📝 Creating Article 3: Home Staging..."
RESPONSE3=$(curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d '{
    "data": {
      "title": "Home Staging Secrets: How to Sell Your House Faster and for More Money",
      "description": "Professional home staging tips and strategies that help properties sell quickly and maximize sale price in any market condition.",
      "slug": "home-staging-secrets-sell-faster",
      "publishedAt": "2024-01-05T09:15:00.000Z",
      "publishedDate": "2024-01-05T09:15:00.000Z",
      "updatedDate": "2024-01-05T09:15:00.000Z",
      "cover": 4,
      "content": [
        {
          "__component": "shared.text-only",
          "title": "The Psychology of Home Staging",
          "subtitle": "Creating emotional connections with potential buyers",
          "body": "<p>Successful home staging goes beyond just cleaning and organizing—its about creating an emotional connection between potential buyers and your property. When buyers can envision themselves living in the space, theyre more likely to make competitive offers.</p><p>Professional staging techniques focus on highlighting your homes best features while minimizing any drawbacks, creating a neutral yet appealing environment that appeals to the broadest range of buyers.</p>",
          "bulletPoints": [
            "Depersonalizing spaces to appeal to more buyers",
            "Creating flow and functionality in each room",
            "Using lighting to enhance space and mood",
            "Strategic furniture placement and removal",
            "Adding fresh, neutral accents and accessories"
          ]
        },
        {
          "__component": "shared.text-with-image",
          "title": "Room-by-Room Staging Guide",
          "subtitle": "Essential staging tips for every area of your home",
          "body": "<p>Each room in your home serves a specific purpose and should be staged accordingly. The living room should feel welcoming and spacious, the kitchen should appear functional and updated, and bedrooms should feel like peaceful retreats.</p><p>Focus on the most important rooms first—living areas, kitchen, and master bedroom—as these spaces have the greatest impact on buyer perception and final sale price.</p>",
          "bulletPoints": [
            "Living room: maximize seating and conversation areas",
            "Kitchen: clear counters and highlight storage",
            "Master bedroom: create a hotel-like sanctuary",
            "Bathrooms: emphasize cleanliness and luxury touches"
          ],
          "image": 11
        },
        {
          "__component": "shared.images-section",
          "image1": 4,
          "image2": 5
        }
      ],
      "seo": {
        "metaTitle": "Home Staging Secrets | Sell House Faster for More Money",
        "metaDescription": "Learn professional home staging tips and secrets that help houses sell faster and for higher prices.",
        "shareImage": 4
      }
    }
  }' \
  "$STRAPI_URL/api/articles")

echo "Response 3: $(echo $RESPONSE3 | jq '.data.title // .error.message')"

# Article 4: Investment Strategies
echo "📝 Creating Article 4: Investment Strategies..."
RESPONSE4=$(curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d '{
    "data": {
      "title": "Real Estate Investment Strategies: Building Wealth Through Property",
      "description": "Comprehensive guide to real estate investing, covering different strategies, market analysis, and building a profitable property portfolio.",
      "slug": "real-estate-investment-strategies",
      "publishedAt": "2024-01-01T16:45:00.000Z",
      "publishedDate": "2024-01-01T16:45:00.000Z",
      "updatedDate": "2024-01-01T16:45:00.000Z",
      "cover": 13,
      "content": [
        {
          "__component": "shared.text-with-image",
          "title": "Investment Property Types and Strategies",
          "subtitle": "Understanding different approaches to real estate investing",
          "body": "<p>Real estate investing offers multiple strategies for building wealth, from traditional buy-and-hold rentals to fix-and-flip projects and commercial properties. Each strategy has different risk profiles, capital requirements, and potential returns.</p><p>Successful investors often start with one strategy and expand their portfolio as they gain experience and capital. Understanding your risk tolerance, available time, and financial goals will help determine the best approach for your situation.</p>",
          "bulletPoints": [
            "Buy-and-hold rental properties for passive income",
            "Fix-and-flip for active income and quick returns",
            "Commercial real estate for higher yields",
            "REITs for passive real estate exposure",
            "House hacking to reduce personal housing costs"
          ],
          "image": 9
        },
        {
          "__component": "shared.text-only",
          "title": "Market Analysis and Property Selection",
          "subtitle": "How to identify profitable investment opportunities",
          "body": "<p>Successful real estate investing requires thorough market research and careful property selection. Key factors include local job growth, population trends, school districts, infrastructure development, and rental demand.</p><p>Financial analysis is equally important—understanding cap rates, cash flow, appreciation potential, and total return on investment will help you make informed decisions and avoid costly mistakes.</p>",
          "bulletPoints": [
            "Analyzing local market trends and demographics",
            "Calculating cash flow and return metrics",
            "Understanding the 1% rule and cap rates",
            "Researching comparable sales and rents",
            "Evaluating neighborhood growth potential"
          ]
        },
        {
          "__component": "shared.images-section",
          "image1": 13,
          "image2": 6
        }
      ],
      "seo": {
        "metaTitle": "Real Estate Investment Strategies | Build Wealth",
        "metaDescription": "Learn proven real estate investment strategies for building wealth, including rental properties, fix-and-flip, and commercial investing.",
        "shareImage": 13
      }
    }
  }' \
  "$STRAPI_URL/api/articles")

echo "Response 4: $(echo $RESPONSE4 | jq '.data.title // .error.message')"

# Article 5: Smart Home Technology
echo "📝 Creating Article 5: Smart Home Technology..."
RESPONSE5=$(curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d '{
    "data": {
      "title": "Smart Home Technology: Enhancing Property Value and Lifestyle",
      "description": "How modern smart home technology can increase property values, improve energy efficiency, and enhance daily living experiences.",
      "slug": "smart-home-technology-property-value",
      "publishedAt": "2023-12-20T11:20:00.000Z",
      "publishedDate": "2023-12-20T11:20:00.000Z",
      "updatedDate": "2023-12-20T11:20:00.000Z",
      "cover": 14,
      "content": [
        {
          "__component": "shared.text-only",
          "title": "Smart Home ROI and Property Value",
          "subtitle": "How technology investments affect home values",
          "body": "<p>Smart home technology has evolved from luxury novelty to practical necessity, with many features now expected by modern homebuyers. Strategic investments in smart home technology can increase property values while providing immediate benefits to current occupants.</p><p>Focus on technologies that provide security, energy efficiency, and convenience while ensuring compatibility with popular platforms and easy operation for users of all technical skill levels.</p>",
          "bulletPoints": [
            "Smart thermostats can increase home value by $1,500-$2,000",
            "Security systems and smart locks appeal to safety-conscious buyers",
            "Energy-efficient smart devices reduce utility costs",
            "Voice assistants and home automation add convenience",
            "Smart lighting creates ambiance and saves energy"
          ]
        },
        {
          "__component": "shared.text-with-image",
          "title": "Essential Smart Home Features",
          "subtitle": "Must-have technologies for modern homes",
          "body": "<p>Start with foundational smart home features that provide the greatest impact on daily life and property value. Smart thermostats, security systems, and lighting control offer immediate benefits and broad appeal to potential buyers.</p><p>Choose devices that integrate well with each other and popular platforms like Google Home, Amazon Alexa, or Apple HomeKit to ensure long-term compatibility and ease of use.</p>",
          "bulletPoints": [
            "Smart thermostats for energy savings and comfort",
            "Video doorbells and security cameras",
            "Smart locks for keyless entry and security",
            "Automated lighting and window treatments",
            "Smart smoke and carbon monoxide detectors"
          ],
          "image": 14
        },
        {
          "__component": "shared.images-section",
          "image1": 3,
          "image2": 11
        }
      ],
      "seo": {
        "metaTitle": "Smart Home Tech | Increase Property Value",
        "metaDescription": "Discover how smart home technology can increase property values, improve energy efficiency, and enhance daily living experiences.",
        "shareImage": 14
      }
    }
  }' \
  "$STRAPI_URL/api/articles")

echo "Response 5: $(echo $RESPONSE5 | jq '.data.title // .error.message')"

echo ""
echo "✅ All real estate articles with images created!"
echo "🖼️  Each article now has:"
echo "   - Cover image from uploaded real estate photos"
echo "   - Text-with-image sections with proper image links"
echo "   - Image galleries with dual real estate photos"  
echo "   - Complete SEO metadata with social sharing images"
echo ""
echo "🔗 View your articles at: $STRAPI_URL/admin/content-manager/collection-types/api::article.article"
