const styles = {
  titleXL: "text-[32px] font-bold text-secondary",
  titleLG: "text-[20px] font-bold text-secondary",
  titleMD: "text-[14px] font-bold text-secondary",
  titleSM: "text-[12px] font-semibold text-secondary",
  body: "text-[14px] font-normal text-slate-600",
  caption: "text-[12px] font-normal text-slate-500",
};

export function Typography({ variant = "body", className = "", children }) {
  const Component =
    variant === "titleXL"
      ? "h1"
      : variant === "titleLG"
      ? "h2"
      : variant === "titleMD"
      ? "h3"
      : "p";

  return (
    <Component className={`${styles[variant]} ${className}`}>
      {children}
    </Component>
  );
}

// Named exports for convenience
export function TitleXL({ className = "", children }) {
  return (
    <Typography variant="titleXL" className={className}>
      {children}
    </Typography>
  );
}

export function TitleLG({ className = "", children }) {
  return (
    <Typography variant="titleLG" className={className}>
      {children}
    </Typography>
  );
}

export function TitleMD({ className = "", children }) {
  return (
    <Typography variant="titleMD" className={className}>
      {children}
    </Typography>
  );
}

export function TitleSM({ className = "", children }) {
  return (
    <Typography variant="titleSM" className={className}>
      {children}
    </Typography>
  );
}

export function BodyText({ className = "", children }) {
  return (
    <Typography variant="body" className={className}>
      {children}
    </Typography>
  );
}

export function Caption({ className = "", children }) {
  return (
    <Typography variant="caption" className={className}>
      {children}
    </Typography>
  );
}
