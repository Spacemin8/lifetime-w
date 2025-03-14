import getPageBySlug from '@/lib/queries/getPageBySlug'
import type { DynamicPageProps } from '@/lib/types'
import { Page } from '@/lib/types'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import EmailSender from '@/components/EmailSender'
import CategoriesAndBrands from '@/components/Categories&Brands'
import FeaturedProducts from '@/components/FeaturedProducts'
import ProductsFilter from '@/components/ProductsFilter'
import RelatedProducts from '@/components/RelatedProducts'
import Hero from '@/components/Hero'

async function fetchData(slug: string): Promise<Page | null> {
  const page = await getPageBySlug(slug)

  if (page) {
    return page;
  }

  return null;
}

export async function generateMetadata({ params }: Readonly<DynamicPageProps>): Promise<Metadata> {
  const { slug } = await params
  const page = await fetchData(slug)

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
    <main className="flex flex-col gap-[30px] lg:gap-[60px]">
      {(page?.hero?.featuredImage || page?.hero?.content) && (<Hero data={page?.hero} />)}
      {page?.emailSender?.emailTitle && (<EmailSender data={page?.emailSender} />)}
      {page?.categoriesAndBrands?.categoriesBrandsTitle && (<CategoriesAndBrands data={page?.categoriesAndBrands} />)}
      {page?.featuredProducts?.featuredProductTitle && (<FeaturedProducts data={page?.featuredProducts} />)}
      {page?.filterProducts?.productsFilter && (<ProductsFilter data={page?.filterProducts} />)}
    </main>
  )
}

export default async function Archive({ params }: Readonly<DynamicPageProps>) {
  const { slug } = await params

  const data = await fetchData(slug)

  if (!data) {
    notFound()
  }

  if (data) {
    return <RenderPage page={data} />
  }

  notFound()
}
