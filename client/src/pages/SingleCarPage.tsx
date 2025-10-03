import SingleCarDetail from "@/features/cars/components/SingleCarDetail";
import ErrorBoundary from "@/components/ErrorBoundary";

const SingleCarPage = () => {
  return (
    <ErrorBoundary>
      <h1 className="text-2xl font-bold">
        <SingleCarDetail />
      </h1>
    </ErrorBoundary>
  );
};

export default SingleCarPage;
