import Button from "@/components/ui/Button";
import { routes } from "@/providers/router/routes";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 select-none">404</h1>
          <div className="relative -mt-4">
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-lg">
            Sorry, the page you're looking for doesn't exist or has been
            removed.
          </p>
        </div>

        {/* Car Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate(routes.home)}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
