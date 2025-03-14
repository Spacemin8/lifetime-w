import { fetchGraphQL } from '@/lib/functions';
import { Page } from '@/lib/types';

/**
 * Fetch a page by slug.
 */
export default async function getPageBySlug(slug: string) {
  const query = `
    query GetPageBySlug($slug: ID = "URI") {
      page(idType: URI, id: $slug) {
        databaseId
        date
        modified
        content(format: RENDERED)
        title(format: RENDERED)
        seo {
          metaDesc
          title
        }
        emailSender {
          __typename
          emailTitle
          subscribe
          emailPlaceholder
          emailTypingPlaceholder
        }
        categoriesAndBrands {
          __typename
          categoriesBrandsTitle
          brandTitle
          categoryTitle
        }
        hero {
          __typename
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
          heroTitle
          heroSubtitle
          content
          hyperlinks {
            link
            name
          }
        }
        featuredProducts {
          __typename
          featuredProductTitle
        }
        filterProducts {
          productsFilter
        }
        relatedProducts {
          related_products_title
        }
      }
    }
  `;

  const variables = {
    slug: slug
  };

  const response = await fetchGraphQL(query, variables);

  return response.data.page as Page;
}
