import { forwardRef } from "react";

type SelectProps = {
  placeholder?: string;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { placeholder, error, size = "md", children, className = "", ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };

    return (
      <select
        ref={ref}
        className={`
          w-full border rounded-md transition-colors
          ${sizeClasses[size]}
          ${
            error
              ? "border-danger focus:border-danger focus:ring-danger"
              : "border-border focus:border-gray-400 focus:ring-gray-200"
          }
          focus:outline-none focus:ring-2 focus:ring-opacity-20
          bg-white text-gray-900
          ${className}
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;
