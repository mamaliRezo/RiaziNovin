export default function Input({
  label,
  error,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[12px] font-medium text-secondary">
          {label}
        </label>
      )}

      <input
        disabled={disabled}
        className={`
          rounded-xl border px-3 py-2 text-[12px]
          transition
          focus:outline-none
          ${
            error
              ? "border-error focus:ring-2 focus:ring-error/30"
              : "border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/30"
          }
          ${
            disabled
              ? "bg-slate-100 cursor-not-allowed text-slate-400"
              : "bg-white"
          }
          ${className}
        `}
        {...props}
      />

      {error && <span className="text-[10px] text-error">{error}</span>}
    </div>
  );
}
