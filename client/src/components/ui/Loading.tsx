interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Loading = ({ size = "md", className = "" }: LoadingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-primary rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loading;
