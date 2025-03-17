'use client';

import React, { useState, useEffect } from "react";
import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { FooterProps } from "@/lib/types";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { FaXTwitter, FaLinkedin, FaFacebook } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";

const Footer: FC<FooterProps> = ({ menu }) => {
  const footer = menu?.footerSettings;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [])

  if (!isClient) {
    return (
      <footer className="flex flex-col items-center border-t border-[#F90] text-[#605770] text-sm py-6 px-4 md:px-8 lg:px-16 gap-6">
        <div className="w-full flex justify-center">
          <div className="w-[180px] h-[40px] bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:flex justify-center gap-8 md:gap-32 text-[16px] text-center sm:text-left">
          <div className="flex flex-col gap-4">
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mx-auto sm:mx-0"></div>
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mx-auto sm:mx-0"></div>
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mx-auto sm:mx-0"></div>
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mx-auto sm:mx-0"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mx-auto sm:mx-0"></div>
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mx-auto sm:mx-0"></div>
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mx-auto sm:mx-0"></div>
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mx-auto sm:mx-0"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="flex flex-col items-center border-t border-[#F90] text-[#605770] text-sm py-6 px-4 md:px-8 lg:px-16 gap-6">
      {footer?.logo?.node?.sourceUrl && (
        <div className="w-full flex justify-center">
          <Image
            src={footer.logo.node.sourceUrl}
            alt="Footer Logo"
            width={228}
            height={49}
            className="w-[180px] md:w-[200px] lg:w-[228px] object-contain"
          />
        </div>
      )}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:flex justify-center gap-8 md:gap-32 text-[16px] text-center sm:text-left">
        <div className="flex flex-col gap-4">
          <span className="font-bold text-lg">Legal</span>
          <Link href={footer?.termsOfService || "/"} className="underline">
            Terms of service
          </Link>
          <Link href={footer?.privacyPolicy || "/"} className="underline">
            Privacy policy
          </Link>
          <Link href={footer?.cookiesPolicy || "/"} className="underline">
            Cookies policy
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-bold text-lg">Contact</span>
          <div className="flex justify-center sm:justify-start items-center gap-2">
            <FaPhone /> {footer?.phone}
          </div>
          <div className="flex justify-center sm:justify-start items-center gap-2">
            <BsWhatsapp /> {footer?.whatsapp}
          </div>
          <div className="flex justify-center sm:justify-start items-center gap-2">
            <FaEnvelope />
            <Link href={`mailto:${footer?.email}`} className="underline">
              {footer?.email}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-4 border-t border-[#6057701f] w-full max-w-[80%] mx-auto pt-4 justify-center">
        <Link href={footer?.twitter || "#"} target="_blank">
          <FaXTwitter className="text-[28px] transition-colors duration-300 hover:text-[#F90]" />
        </Link>
        <Link href={footer?.linkedin || "#"} target="_blank">
          <FaLinkedin className="text-[24px] transition-colors duration-300 hover:text-[#F90]" />
        </Link>
        <Link href={footer?.facebook || "#"} target="_blank">
          <FaFacebook className="text-[24px] transition-colors duration-300 hover:text-[#F90]" />
        </Link>
      </div>

      <div className="text-center text-xs">{footer?.copyright}</div>
    </footer>
  );
};

export default Footer;
