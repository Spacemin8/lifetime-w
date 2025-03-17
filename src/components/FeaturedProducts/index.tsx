'use client';

import React, { useState, useEffect } from 'react';
import { ProductProps, ProductIdProps } from '@/lib/types';
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

        const ownProducts = data.ownProducts?.products?.map((product: any, index: number) => ({
          ...product,
          id: index
        })) || [];
        const productIds = data.products?.asin
          .map((product: any) => product?.productId)
          .filter((id): id is string => id !== undefined);

        let convertedProducts: ProductProps[] = [];

        if (productIds.length > 0) {
          const chunkArray = (arr: string[], size: number) => {
            const chunks = [];
            for (let i = 0; i < arr.length; i += size) {
              chunks.push(arr.slice(i, i + size));
            }
            return chunks;
          };

          const chunks = chunkArray(productIds, 10);

          const controller = new AbortController();
          const { signal } = controller;

          const fetchProductData = chunks.map(chunk => {
            const queryParams = chunk.map(id => `productId=${id}`).join('&');
            return fetch(`/api/amazon?${queryParams}`, { signal })
              .then(res => res.json())
              .catch(err => {
                if (err.name !== 'AbortError') {
                  console.error("Error fetching chunk:", err);
                }
                return { products: [] };
              });
          });

          try {
            const allProducts = await Promise.all(fetchProductData);

            const apiProducts = allProducts.flatMap((item) => item.products || []);

            convertedProducts = apiProducts.map((product: any, idx: number) => {
              const asinProduct = data.products?.asin[idx] || {};
              return {
                id: idx + ownProducts.length,
                brand: product?.brand || "",
                category: product?.category || "",
                description: product?.features?.join("\n") || "",
                price: product?.price || "",
                title: product?.title || "",
                isfeatured: asinProduct.isfeatured ?? false,
                isrelated: asinProduct.isrelated ?? false,
                warranty: asinProduct.warranty || [],
                bigImage: {
                  node: {
                    sourceUrl: product?.image || "",
                  },
                },
                featuredImage: {
                  node: {
                    sourceUrl: product?.image || "",
                  },
                },
                previewImages: asinProduct.previewImages || { nodes: [] },
                detailsURL: product?.url || "",
              };
            });
          } catch (error) {
            console.error("Error fetching products from Amazon:", error);
          }
        }
        const combinedProducts = [...ownProducts, ...convertedProducts];
        setFeaturedProducts(combinedProducts?.filter((product) => product?.isfeatured === true));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col gap-20 pb-20">
      <h2 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[40px] sm:leading-[48px] md:leading-[56px] text-[#515770] text-center font-[700]">
        {data?.featuredProductTitle}
      </h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
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
            ))
            : featuredProducts.map((product, idx) => (
              <div key={idx} className="flex justify-center">
                <Product product={product} index={product?.id || 0} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
