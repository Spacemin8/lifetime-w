import { fetchGraphQL } from '@/lib/functions';
import { FooterProps } from '@/lib/types';

/**
 * Fetch all pages.
 */
export default async function getFooter() {
  const query = `
    query GetFooter {
      posts {
        nodes {
          id
        }
      }
      menu(id: "3", idType: DATABASE_ID) {
        footerSettings {
          __typename
          cookiesPolicy
          copyright
          email
          facebook
          linkedin
          phone
          privacyPolicy
          termsOfService
          twitter
          whatsapp
          logo {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query);

  return response.data as FooterProps;
}
