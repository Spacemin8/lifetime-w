'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = ({ data }: { data?: any }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [])

  if (!isClient) return null;

  return (
    <div className="w-full flex justify-center mx-auto px-3 md:px-5 lg:px-7">
      <div className="flex flex-col md:flex-row w-full justify-between items-center mt-10 md:mt-0">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left min-w-[200px] md:mr-6">
          {data?.featuredImage ? (
            <Image
              src={data?.featuredImage?.node?.sourceUrl}
              alt="Hero Logo"
              width={232}
              height={32}
              className="w-full max-w-[400px] h-auto object-contain"
            />
          ) : (
            <div className="flex flex-col gap-3 text-[#605770]">
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold leading-tight">
                {data?.heroTitle}
              </h2>
              <h3 className="text-[18px] sm:text-[20px] font-normal leading-[28px]">
                {data?.heroSubtitle}
              </h3>
            </div>
          )}
        </div>

        <span className="text-[16px] font-[400] leading-[24px] text-[#2E3743] px-4 md:px-6 text-center md:text-left py-6">
          {data?.content}
        </span>

        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="flex justify-between md:justify-start md:flex-col gap-4 p-6 rounded-[8px] border-t md:border-l md:border-t-0 border-[#43536966] w-full max-w-[600px] py-4 md:py-16">
            {data?.hyperlinks?.map((item?: any, idx?: number) => (
              <Link
                href={item?.link}
                key={idx}
                className="text-[14px] font-[400] leading-[22px] underline text-[#5297DC] hover:text-[#417AB3] transition-colors duration-200"
              >
                {item?.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
