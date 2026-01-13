import type { FC, PropsWithChildren } from "react";
import StyleProvider from "./chakra/StyleProvider";

const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return <StyleProvider>{children}</StyleProvider>;
};

export default RootProvider;
