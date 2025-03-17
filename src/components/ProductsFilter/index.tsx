'use client';

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getProducts from "@/lib/queries/getProducts";
import getCategories from "@/lib/queries/getCategories";
import getBrands from "@/lib/queries/getBrands";
import { ProductProps, CategoryProps, BrandProps, ProductIdProps } from "../../lib/types";
import Product from "../Product";
import getAAWP from "@/lib/queries/getAAWP";


const filterCache = new Map();
const categoryCache = new Map();
const brandCache = new Map();

const ProductsFilter = ({ data }: { data?: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [brands, setBrands] = useState<BrandProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loadingFilters, setLoadingFilters] = useState(true);

  const initialFilters = useMemo(() => ({
    category: searchParams.get("category")?.split(",").filter(Boolean) || [],
    brand: searchParams.get("brand")?.split(",").filter(Boolean) || [],
    warranty: searchParams.get("warranty") || "",
  }), [searchParams]);

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  const cacheKey = useMemo(() => {
    return `products-${selectedFilters.category.join(',')}-${selectedFilters.brand.join(',')}-${selectedFilters.warranty}`;
  }, [selectedFilters]);

  const filterProducts = useCallback((products: ProductProps[]) => {
    return products.filter((product: ProductProps) => {
      const categoryMatch = selectedFilters.category.length === 0 ||
        selectedFilters.category.includes(product.category || '');
      const brandMatch = selectedFilters.brand.length === 0 ||
        selectedFilters.brand.includes(product.brand || '');
      const warrantyMatch = !selectedFilters.warranty ||
        (product?.warranty?.[1] ?? "") === selectedFilters.warranty;
      return categoryMatch && brandMatch && warrantyMatch;
    });
  }, [selectedFilters]);

  const memoizedCategories = useMemo(() => categories, [categories]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (categories.length > 0 || brands.length > 0) {
          setLoadingFilters(false);
          return;
        }
        setLoadingFilters(true);

        if (categoryCache.has("categories") && brandCache.has("brands")) {
          setCategories(categoryCache.get("categories"));
          setBrands(brandCache.get("brands"));
          setLoadingFilters(false);
          return;
        }

        const [fetchedCategories, fetchedBrands] = await Promise.all([
          getCategories(),
          getBrands()
        ]);

        categoryCache.set("categories", fetchedCategories);
        brandCache.set("brands", fetchedBrands);

        setCategories(fetchedCategories);
        setBrands(fetchedBrands);
      } catch (err) {
        console.error("Error fetching filter data:", err);
      } finally {
        setLoadingFilters(false);
      }
    };

    fetchInitialData();
  }, [categoryCache, brandCache, memoizedCategories]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filterCache.has(cacheKey)) {
          setProducts(filterCache.get(cacheKey));
          setLoading(false);
          return;
        }

        setLoading(true);

        if (allProducts.length > 0) {
          const filtered = filterProducts(allProducts);
          setProducts(filtered);
          filterCache.set(cacheKey, filtered);
          setLoading(false);
          return;
        }

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

        setAllProducts(combinedProducts);
        setProducts(filterProducts(combinedProducts));

      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [cacheKey, filterProducts, allProducts]);

  const handleFilterChange = useCallback((filterType: "category" | "brand" | "warranty", value: string) => {
    setSelectedFilters((prev) => {
      let updatedFilters;

      if (filterType === "warranty") {
        updatedFilters = { ...prev, [filterType]: prev.warranty === value ? "" : value };
      } else {
        const currentValues = new Set(prev[filterType]);
        if (currentValues.has(value)) {
          currentValues.delete(value);
        } else {
          currentValues.add(value);
        }
        updatedFilters = { ...prev, [filterType]: Array.from(currentValues) };
      }

      return updatedFilters;
    });
  }, []);

  useEffect(() => {
    const queryString = new URLSearchParams();
    if (selectedFilters.category.length) queryString.set("category", selectedFilters.category.join(","));
    if (selectedFilters.brand.length) queryString.set("brand", selectedFilters.brand.join(","));
    if (selectedFilters.warranty) queryString.set("warranty", selectedFilters.warranty);

    router.push(`?${queryString.toString()}`, { scroll: false });
  }, [selectedFilters, router]);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 pb-32">
      <button
        className="lg:hidden bg-[#605770] text-white px-4 py-2 rounded-md mb-4"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        {isFilterOpen ? "Close Filters" : "Open Filters"}
      </button>

      <aside className={`lg:w-1/5 rounded-md ${isFilterOpen ? "block" : "hidden"} lg:block`}>
        <div className="flex flex-col bg-[#F3F3F3] rounded-md p-4 px-6">
          <h3 className="text-[20px] font-[700] pb-6 text-[#605770] border-b border-white">Filters</h3>

          <div className="space-y-2">
            {data?.productsFilter[0] !== 'category' ? (
              <>
                <h4 className="text-[16px] font-[700] pb-4 pt-8 text-[#605770]">Brand</h4>
                {loadingFilters ? (
                  Array.from({ length: 8 }).map((_, idx) => (
                    <div key={idx} className="h-6 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
                  ))
                ) : (brands.map((brand) => (
                  <label key={brand.name} className="flex items-center gap-2 text-[14px] text-[#605770]">
                    <input
                      type="checkbox"
                      className="accent-[#605770] border-gray-400 rounded-md"
                      checked={selectedFilters.brand.includes(brand.name || '')}
                      onChange={() => handleFilterChange("brand", brand.name || "")}
                    />
                    {brand.name}
                  </label>
                )))}
              </>
            ) : (
              <>
                <h4 className="text-[16px] font-[700] pb-4 pt-8 text-[#605770]">Category</h4>
                {loadingFilters ? (
                  Array.from({ length: 8 }).map((_, idx) => (
                    <div key={idx} className="h-6 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
                  ))
                ) : (
                  categories.map((category) => (
                    <label key={category.name} className="flex items-center gap-2 text-[14px] text-[#605770]">
                      <input
                        type="checkbox"
                        className="accent-[#605770] border-gray-400 rounded-md"
                        checked={selectedFilters.category.includes(category.name || '')}
                        onChange={() => handleFilterChange("category", category.name || "")}
                      />
                      {category.name}
                    </label>
                  ))
                )}
              </>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-[16px] font-[700] py-6 pt-8 text-[#605770]">Warranty</h4>
            {loadingFilters ? (
              Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="h-6 w-1/2 bg-gray-300 animate-pulse rounded-md"></div>
              ))
            ) : (
              ["Unconditional", "Limited"].map((warranty) => (
                <label key={warranty} className="flex items-center gap-2 text-[14px] text-[#605770]">
                  <input
                    type="checkbox"
                    className="accent-[#605770] border-gray-400 rounded-md"
                    checked={selectedFilters.warranty === warranty}
                    onChange={() => handleFilterChange("warranty", warranty)}
                  />
                  {warranty}
                </label>
              ))
            )}
          </div>
        </div>
      </aside>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="animate-pulse p-4 border border-[#2e374366] rounded-lg bg-white shadow-md">
              <div className="h-60 bg-gray-300 rounded-md"></div>
              <div className="h-24 bg-gray-300 mt-3 w-full rounded-md"></div>
              <div className="h-8 bg-gray-300 mt-2 w-1/2 rounded-md"></div>
              <div className="h-8 bg-gray-300 mt-2 w-1/3 rounded-md"></div>
              <div className="h-8 bg-gray-300 mt-4 w-full rounded-md"></div>
            </div>
          ))
          :
          products.length !== 0 ? (
            products.map((product, idx) => (
              <div key={idx} className="w-full">
                <Product product={product} index={idx} />
              </div>
            ))
          ) : (
            <span className="text-[#2E3743] p-2">No products found.</span>
          )
        }
      </div>
    </div>
  );
};

export default ProductsFilter;