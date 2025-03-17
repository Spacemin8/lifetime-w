'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = React.memo(({ data }: { data?: any }) => {
  const hyperlinks = useMemo(() => data?.hyperlinks || [], [data?.hyperlinks]);

  return (
    <div className="w-full flex justify-center mx-auto px-3 md:px-5 lg:px-7">
      <div className="flex flex-col md:flex-row w-full justify-between items-center mt-10 md:mt-0">

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left min-w-[200px] md:mr-6">
          {data?.featuredImage?.node?.sourceUrl ? (
            <Image
              key={data.featuredImage.node.sourceUrl}
              src={data.featuredImage.node.sourceUrl}
              alt="Hero Logo"
              width={400}
              height={80}
              className="w-full max-w-[400px] h-auto object-contain"
              priority
              loading="eager"
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

        {data?.content && (
          <span className="text-[16px] font-[400] leading-[24px] text-[#2E3743] px-4 md:px-6 text-center md:text-left py-6">
            {data.content}
          </span>
        )}

        {hyperlinks.length > 0 && (
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="flex justify-between md:justify-start md:flex-col gap-4 p-6 rounded-[8px] border-t md:border-l md:border-t-0 border-[#43536966] w-full max-w-[600px] py-4 md:py-16">
              {hyperlinks.map((item?: any, idx?: number) => (
                <Link
                  href={item.link}
                  key={idx}
                  className="text-[14px] font-[400] leading-[22px] underline text-[#5297DC] hover:text-[#417AB3] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;
