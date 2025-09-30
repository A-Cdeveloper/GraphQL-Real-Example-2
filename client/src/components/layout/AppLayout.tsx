import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="bg-background h-screen w-screen">
      <div className="container mx-auto max-w-xl bg-white p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
