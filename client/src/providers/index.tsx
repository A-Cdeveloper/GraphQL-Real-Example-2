import { RouterProvider } from "react-router";
import { router } from "./router/routerConfig";
import ApolloClientProvider from "./apollo-client";

export const Providers = () => {
  return (
    <ApolloClientProvider>
      <RouterProvider router={router} />
    </ApolloClientProvider>
  );
};
