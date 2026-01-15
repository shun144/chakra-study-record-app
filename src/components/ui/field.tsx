import {
  Field,
  type FieldErrorTextProps,
  type FieldLabelProps,
} from "@chakra-ui/react";
import { forwardRef, type PropsWithChildren } from "react";

export const FieldLabel = forwardRef<
  HTMLLabelElement,
  PropsWithChildren<FieldLabelProps>
>(({ children, ...props }, ref) => (
  <Field.Label {...props} ref={ref}>
    {children}
  </Field.Label>
));

export const FieldErrorText = forwardRef<
  HTMLDivElement,
  PropsWithChildren<FieldErrorTextProps>
>(({ children, ...props }, ref) => (
  <Field.ErrorText {...props} ref={ref}>
    {children}
  </Field.ErrorText>
));
