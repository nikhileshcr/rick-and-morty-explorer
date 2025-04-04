"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme/theme";
import { UserDataProvider } from "@/context/user-data";
const createClient = () => {
  return new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
    ssrMode: typeof window === "undefined", // Enable SSR mode
  });
};

const client = createClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider value={system}>
        <UserDataProvider>{children}</UserDataProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
