import { fetchGraphQL } from '@/lib/functions';
import { ProductIdProps } from '@/lib/types';

export default async function getProducts() {
  const query = `
    query GetProducts {
      page(id: "26", idType: DATABASE_ID) {
        products {
          asin {
            productId
            isfeatured
            isrelated
            previewImages {
              nodes {
                sourceUrl
              }
            }
            warranty
          }
        }
        ownProducts {
          products {
            bigImage {
              node {
                sourceUrl
              }
            }
            brand
            category
            description
            featuredImage {
              node {
                sourceUrl
              }
            }
            isfeatured
            isrelated
            previewImages {
              nodes {
                sourceUrl
              }
            }
            price
            title
            warranty
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query);

  return response.data.page as ProductIdProps;
}
