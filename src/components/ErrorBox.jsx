// ErrorBox.jsx (نسخه نهایی)
import { XCircle, X } from 'lucide-react'; 

export default function ErrorBox({ message, onClose }) {
  return (
    <div 
      className="fixed top-[120px] left-[460px] -translate-x-1/2 h-[47px] w-[300px]  flex items-start p-4 rounded-[24px]
                 bg-white border border-red-500 shadow-xl z-50 animate-slideDown" 
      role="alert"
    style={{
          background: "#C72C41",
          border: "none",
        }}
    >
      
      {/* متن پیام در مرکز */}
      <span className="flex-1 text-right font-sans text-sm leading-relaxed tracking-tight"
      style={{

      }}
      >{message}</span>
      
      {/* دکمه بستن با آیکون X در سمت چپ (انتهای باکس) */}
      <button
        onClick={onClose}
        // ml-auto آن را به سمت چپ فشار می‌دهد.
        className="ml-auto mr-0 border-none text-red-500 hover:text-red-700 transition-colors duration-200 p-1 -m-1 rounded-full flex-shrink-0"
        style={{background: "#801336" }}
        aria-label="بستن اعلان"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}