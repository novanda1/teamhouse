import { Box, Flex, IconButton, Input } from "@chakra-ui/react";
import { dolma } from "dolma";
import React, { useRef } from "react";
import { FaRegSmile } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useAddChatMutation, useMeQuery } from "../generated/graphql";
import { useGetId } from "../hooks/useGetId";
import { customEmojis } from "../modules/chat/EmoteData";
import { navigateThroughQueriedEmojis } from "../modules/chat/navigateThroughQueriedEmojis";
import { useChatTeamStore } from "../modules/chat/team/useChatTeamStore";
import { useEmojiPickerStore } from "../modules/chat/useEmojiPickerStore";
import { generateColorFromString } from "../utils/generateColorFromString";
import { EmojiPicker } from "./EmojiPicker";

export const ChatForm: React.FC = () => {
  const { open, setOpen, queryMatches } = useEmojiPickerStore();
  const { message, setMessage } = useChatTeamStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const teamId = useGetId();

  const me = useMeQuery();

  const [addMessage] = useAddChatMutation({
    update: (cache) => {
      cache.evict({ fieldName: "getChatTeam", args: { teamId } });
      cache.gc();
    },
  });

  const handleSend = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current.value.length !== 0) {
      const tokens = dolma.encode(inputRef.current.value);
      const { __typename, ...user } = me?.data.me;
      const message = {
        _id: uuidv4(),
        color: generateColorFromString(me?.data.me._id),
        tokens,
        userId: me.data?.me?._id,
        user,
      };

      addMessage({
        variables: {
          teamId,
          message,
        },
      });

      setMessage("");
    }
  };

  let position = 0;

  return (
    <Flex mt="7" position="relative">
      <EmojiPicker
        emojiSet={customEmojis as any}
        onEmojiSelect={(emoji) => {
          position =
            (position === 0
              ? inputRef!.current!.selectionStart
              : position + 2) || 0;

          const newMsg = [
            message.slice(0, position),
            (message.endsWith(" ") ? "" : " ") +
              (`:${emoji.short_names[0]}:` || "") +
              " ",
            message.slice(position),
          ].join("");
          setMessage(newMsg);
        }}
      />

      <Box position="absolute">
        <IconButton
          onClick={() => {
            setOpen(!open);
          }}
          maxWidth="15%"
          overflow="hidden"
          display="flex"
          variant="unstyled"
          aria-label="open emoji picker"
          zIndex="1"
          _focus={{ outline: "none" }}
        >
          <FaRegSmile style={{ width: "50%", height: "50%" }} />
        </IconButton>
      </Box>
      <Input
        pl="10"
        type="text"
        placeholder="Type a message"
        rounded="lg"
        variant="filled"
        onKeyUp={handleSend}
        onKeyDown={
          queryMatches.length ? navigateThroughQueriedEmojis : () => {}
        }
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        ref={inputRef}
      />
    </Flex>
  );
};
