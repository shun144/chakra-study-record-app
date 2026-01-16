import { Field as ChakraField } from "@chakra-ui/react";
import * as React from "react";

interface NewFieldLabelProps extends ChakraField.LabelProps {
  children: React.ReactNode;
  ref?: React.ForwardedRef<HTMLLabelElement>;
}
const FieldLabel = React.forwardRef<HTMLLabelElement, NewFieldLabelProps>(
  (props, ref) => {
    const overriddenProp: NewFieldLabelProps = {
      ref,
      ...props,
    };

    return <ChakraField.Label {...overriddenProp} />;
  }
);

interface NewFieldHelperTextProps extends ChakraField.HelperTextProps {
  children: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement>;
}

const FieldHelperText = React.forwardRef<
  HTMLDivElement,
  NewFieldHelperTextProps
>((props, ref) => {
  const overriddenProp: NewFieldHelperTextProps = {
    ref,
    ...props,
  };

  return <ChakraField.HelperText {...overriddenProp} />;
});

interface NewFieldErrorTextProps extends ChakraField.ErrorTextProps {
  children: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement>;
}

const FieldErrorText = React.forwardRef<HTMLDivElement, NewFieldErrorTextProps>(
  (props, ref) => {
    const overriddenProp: NewFieldErrorTextProps = {
      ref,
      ...props,
    };

    return <ChakraField.ErrorText {...overriddenProp} />;
  }
);

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } =
      props;
    return (
      <ChakraField.Root ref={ref} {...rest}>
        {label && (
          <FieldLabel>
            {label}
            <ChakraField.RequiredIndicator fallback={optionalText} />
          </FieldLabel>
        )}
        {children}
        {helperText && <FieldHelperText>{helperText}</FieldHelperText>}
        {errorText && <FieldErrorText>{errorText}</FieldErrorText>}
      </ChakraField.Root>
    );
  }
);
