import { Box, Flex } from "@chakra-ui/react";
import normalizeUrl from "normalize-url";
import React, { useEffect, useState } from "react";
import { Message, useGetUserQuery, User } from "../generated/graphql";
import { useGetId } from "../hooks/useGetId";
import { Emote } from "../modules/chat/Emote";
import { EmoteKeys } from "../modules/chat/EmoteData";
import { ParseTextToTwemoji } from "./Twemoji";

export const ChatList: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const teamId = useGetId();

  const [localMessages, setLocalMessages] = useState(messages);

  useEffect(() => {
    if (localMessages && localMessages !== messages) {
      setLocalMessages([...messages]);
    }
  }, [messages]);

  if (!localMessages) return <></>;

  return (
    <Box mt="auto">
      {localMessages &&
        localMessages.map((c, i) => {
          return (
            <Flex key={i}>
              <Box display="inline" pr="2" color={c.color}>
                {c.user?.firstname}
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
