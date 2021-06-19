import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { useGetTokenFromUrl } from "../hooks/useGetTokenFromUrl";
import { ITokenStore, useTokenStore } from "../modules/auth/useTokenStore";
import { createWithApollo } from "./createWithApollo";
import { isServer } from "./isServer";

const createClient = (ctx: NextPageContext) => {
  const token =
    useGetTokenFromUrl() || useTokenStore((s: ITokenStore) => s.accessToken);

  return new ApolloClient({
    ssrMode: isServer,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL as string,
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache({}),
  });
};

export const withApollo = createWithApollo(createClient);
