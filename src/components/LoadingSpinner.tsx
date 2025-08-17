interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  thickness?: "thin" | "normal" | "bold";
  label?: string;
  srText?: string;
  className?: string;
}

const SIZE_CLASS = {
  xs: "h-4 w-4",
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
};

const THICKNESS_CLASS = {
  thin: "border-2",
  normal: "border-[3px]",
  bold: "border-4",
};

export default function LoadingSpinner({
  size = "md",
  thickness = "normal",
  label = "Loading",
  srText = "Loading",
  className = "",
}: LoadingSpinnerProps) {
  const spinnerClass = [
    "rounded-full animate-spin",
    SIZE_CLASS[size],
    THICKNESS_CLASS[thickness],
    "border-gray-500 border-t-transparent",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="flex min-h-48 items-center justify-center gap-2"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className={spinnerClass} />
      {label ? <span className="text-sm text-gray-600">{label}</span> : null}
      <span className="sr-only">{srText}</span>
    </div>
  );
}
