import { createWithApollo } from "./createWithApollo";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { isServer } from "./isServer";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    ssrMode: isServer,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL as string,
      credentials: "include",
      headers: {
        cookie:
          (typeof window === "undefined"
            ? ctx?.req?.headers.cookie
            : "web") || "not",
      },
    }),
    cache: new InMemoryCache({}),
  });

export const withApollo = createWithApollo(createClient);
