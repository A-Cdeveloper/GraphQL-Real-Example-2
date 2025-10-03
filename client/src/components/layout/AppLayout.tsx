import { Outlet } from "react-router";

import Footer from "./footer/Footer";
import Header from "./header/Header";

const AppLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto p-4 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
