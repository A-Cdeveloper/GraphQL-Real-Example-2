import type { InputHTMLAttributes } from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  error?: string;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
};

const Input = ({
  error,
  placeholder,
  size = "md",
  className = "",
  type = "text",
  ...props
}: InputProps) => {
  const baseClasses =
    "w-full border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const stateClasses = error
    ? "border-danger focus:ring-danger"
    : "border-gray-300 focus:ring-gray-200 focus:border-gray-400";

  return (
    <div className="w-full">
      <input
        className={`${baseClasses} ${sizeClasses[size]} ${stateClasses} ${className}`}
        {...props}
        placeholder={placeholder}
        type={type}
      />

      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
};

export default Input;
