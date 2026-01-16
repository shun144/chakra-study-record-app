import {
  Dialog,
  type DialogCloseTriggerProps,
  type DialogContentProps,
  type DialogPositionerProps,
  type DialogTitleProps,
} from "@chakra-ui/react";
import { forwardRef, type PropsWithChildren } from "react";

export const DialogPositioner = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DialogPositionerProps>
>(({ children, ...props }, ref) => {
  return (
    <Dialog.Positioner ref={ref} {...props}>
      {children}
    </Dialog.Positioner>
  );
});

export const DialogContent = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DialogContentProps>
>(({ children, ...props }, ref) => (
  <Dialog.Content ref={ref} {...props}>
    {children}
  </Dialog.Content>
));

export const DialogTitle = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DialogTitleProps>
>(({ children, ...props }, ref) => (
  <Dialog.Title ref={ref} {...props}>
    {children}
  </Dialog.Title>
));

export const DialogCloseTrigger = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<DialogCloseTriggerProps>
>(({ children, ...props }, ref) => (
  <Dialog.CloseTrigger ref={ref} {...props}>
    {children}
  </Dialog.CloseTrigger>
));
