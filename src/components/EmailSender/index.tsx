'use client';

import React, { useState } from "react";
import Button from "../Button";
import toast from "react-hot-toast";

const CONVERTKIT_API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY; // Replace with actual key
const FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID;

const EmailSender = ({ data }: { data?: any }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!inputValue) return;

    if (!validateEmail(inputValue)) {
      toast.error("Invalid email format. Please enter a valid email. ❌", { duration: 3000 });
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email: inputValue,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("success");
        setInputValue("");
        toast.success("Subscription successful! 🎉", { duration: 3000 }); // Show success Snackbar
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Subscription failed:", error);
      setStatus("error");
      toast.error("Subscription failed. Please try again. ❌", { duration: 3000 }); // Show error Snackbar
    }
  };

  return (
    <div className="w-full flex justify-center pt-16 px-4 md:pt-24">
      <div className="flex flex-col justify-center items-center text-center max-w-[802px] gap-6 md:gap-8">
        <span className="text-[18px] md:text-[20px] leading-[26px] md:leading-[28px] text-[#605770] font-[700]">
          {data?.emailTitle}
        </span>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
          <div className="relative flex items-center w-full sm:max-w-[400px] shadow-[0_0_0_0.5px_#435369] rounded-[16px] px-4 py-2 transition-all duration-300 focus-within:shadow-[0_0_0_0.5px_#FDCA7D]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 18 15" fill="none" className="text-[#605770] text-[20px] mr-2">
              <path d="M15.2721 1.1615H2.80952C1.94916 1.1615 1.25169 1.9586 1.25169 2.94187V11.8437C1.25169 12.827 1.94916 13.6241 2.80952 13.6241H15.2721C16.1325 13.6241 16.8299 12.827 16.8299 11.8437V2.94187C16.8299 1.9586 16.1325 1.1615 15.2721 1.1615Z" stroke="#2E3743" strokeWidth="1.16837" strokeMiterlimit="10" strokeLinecap="round" />
              <path d="M1.25169 3.76083L7.78676 7.41949C8.44884 7.83788 9.29006 7.84678 9.95993 7.4373L16.8299 3.76083" stroke="#2E3743" strokeWidth="1.16837" strokeMiterlimit="10" strokeLinecap="round" />
            </svg>

            {isFocused && (
              <span className="text-[14px] md:text-[16px] transition-opacity duration-300 opacity-100 text-[#605770]">
                {data?.emailTypingPlaceholder}
              </span>
            )}

            <input
              type="email"
              className={`flex-1 outline-none text-[14px] md:text-[16px] font-[400] text-[#605770] bg-transparent transition-all duration-300 placeholder-[#435369] ${isFocused ? "pl-1" : ""}`}
              value={inputValue}
              placeholder={data?.emailPlaceholder}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{
                caretColor: isFocused ? "#FDCA7D" : "initial",
              }}
            />
          </div>

          {/* Subscribe Button */}
          <Button
            text={
              status === "loading" ? (
                <div className="flex items-center gap-2">
                  <span>Subscribing...</span>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                </div>
              ) : (
                data?.subscribe
              )
            }
            bg
            className="!text-[#37393A] !px-6 sm:!px-7 md:!px-[27.45px] !py-2 sm:!py-[9px] md:!py-[11px] !leading-[28px] sm:!leading-[30px] md:!leading-[33px] !text-[18px] sm:!text-[20px] md:!text-[24px] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={handleSubmit}
            disabled={status === "loading"}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailSender;
