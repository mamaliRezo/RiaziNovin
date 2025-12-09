import { useState, useEffect } from "react";
import Slide1 from "../assets/Slide1.svg";
import Slide2 from "../assets/Slide2.svg";
import Slide3 from "../assets/Slide3.svg";
import Slide4 from "../assets/Slide4.svg";

export default function SliderBox({ onClick, style }) {
  const slides = [Slide1, Slide2, Slide3, Slide4];
  const [currentIndex, setCurrentIndex] = useState(0);

  // تعویض خودکار اسلاید
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onClick} // کلیک برای رفتن به ویدیو
      style={{
        width: "348px",
        height: "128px",
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        ...style,
      }}
    >
      <img
        src={slides[currentIndex]}
        alt={`slide-${currentIndex}`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* نقاط پایین */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: i === currentIndex ? "#080609" : "#080609A3",
            }}
          />
        ))}
      </div>
    </div>
  );
}
