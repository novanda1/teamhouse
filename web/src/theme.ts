import { extendTheme, Theme, ThemeConfig, withDefaultColorScheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme<Theme>({ config }, {
  styles : {
    global: {
      // ".js-focus-visible" : { 
      //     ":focus:not([data-focus-visible-added])" : {
      //       outline: "none",
      //       boxShadow: "none"
      //   }
      // }
      body: {
        color: "gray.200"
      }
    }
  },
    fonts: { 
      mono: "Menlo",
    },
    components:{
      Button:{
        baseStyle: {
          _focus: {
          boxShadow: "0 0 0 3px var(--chakra-colors-purple-700)",
          }
        }
      },
      IconButton:{
        baseStyle: {
          _focus: {
          boxShadow: "0 0 0 3px var(--chakra-colors-purple-700)",
          }
        }
      },
      // Input:{
      //   baseStyle: {
      //     _focus: {
      //      borderColor: "var(--chakra-colors-purple-700)",
      //     }
      //   }
      // }
    }
  },
  withDefaultColorScheme({
    colorScheme: "purple",
    components: ["Button"]
  })
);

export default theme;
