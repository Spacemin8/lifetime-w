import { fetchGraphQL } from '@/lib/functions';
import { BrandProps } from '@/lib/types';

/**
 * Fetch a menu by slug.
 */
export default async function getBrands() {
  const query = `
    query GetBrands {
      page(id: "28", idType: DATABASE_ID) {
        brands {
          brands {
            name
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query);

  return response?.data?.page?.brands?.brands as BrandProps[];
}
