interface ErrorMessageProps {
  error: Error | string;
  title?: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage = ({
  error,
  title = "Something went wrong",
  onRetry,
  className = "",
}: ErrorMessageProps) => {
  const errorMessage = typeof error === "string" ? error : error.message;

  return (
    <div className={`text-center py-8 ${className}`}>
      {/* Error Icon */}
      <div className="mb-4">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-danger"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
      </div>

      {/* Error Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      {/* Error Message */}
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{errorMessage}</p>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/80 transition-colors duration-200"
        >
          Try Again
        </button>
      )}

      {/* Development Error Details */}
      {import.meta.env.DEV && typeof error === "object" && error.stack && (
        <details className="mt-6 text-left bg-gray-100 p-4 rounded-lg max-w-2xl mx-auto">
          <summary className="cursor-pointer font-semibold text-gray-700">
            Error Details (Development)
          </summary>
          <pre className="mt-2 text-sm text-danger whitespace-pre-wrap">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
};

export default ErrorMessage;
