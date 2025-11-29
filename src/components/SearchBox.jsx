export default function SearchBox() {
  return (
    <input
      type="text"
      placeholder="جستجو..."
      className="absolute rounded-full text-center placeholder-[#C90BBCC9]"
      style={{
        width: "348px",
        height: "36px",
        top: "297px",
        left: "30px",
        backgroundColor: "#FEF9FE",
        fontFamily: "IRANYekan, Roboto, sans-serif",
        fontWeight: 400,
        fontSize: "12px",
        textAlign: "center",
        color: "#000000",  // رنگ متن تایپ کاربر
        border: "1px solid #00C0D9",
        borderRadius: "9999px",
        padding: "0 12px",
        boxSizing: "border-box",
        outline: "none",
        transition: "all 0.2s ease",
      }}
      onFocus={(e) => {
        e.currentTarget.style.border = "2px solid #00C0D9"; // رنگ فیگما و ضخیم‌تر
      }}
      onBlur={(e) => {
        e.currentTarget.style.border = "1px solid #00C0D9"; // بازگشت به حالت عادی
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );
}
