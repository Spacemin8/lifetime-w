'use client';

import React, { useEffect, useState } from "react";
import getCategories from "@/lib/queries/getCategories";
import getBrands from "@/lib/queries/getBrands";
import Link from "next/link";

const CategoriesAndBrands = ({ data }: { data?: any }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          getCategories(),
          getBrands(),
        ]);

        if (Array.isArray(categoriesData)) setCategories(categoriesData);
        if (Array.isArray(brandsData)) setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center w-full py-10">
      <div className="flex flex-col gap-10 font-[700] w-full justify-center items-center">
        <h2 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[42px] sm:leading-[48px] md:leading-[56px] text-[#37393A] text-center">
          {data?.categoriesBrandsTitle}
        </h2>

        <div className="flex flex-col md:flex-row w-full justify-between gap-8 md:gap-[100px]">

          <div className="flex flex-col text-[#605770] w-full md:w-1/2">
            <span className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] uppercase border-b border-[#435369] w-full text-center p-3 sm:p-4">
              {data?.categoryTitle}
            </span>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
              {loading
                ? Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 bg-[#FAFAFA] animate-pulse shadow-[0px_0.5px_0px_#435369]"
                  >
                    <div className="h-5 sm:h-6 bg-gray-300 rounded-md w-full mx-auto"></div>
                  </div>
                ))
                : categories?.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 shadow-[0px_0.5px_0px_#435369] bg-[#FAFAFA]"
                  >
                    <Link
                      href={"/category"}
                      className="text-[13px] sm:text-[14px] font-[400] leading-[20px] sm:leading-[22px] underline text-[#5297DC]"
                    >
                      {item?.name}
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col text-[#605770] w-full md:w-1/2">
            <span className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] uppercase border-b border-[#435369] w-full text-center p-3 sm:p-4">
              {data?.brandTitle}
            </span>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
              {loading
                ? Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 bg-[#FAFAFA] animate-pulse shadow-[0px_0.5px_0px_#435369]"
                  >
                    <div className="h-5 sm:h-6 bg-gray-300 rounded-md w-full mx-auto"></div>
                  </div>
                ))
                : brands?.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 shadow-[0px_0.5px_0px_#435369] bg-[#FAFAFA]"
                  >
                    <Link
                      href={"/brand"}
                      className="text-[13px] sm:text-[14px] font-[400] leading-[20px] sm:leading-[22px] underline text-[#5297DC]"
                    >
                      {item?.name}
                    </Link>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoriesAndBrands;
