export function TitleXL({ children, className = "" }) {
  return (
    <h1 className={`text-[31.42px] font-bold text-secondary ${className}`}>
      {children}
    </h1>
  );
}

export function TitleLG({ children, className = "" }) {
  return (
    <h2 className={`text-[19.42px] font-bold text-secondary ${className}`}>
      {children}
    </h2>
  );
}

export function TitleMD({ children, className = "" }) {
  return (
    <h3 className={`text-[12px] font-bold text-secondary ${className}`}>
      {children}
    </h3>
  );
}

export function TitleSM({ children, className = "" }) {
  return (
    <h4 className={`text-[7.41px] font-bold text-secondary ${className}`}>
      {children}
    </h4>
  );
}

export function BodyText({ children, className = "" }) {
  return (
    <p className={`text-[12px] font-normal text-slate-600 ${className}`}>
      {children}
    </p>
  );
}
