'use client';

import React, { useState, useEffect } from 'react';
import getProducts from '@/lib/queries/getProducts';
import { ProductProps } from '../../lib/types';
import getAAWP from '@/lib/queries/getAAWP';
import Product from '../Product';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';

const RelatedProducts = ({ data }: { data?: any }) => {
  const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([]);
  const [product, setProduct] = useState<ProductProps>();
  const [loading, setLoading] = useState<boolean>(true);
  const pathName = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [data, aawp] = await Promise.all([getProducts(), getAAWP()]);

        const ownProducts = data.ownProducts?.products ?? [];
        ownProducts.forEach((product?: any, index?: number) => (product.id = index));

        const offset = ownProducts.length;
        const combinedProducts = [
          ...ownProducts,
          ...aawp.map((product, index) => ({
            ...product,
            id: offset + index,
          })),
        ];
        console.log(combinedProducts);
        setRelatedProducts(combinedProducts?.filter((product) => product?.isrelated === true));
        setProduct(combinedProducts[Number(pathName.replace('/products/', '')) - 1])
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  return (
    <div className='flex flex-col'>
      <div className='py-8 lg:py-20 flex flex-col lg:flex-row gap-4 xl:gap-6 items-center lg:items-start'>
        <div className='flex flex-col lg:flex-row w-full lg:max-w-[60%] gap-4 xl:gap-6'>
          <div className='hidden lg:flex lg:flex-col justify-center items-center gap-4 w-full lg:w-[25%] xl:my-auto'>
            {!loading ?
              product?.previewImages?.nodes?.map((item?: any, idx?: number) => (
                <Image src={item?.sourceUrl} alt='Products' key={idx} width={227} height={120} className='lg:!w-[100%] h-auto object-contain' style={{ width: `calc(${100 / (product?.previewImages?.nodes?.length ?? 0)}% - 16px)` }} />
              )) :
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse rounded-lg bg-white shadow-md w-full"
                >
                  <div className="h-32 bg-gray-300 rounded-md"></div>
                </div>
              )
              )}
          </div>
          {loading ? (
            <div className='animate-pulse w-full lg:max-w-[65%] h-[500px] bg-gray-300 rounded-md'></div>
          ) : (
            <>
              <Image src={product?.bigImage?.node?.sourceUrl || ''} alt='Product' width={604} height={772} className='w-full lg:max-w-[65%] h-auto object-contain' />
            </>
          )}
          <div className='flex flex-row lg:hidden justify-center items-center gap-4 w-full lg:w-[20%]'>
            {product?.previewImages?.nodes?.map((item?: any, idx?: number) => (
              <Image src={item?.sourceUrl} alt='Products' key={idx} width={227} height={120} className='lg:!w-[100%] h-auto object-contain' style={{ width: `calc(${100 / (product?.previewImages?.nodes?.length ?? 0)}% - 16px)` }} />
            ))}
          </div>
        </div>
        <div className={twMerge('flex flex-col w-full lg:max-w-[40%]', !loading ? 'gap-4 lg:gap-8' : 'gap-2')}>
          {loading ? Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse rounded-lg bg-white shadow-md w-full"
            >
              <div className="h-8 bg-gray-300 rounded-md"></div>
            </div>
          )) : (
            <h2 className='font-[700] text-[24px] lg:text-[32px] leading-[32px] lg:leading-[40px] text-[#605770]'>{product?.title}</h2>
          )}
          {loading ? (
            <div className='animate-pulse h-48 bg-gray-300 rounded-md mt-4'></div>
          ) : (
            <ul className="text-[14px] lg:text-[16px] font-[400] leading-[22px] lg:leading-[24px] text-[#515770] list-disc pl-5">
              {product?.description?.split("\n").map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          )}
          {loading ? (
            <div className='animate-pulse h-10 w-1/4 bg-gray-300 rounded-md mt-4'></div>
          ) : (
            <p className="text-[#F09900] font-[700] text-[32px] lg:text-[48px] leading-[40px] lg:leading-[59px] mb-3 lg:mb-5">
              {product?.price}
            </p>
          )}
          {loading ? (
            <div className='animate-pulse h-10 w-1/4 bg-gray-300 rounded-md mt-4'></div>
          ) : (
            <Link href={product?.detailsURL || ''} target='_blank' passHref className="w-full py-3 px-4 bg-gradient-to-b cursor-pointer from-[#FFE8AB] to-[#F5C645] hover:from-[#F5C645] hover:[#F0C645] rounded-[25px] border border-[#A98320] flex items-center justify-center gap-2 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current">
                <path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z" />
              </svg>
              <span className="text-sm">Buy through Amazon</span>
            </Link>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col gap-8 lg:gap-20 py-8 lg:py-20 border-t border-[#F90]">
        <h2 className="text-[32px] lg:text-[48px] leading-[40px] lg:leading-[56px] font-[700] text-[#515770] text-center">{data?.related_products_title}</h2>
        <div className='flex justify-center w-full'>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {!loading ? relatedProducts.slice(0, 3).map((product, idx) => (
              <div key={idx} className="flex justify-center w-full">
                <Product product={product} index={product?.id || 0} />
              </div>
            )) : Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse p-4 border border-[#2e374366] rounded-lg bg-white shadow-md w-full"
              >
                <div className="h-60 bg-gray-300 rounded-md"></div>
                <div className="h-24 bg-gray-300 mt-3 w-full rounded-md"></div>
                <div className="h-8 bg-gray-300 mt-2 w-1/2 rounded-md"></div>
                <div className="h-8 bg-gray-300 mt-2 w-1/3 rounded-md"></div>
                <div className="h-8 bg-gray-300 mt-4 w-full rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts;
