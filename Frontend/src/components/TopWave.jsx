import React from "react";
import Calculator from "../assets/Calculator.svg";

export default function TopWave() {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 412 169"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C90BBC" />
            <stop offset="100%" stopColor="#63055D" />
          </linearGradient>
        </defs>

        <path
          d="
            M0 0 
            L412 0 
            L412 5.5 
            L412 58.7485 
            C315.192 54.1519 197.954 50.4807 109.683 64.6254 
            C39.2301 76.0662 15 110 0 124.236 
            L0 0 Z
          "
          fill="url(#paint0_linear)"
        />
      </svg>

      {/* آیکون ماشین حساب کوچکتر و بالاتر */}
      <img
        src={Calculator}
        alt="Calculator"
        className="absolute top-3 left-0 w-[120px] h-[122px]"
      />
    </div>
  );
}
