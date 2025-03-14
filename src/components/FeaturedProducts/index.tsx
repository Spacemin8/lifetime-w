'use client';

import React, { useState, useEffect } from 'react';
import { ProductProps } from '@/lib/types';
import getProducts from '@/lib/queries/getProducts';
import Product from '@/components/Product';

const FeaturedProducts = ({ data }: { data?: any }) => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setFeaturedProducts(data?.filter((product) => product?.isfeatured === true));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-20 pb-20">
      <h2 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[40px] sm:leading-[48px] md:leading-[56px] text-[#515770] text-center font-[700]">
        {data?.featuredProductTitle}
      </h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, idx) => (
            <Product key={idx} product={product} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
