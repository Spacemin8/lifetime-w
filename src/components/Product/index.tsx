'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ProductProps } from '@/lib/types';
import Link from 'next/link';

const Product = ({ product, index }: { product: ProductProps, index: number }) => {

  return (
    <Link href={`/products/${index + 1}`}
      className="flex flex-col border border-[#2e374366] rounded-md overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 mx-auto
      transform hover:scale-105 hover:brightness-105 group max-h-[540px]"
    >
      <div className="relative w-full h-[266px] overflow-hidden">
        {product?.featuredImage?.node?.sourceUrl ? (
          <Image
            src={product.featuredImage.node.sourceUrl}
            alt={product.title || 'Product image'}
            fill
            sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%, 25%"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      <div className="p-6 pt-2 flex flex-col flex-grow gap-2">
        <h3 className="text-[#605770] text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] font-bold line-clamp-3">
          {product.title}
        </h3>

        <p className="text-sm text-[#60577F] font-[400]">
          {product.category || 'Calphalon'}
        </p>

        <div className="mt-auto">
          <p className="text-[#F09900] font-[700] text-[28px] sm:text-[32px] mb-4">
            {product.price || '49.99'}
          </p>

          <button
            className="w-full py-2 px-4 bg-gradient-to-b from-[#FFE8AB] to-[#F5C645] hover:from-[#F5C645] hover:to-[#E0B645] rounded-[16px] border border-[#A98320] flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105 cursor-pointer"
            onClick={(e) => {
              e.preventDefault(); if (product?.detailsURL) {
                window.open(product.detailsURL, "_blank");
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current">
              <path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z" />
            </svg>
            <span className="text-sm">Buy through Amazon</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
