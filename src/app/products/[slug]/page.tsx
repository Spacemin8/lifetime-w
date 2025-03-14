import getPageBySlug from '@/lib/queries/getPageBySlug'
import type { DynamicPageProps } from '@/lib/types'
import { Page } from '@/lib/types'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import RelatedProducts from '@/components/RelatedProducts'

async function fetchData(slug: string): Promise<Page | null> {
  const page = await getPageBySlug(slug)

  if (page) {
    return page;
  }

  return null;
}

export async function generateMetadata({ }: Readonly<DynamicPageProps>): Promise<Metadata> {
  const page = await fetchData('/product')

  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    }
  }

  return {
    title: page.seo?.title || 'Default Title',
    description: page.seo?.metaDesc || 'Default Description',
    openGraph: {
      title: page.seo?.title || 'Default Title',
      description: page.seo?.metaDesc || 'Default Description',
    },
  }
}

function RenderPage({ page }: { page: Page }) {
  return (
    <main className="flex flex-col gap-[60px]">
      {page?.relatedProducts?.related_products_title && (<RelatedProducts data={page?.relatedProducts} />)}
    </main>
  )
}

export default async function Archive({ }: Readonly<DynamicPageProps>) {
  const data = await fetchData('/product')

  if (!data) {
    notFound()
  }

  if (data) {
    return <RenderPage page={data} />
  }

  notFound()
}
