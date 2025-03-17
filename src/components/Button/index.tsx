'use client'

import React from "react"
import { twMerge } from "tailwind-merge"

const Button = ({
  text,
  onClick,
  width,
  height,
  outline,
  bg,
  disabled,
  className
}: {
  text?: string,
  onClick?: any,
  width?: number,
  height?: number,
  outline?: boolean,
  bg?: boolean,
  disabled?: boolean,
  className?: string
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        className,
        bg ? 'bg-[#F90] text-white' : '',
        outline ? 'shadow-[0_0_0_0.5px_#605770]' : '',
        'rounded-[24px] min-w-[136px] p-[8.589px] px-5 justify-center items-center gap-[2.863px] text-[20px] font-[400] leading-[28px] text-[#605770] transition-all duration-300',
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95' // Disabled state styles
      )}
    >
      {text}
    </button>
  )
}

export default Button
