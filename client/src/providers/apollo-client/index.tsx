import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./apollo-client";

const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
