import { fetchGraphQL } from '@/lib/functions';
import { AAWP, ProductProps } from '@/lib/types';
import * as cheerio from 'cheerio';

/**
 * Fetch all AAWP products, parse HTML content, and merge with additional metadata.
 */
export default async function getAAWP() {
  const query = `
    query GetAAWP {
      post(id: "153", idType: DATABASE_ID) {
        id
        title
        content
        aawpProducts {
          aawp {
            asin
            brand
            category
            isfeatured
            isrelated
            warranty
            previewImages {
              nodes {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  // Fetch GraphQL data
  const response = await fetchGraphQL(query);
  const post = response.data.post as AAWP;
  const productsHtml = post.content;
  const aawpProducts = post.aawpProducts?.aawp || [];

  // Parse AAWP product data from HTML content
  const $ = cheerio.load(productsHtml);
  const parsedProducts: ProductProps[] = [];

  $('.aawp-product').each((_, element) => {
    const asin = $(element).attr('data-aawp-product-asin') || '';
    const title = $(element).find('.aawp-product__title').text().trim() || '';
    const description = $(element)
      .find('.aawp-product__description')
      .text()
      .trim()
      .replace(/(?<!\d)([.!?])\s*(?!\d)/g, '$1\n')
      .replace(/\n+$/, '');
    const image = $(element).find('img.aawp-product__image').attr('src') || '';
    const url =
      $(element).find('a.aawp-product__image-link').attr('href') || '';
    const price =
      $(element).find('.aawp-product__price--current').text().trim() || '';

    // Find matching metadata by ASIN
    const metadata =
      aawpProducts.find((product?: any) => product.asin === asin) || {};

    parsedProducts.push({
      title,
      description,
      featuredImage: {
        node: {
          sourceUrl: image
        }
      },
      bigImage: {
        node: {
          sourceUrl: image
        }
      },
      detailsURL: url,
      price,
      brand: metadata.brand || '',
      category: metadata.category || '',
      isfeatured: metadata.isfeatured ?? false,
      isrelated: metadata.isrelated ?? false,
      warranty: metadata.warranty || [],
      previewImages: metadata.previewImages || { nodes: [] }
    });
  });

  return parsedProducts;
}
