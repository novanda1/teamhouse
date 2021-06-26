import { Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { CustomEmote } from "../modules/chat/EmoteData";
import { useChatTeamStore } from "../modules/chat/team/useChatTeamStore";
import { useEmojiPickerStore } from "../modules/chat/useEmojiPickerStore";

interface EmojiPickerProps {
  emojiSet: CustomEmote[];
  onEmojiSelect: (emoji: CustomEmote) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  emojiSet,
  onEmojiSelect,
}) => {
  const { message } = useChatTeamStore();
  const {
    open,
    setOpen,
    setQueryMatches,
    queryMatches,
    keyboardHoveredEmoji,
    setKeyboardHoveredEmoji,
    setQuery,
  } = useEmojiPickerStore();

  // Open picker on colon syntax
  useEffect(() => {
    // colon syntax regex
    const colonSyntaxMatches = message.match(/^(?!.*\bRT\b)(?:.+\s)?:\w+$/i);

    if (colonSyntaxMatches) {
      const emojiQueries = colonSyntaxMatches[0].split(" ");
      const query = emojiQueries[emojiQueries.length - 1].toLowerCase();
      const queryMatchesE = emojiSet
        .filter(
          (e) =>
            e.keywords
              .map((k) => k.toLowerCase())
              .filter((k) => k.includes(query.replace(":", ""))).length
        )
        .slice(0, 7);

      setQueryMatches(queryMatchesE);
      setKeyboardHoveredEmoji(
        queryMatchesE.length ? queryMatchesE[0].name : null
      );
      setOpen(!!queryMatchesE.length);
      setQuery(query);
    } else {
      // Close picker if no matches
      setQueryMatches([]);
      setOpen(false);
    }
  }, [
    emojiSet,
    message,
    setKeyboardHoveredEmoji,
    setOpen,
    setQuery,
    setQueryMatches,
  ]);

  if (open)
    return (
      <Grid
        // GridWrap="wrap"
        templateColumns="repeat(5,1fr)"
        gap="10px"
        py="4"
        px="2"
        position="absolute"
        backgroundColor="gray.600"
        shadow="md"
        w="full"
        rounded="lg"
        maxH="400px"
        overflowY="auto"
        sx={{ bottom: "calc(100% + 10px)" }}
      >
        {/* {customEmojis.map((emoji) => (
          <Emote emote={emoji.name} size="small" title={emoji.name} />
        ))} */}

        {(queryMatches.length ? queryMatches : emojiSet).map((emoji, i) => (
          <img
            key={emoji.imageUrl + i}
            src={emoji.imageUrl}
            className={`w-5 max-w-5 cursor-pointer ${
              keyboardHoveredEmoji === emoji.name
                ? "bg-primary-300 rounded p-1"
                : ""
            }`}
            onClick={() => onEmojiSelect(emoji)}
          />
        ))}
      </Grid>
    );
  else return <></>;
};
