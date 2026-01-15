import { forwardRef } from "react";

type ButtonProps = {
  label: string;
};

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label }, ref) => {
    return <button ref={ref}>{label}</button>;
  }
);

type CustomButtonProps = typeof CustomButton;
type Aaa = React.ComponentPropsWithRef<CustomButtonProps>;

export default CustomButton;
