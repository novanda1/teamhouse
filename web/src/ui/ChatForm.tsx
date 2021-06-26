import { Box, Flex, IconButton, Input } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useContext } from "react";
import { FaRegSmile } from "react-icons/fa";
import { customEmojis } from "../modules/chat/EmoteData";
import { navigateThroughQueriedEmojis } from "../modules/chat/navigateThroughQueriedEmojis";
import {
  TeamChatMessage,
  useChatTeamStore,
} from "../modules/chat/team/useChatTeamStore";
import { useEmojiPickerStore } from "../modules/chat/useEmojiPickerStore";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";
import { EmojiPicker } from "./EmojiPicker";
import { dolma } from "dolma";
import { useMeQuery } from "../generated/graphql";

export const ChatForm: React.FC = () => {
  const {
    open,
    setOpen,
    queryMatches,
    setQueryMatches,
    keyboardHoveredEmoji,
    setKeyboardHoveredEmoji,
  } = useEmojiPickerStore();
  const { message, setMessage, messages } = useChatTeamStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const { conn, sendMessage } = useContext(WebSocketContext);
  const me = useMeQuery();
  const handleSend = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current.value.length !== 0) {
      const tokens = dolma.encode(inputRef.current.value);
      const message: TeamChatMessage = {
        color: "",
        tokens,
        userId: me.data?.me._id,
        username: me.data?.me.firstname,
      };
      await sendMessage(message);
      console.log(`messages`, messages);

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
      {/* <IconButton aria-label="send comment" rounded="lg" ml="2" /> */}
    </Flex>
  );
};
