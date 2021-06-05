import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
