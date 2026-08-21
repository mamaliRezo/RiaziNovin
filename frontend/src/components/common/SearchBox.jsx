export default function SearchBox({ style, value, onChange, onKeyDown, placeholder = "جستجو..." }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="search-box"
      style={{
        direction: "rtl",
        width: "348px",
        height: "36px",
        backgroundColor: "#FEF9FE",
        fontFamily: "BYekan",
        fontWeight: 400,
        fontSize: "12px",
        textAlign: "right",
        border: "1px solid #00C0D9",
        borderRadius: "9999px",
        padding: "0 12px",
        boxSizing: "border-box",
        outline: "none",
        transition: "all 0.2s ease",
        ...style, 
      }}
      onFocus={(e) => {
        e.currentTarget.style.border = "2px solid #00C0D9";
      }}
      onBlur={(e) => {
        e.currentTarget.style.border = "1px solid #00C0D9";
      }}
    />
  );
}
