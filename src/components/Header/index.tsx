'use client';

import { HeaderProps } from '@/lib/types';
import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MenuItem from '../MenuItem';
import Image from 'next/image';
import Button from '../Button';
import { motion, AnimatePresence } from 'framer-motion';

const MenuIcon = ({ active }: { active?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 6h18M3 12h18M3 18h18"
      stroke={active ? "#FF9900" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Header: FC<HeaderProps> = ({ menu }) => {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveMenu(pathname);
  }, [pathname]);

  return (
    <header className="flex items-center w-full py-3 bg-[#f9f9f9] shadow-lg mx-auto px-6 lg:px-10">
      <div className="flex items-center w-full justify-between gap-5">
        <button
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <nav className="hidden lg:flex justify-center gap-6 min-w-[32%]">
          {[
            { title: menu?.headerSetting?.menuTitle1, url: menu?.headerSetting?.menuUrl1 },
            { title: menu?.headerSetting?.menuTitle2, url: menu?.headerSetting?.menuUrl2 },
            { title: menu?.headerSetting?.menuTitle3, url: menu?.headerSetting?.menuUrl3 },
          ].map((item, index) => (
            <MenuItem
              key={index}
              icon={<MenuIcon active={activeMenu === item.url} />}
              text={item.title}
              href={item.url}
              active={activeMenu === item.url}
              onClick={() => setActiveMenu(item.url ?? '')}
            />
          ))}
        </nav>

        <Image
          src={menu?.headerSetting?.logo?.node?.sourceUrl ?? ''}
          alt="Header Logo"
          width={160}
          height={36}
          className="w-[160px] h-[36px] object-contain"
        />

        <div className="hidden lg:flex gap-6 min-w-[32%] justify-end text-[#605770]">
          <Button outline text={menu?.headerSetting?.navTitle1} />
          <Button bg text={menu?.headerSetting?.navTitle2} />
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-white shadow-md z-50 lg:hidden"
          >
            <nav className="flex flex-col gap-4 p-4">
              {[
                { title: menu?.headerSetting?.menuTitle1, url: menu?.headerSetting?.menuUrl1 },
                { title: menu?.headerSetting?.menuTitle2, url: menu?.headerSetting?.menuUrl2 },
                { title: menu?.headerSetting?.menuTitle3, url: menu?.headerSetting?.menuUrl3 },
              ].map((item, index) => (
                <MenuItem
                  key={index}
                  text={item.title}
                  href={item.url}
                  active={activeMenu === item.url}
                  onClick={() => {
                    setActiveMenu(item.url ?? '');
                    setIsMobileMenuOpen(false);
                  }}
                />
              ))}

              <Button outline text={menu?.headerSetting?.navTitle1} className="w-full" />
              <Button bg text={menu?.headerSetting?.navTitle2} className="w-full" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
