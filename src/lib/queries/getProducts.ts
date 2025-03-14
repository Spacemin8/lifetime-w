import { fetchGraphQL } from '@/lib/functions';
import { ProductProps } from '@/lib/types';

export default async function getProducts() {
  const query = `
    query GetProducts {
      page(id: "26", idType: DATABASE_ID) {
        products {
          products {
            brand
            category
            description
            isfeatured
            isrelated
            price
            title
            warranty
            bigImage {
              node {
                sourceUrl
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
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

  const response = await fetchGraphQL(query);

  return response.data.page.products.products as ProductProps[];
}
