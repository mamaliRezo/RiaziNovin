export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-[12px] font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/30";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    outline: "border border-primary text-primary hover:bg-primary/10",
    ghost: "text-primary hover:bg-primary/10",
    disabled: "bg-slate-200 text-slate-400 cursor-not-allowed",
  };

  return (
    <button
      disabled={disabled}
      className={`${base} ${
        disabled ? variants.disabled : variants[variant]
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
