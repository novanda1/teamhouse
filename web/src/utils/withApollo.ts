import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { NextPageContext } from "next";
import { useGetTokenFromUrl } from "../hooks/useGetTokenFromUrl";
import { ITokenStore, useTokenStore } from "../modules/auth/useTokenStore";
import { createWithApollo } from "./createWithApollo";
import { isServer } from "./isServer";

const createClient = (ctx: NextPageContext) => {
  const token =
    useGetTokenFromUrl() || useTokenStore((s: ITokenStore) => s.accessToken);

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: process.env.NEXT_PUBLIC_API_URL_WS,
        options: {
          reconnect: true,
          connectionParams: {
            authToken: token,
          },
        },
      })
    : null;

  const splitLink = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink as any,
        httpLink
      )
    : httpLink;

  return new ApolloClient({
    ssrMode: isServer,
    link: splitLink,
    cache: new InMemoryCache({}),
  });
};

export const withApollo = createWithApollo(createClient);
