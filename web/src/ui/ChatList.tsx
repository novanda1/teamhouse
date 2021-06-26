import { Box, Flex } from "@chakra-ui/react";
import { dolma } from "dolma";
import React from "react";
import { Emote } from "../modules/chat/Emote";
import { customEmojis, EmoteKeys } from "../modules/chat/EmoteData";
import { useChatTeamStore } from "../modules/chat/team/useChatTeamStore";
import { ParseTextToTwemoji } from "./Twemoji";
import normalizeUrl from "normalize-url";

export const ChatList: React.FC = () => {
  const { messages } = useChatTeamStore();

  return (
    <Box mt="auto">
      {messages.map((c, i) => {
        const text = c.tokens;

        console.log(`dolma.decode(text)`, JSON.stringify(dolma.decode(text)));

        return (
          <Flex key={i}>
            <Box display="inline" pr="2" color={c.color}>
              {c.username}
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
