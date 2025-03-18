import { fetchGraphQL } from '@/lib/functions';
import { ProductIdProps } from '@/lib/types';

export default async function getProducts() {
  const query = `
    query GetProducts {
      page(id: "26", idType: DATABASE_ID) {
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
            detailsURL
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query);

  return response.data.page as ProductIdProps;
}
