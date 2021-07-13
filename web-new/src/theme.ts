import { extendTheme, Theme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles: import("@chakra-ui/theme-tools").Styles = {
  global: {
    body: {
      backgroundColor: "#fafafa",
    },
  },
};

const colors = {
  text: {
    paragraph: "#787e8a",
  },
  thbg: {
    secondary: "#F6F7F8",
  },
};

export const theme = extendTheme<Theme>({ config, styles, colors });
