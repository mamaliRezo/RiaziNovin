// ErrorBox.jsx — پیام خطای شناور بالای صفحه
import { X } from "lucide-react";

export default function ErrorBox({ message, onClose }) {
  return (
    <div
      dir="rtl"
      role="alert"
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[380px] flex items-center gap-2 px-4 py-3 rounded-[16px] z-50"
      style={{
        background: "#C72C41",
        boxShadow: "0 10px 24px rgba(199,44,65,0.35)",
      }}
    >
      <span className="flex-1 text-right text-[13px] leading-relaxed text-white">
        {message}
      </span>

      <button
        onClick={onClose}
        className="flex-shrink-0 rounded-full p-1 text-white transition-colors"
        style={{ background: "rgba(0,0,0,0.2)", border: "none" }}
        aria-label="بستن اعلان"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
