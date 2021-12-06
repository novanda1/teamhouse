import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { NextPageContext } from "next";
import { IAuthStore, useAuthStore } from "../modules/auth/useAuthStore";
import { useGetTokenFromUrl } from "../modules/auth/useGetTokenFromUrl";
import { createWithApollo } from "./createWithApollo";
import { isServer } from "./isServer";

const createClient = (ctx: NextPageContext) => {
  const token =
    useGetTokenFromUrl() || useAuthStore((s: IAuthStore) => s.accessToken);

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // const wsLink = process.browser
  //   ? new WebSocketLink({
  //       uri: process.env.NEXT_PUBLIC_API_URL_WS,
  //       options: {
  //         reconnect: true,
  //         connectionParams: {
  //           authToken: token,
  //         },
  //       },
  //     })
  //   : null;

  // const splitLink = process.browser
  //   ? split(
  //       ({ query }) => {
  //         const definition = getMainDefinition(query);
  //         return (
  //           definition.kind === "OperationDefinition" &&
  //           definition.operation === "subscription"
  //         );
  //       },
  //       wsLink as any,
  //       httpLink
  //     )
  //   : httpLink;

  return new ApolloClient({
    ssrMode: isServer,
    // link: splitLink,
    link: httpLink,
    cache: new InMemoryCache({}),
  });
};

export const withApollo = createWithApollo(createClient);
