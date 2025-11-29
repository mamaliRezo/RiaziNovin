import React from "react";

export default function BottomWave() {
  return (
    <div className="relative h-[200px] bg-gradient-to-br from-[#63055D] to-[#C90BBC] flex items-center justify-center overflow-visible">

      {/* موج سفید در بالا */}
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        className="absolute top-0 w-full h-[70px]"
      >
        <path
          d="M0,70 C480,-10 960,110 1440,20 L1440,0 L0,0 Z"
          fill="#fff"
        />
      </svg>
    </div>
  );
}