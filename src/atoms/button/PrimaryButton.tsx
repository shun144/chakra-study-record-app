import { Button } from "@chakra-ui/react";
import { memo, type ComponentProps, type FC } from "react";

type ButtonProps = ComponentProps<typeof Button>;

type Props = ButtonProps & {
  isLoading?: boolean;
  isEmpty?: boolean;
};

const PrimaryButton: FC<Props> = ({
  children,
  isLoading,
  isEmpty,
  ...Props
}) => {
  const isDisabled = isLoading || isEmpty;

  const buttonProps: ButtonProps = {
    ...Props,
    color: "white",
    backgroundColor: isDisabled ? "gray.500" : "teal.500",
    _hover: {
      opacity: 0.8,
    },
    disabled: isDisabled,
    cursor: isDisabled ? "not-allowed" : "pointer",
  };

  return <Button {...buttonProps}>{children}</Button>;
};

export default memo(PrimaryButton);
