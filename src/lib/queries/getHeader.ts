import { fetchGraphQL } from '@/lib/functions';
import { HeaderProps } from '@/lib/types';

/**
 * Fetch all pages.
 */
export default async function getHeader() {
  const query = `
    query GetHeader {
      posts {
        nodes {
          id
        }
      }
      menu(id: "2", idType: DATABASE_ID) {
        headerSetting {
          __typename
          menuTitle1
          menuTitle2
          menuTitle3
          menuTitle4
          menuUrl1
          menuUrl2
          menuUrl3
          menuUrl4
          navTitle1
          navTitle2
          navTitle3
          navTitle4
          navUrl1
          navUrl2
          navUrl3
          navUrl4
          logo {
            cursor
            node {
              altText
              sourceUrl
              uri
            }
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query);

  return response.data as HeaderProps;
}
