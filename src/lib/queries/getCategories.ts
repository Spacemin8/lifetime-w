import { fetchGraphQL } from '@/lib/functions';
import { CategoryProps } from '@/lib/types';

/**
 * Fetch a category archive by slug.
 */
export default async function getCategories() {
  const query = `
    query GetCategories {
      page(id: "29", idType: DATABASE_ID) {
        categoryDetail {
          categoryItem {
            name
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query);

  return response.data.page.categoryDetail.categoryItem as CategoryProps[];
}
