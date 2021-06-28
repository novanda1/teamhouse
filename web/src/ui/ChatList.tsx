import { Box, Flex } from "@chakra-ui/react";
import normalizeUrl from "normalize-url";
import React, { memo, useEffect, useState } from "react";
import { useGetUserQuery } from "../generated/graphql";
import { Emote } from "../modules/chat/Emote";
import { EmoteKeys } from "../modules/chat/EmoteData";
import {
  TeamChatMessage,
  useChatTeamStore,
} from "../modules/chat/team/useChatTeamStore";
import { ParseTextToTwemoji } from "./Twemoji";

export const ChatList: React.FC<{ messages: TeamChatMessage[] }> = ({
  messages,
}) => {
  const getUser = (userId: string) =>
    useGetUserQuery({
      skip: !userId,
      variables: { userId },
    });

  return (
    <Box mt="auto">
      {messages.map((c, i) => {
        const text = c.tokens;

        return (
          <Flex key={i}>
            <Box display="inline" pr="2" color={c.color}>
              {getUser(c.userId)}
            </Box>
            {c.tokens.map(({ t, v }, i) => {
              switch (t) {
                case "text":
                  return <React.Fragment key={i}>{`${v} `}</React.Fragment>;
                case "emote":
                  return <Emote emote={v as EmoteKeys} key={i} />;

                case "link":
                  try {
                    return (
                      <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href={v}
                        className={`inline flex-1 hover:underline text-accent`}
                        key={i}
                      >
                        {normalizeUrl(v, { stripProtocol: true })}
                        {""}
                      </a>
                    );
                  } catch {
                    return null;
                  }
                case "block":
                  return (
                    <React.Fragment key={i}>
                      <span
                        className={
                          "inline bg-primary-600 px-1 rounded whitespace-pre-wrap font-mono"
                        }
                      >
                        {v}
                      </span>
                      {""}
                    </React.Fragment>
                  );
                case "emoji":
                  return (
                    <>
                      <ParseTextToTwemoji text={v}></ParseTextToTwemoji>
                    </>
                  );
                default:
                  return null;
              }
            })}
          </Flex>
        );
      })}
    </Box>
  );
};
