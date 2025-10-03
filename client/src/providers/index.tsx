import { RouterProvider } from "react-router";
import { router } from "./router/routerConfig";
import ApolloClientProvider from "./apollo-client";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

export const Providers = () => {
  return (
    <ApolloClientProvider>
      <NuqsAdapter>
        <RouterProvider router={router} />
      </NuqsAdapter>
    </ApolloClientProvider>
  );
};
