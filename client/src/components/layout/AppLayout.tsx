import { Outlet } from "react-router";

import Footer from "./footer/Footer";
import Header from "./header/Header";
import ErrorBoundary from "../ErrorBoundary";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4 lg:px-8">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
