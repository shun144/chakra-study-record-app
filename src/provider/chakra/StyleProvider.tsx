import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import type { FC, PropsWithChildren } from "react";

const StyleProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider>{children}</ThemeProvider>
    </ChakraProvider>
  );
};

export default StyleProvider;
