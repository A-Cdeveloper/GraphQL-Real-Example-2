import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console (in production, you'd send to monitoring service)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Default error fallback component
const ErrorFallback = ({ error }: { error?: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full text-center">
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-red-500 mb-4">⚠️</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Please try refreshing
          the page.
        </p>
        {import.meta.env.DEV && error && (
          <details className="text-left bg-gray-100 p-4 rounded-lg mb-6">
            <summary className="cursor-pointer font-semibold text-gray-700">
              Error Details (Development)
            </summary>
            <pre className="mt-2 text-sm text-danger whitespace-pre-wrap">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </div>

      <button
        onClick={() => window.location.reload()}
        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/80 transition-colors duration-200"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

export default ErrorBoundary;
