import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  Observable,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { ApolloLink } from "@apollo/client";
import { getCookie } from "@/lib/cookies";
import { refreshTokenApi } from "@/features/auth/api/refreshToken";

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (!CombinedGraphQLErrors.is(error)) return;

  const isUnauth = error.errors.some(
    (e) => e.extensions?.code === "UNAUTHENTICATED"
  );
  if (!isUnauth) return;

  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) {
    window.location.href = "/login";
    return;
  }

  return new Observable((observer) => {
    refreshTokenApi(refreshToken)
      .then(async () => {
        // wait a moment to ensure new JWT cookie is written
        await new Promise((resolve) => setTimeout(resolve, 100));

        const subscription = forward(operation).subscribe({
          next: (value) => observer.next(value),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });

        return () => subscription.unsubscribe();
      })
      .catch(() => {
        observer.error(new Error("Refresh failed"));
        window.location.href = "/login";
      });
  });
});

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  // Timeout konfiguracija
  fetchOptions: {
    signal: AbortSignal.timeout(5000),
  },
  // Send cookies with requests for authentication
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});
