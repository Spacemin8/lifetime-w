'use client'

import Link from "next/link"
import React from "react"
import { twMerge } from "tailwind-merge"

const MenuItem = ({ icon, text, href, active, onClick }: { icon?: any, text?: string, href?: string, active?: boolean, onClick?: () => void }) => {
  return (
    <div className="relative group">
      <Link
        href={href ?? '/'}
        className={twMerge(
          'flex items-center font-[16px] leading-[24px] p-4 h-16 gap-4 transition-all duration-300 rounded-md relative',
          active
            ? 'text-[#FF9900]'
            : 'text-[#2e3743]'
        )}
        onClick={onClick}
      >
        <span className="flex items-center gap-4 transition-all duration-300 group-hover:text-[#FF9900]">
          {icon}
          {text}
        </span>
      </Link>

      <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FF9900] transition-all duration-300 ease-in-out group-hover:w-full"></div>

      {active && (
        <div className="absolute left-0 bottom-0 w-full h-[2px] bg-[#FF9900] transition-all duration-500 ease-out"></div>
      )}
    </div>
  )
}

export default MenuItem;
