interface InlineErrorMessageProps {
  error: Error | string;
  className?: string;
}

const InlineErrorMessage = ({
  error,
  className = "",
}: InlineErrorMessageProps) => {
  const errorMessage = typeof error === "string" ? error : error.message;

  return (
    <div
      className={`flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 ${className}`}
    >
      {/* Error Icon */}
      <svg
        className="w-5 h-5 text-red-500 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {/* Error Message */}
      <span className="text-sm font-medium">{errorMessage}</span>
    </div>
  );
};

export default InlineErrorMessage;
