import { createWithApollo } from "./createWithApollo";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { isServer } from "./isServer";
import { useTokenStore } from "../modules/auth/useTokenStore";

const createClient = (ctx: NextPageContext) =>{
  const store= useTokenStore()
  return new ApolloClient({
    ssrMode: isServer,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL as string,
      credentials: "include",
      headers: {
        authorization:  `Bearer ${store.accessToken}`,
        cookie:
          (typeof window === "undefined"
            ? ctx?.req?.headers.cookie
            : "") || "",
      },
    }),
    cache: new InMemoryCache({}),
  });
}

export const withApollo = createWithApollo(createClient);
