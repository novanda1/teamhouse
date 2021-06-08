import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import { isServer } from "./isServer";


export const getStandAloneApolloClient = (context: GetServerSidePropsContext | null): ApolloClient<NormalizedCacheObject> => {
  const cookie = context.req.headers.cookie
  if(cookie) { 
    const link = new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL as string,
      headers: {
        cookie
      
      },
      credentials: "include"
    })
    return  new ApolloClient({
      link,
      cache: new InMemoryCache(),
      ssrMode: isServer
    });
  }
}