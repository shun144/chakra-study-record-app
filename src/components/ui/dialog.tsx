import {
  Dialog as ChakraDialog,
  Portal,
  type DialogCloseTriggerProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";

interface NewDialogPositionerProps extends ChakraDialog.PositionerProps {
  children: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement>;
}

const DialogPositioner = forwardRef<HTMLDivElement, NewDialogPositionerProps>(
  (props, ref) => {
    const overriddenProps: NewDialogPositionerProps = {
      ref,
      ...props,
    };

    return <ChakraDialog.Positioner {...overriddenProps} />;
  },
);

interface NewDialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
  backdrop?: boolean;
  children?: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement>;
  asChild?: boolean;
}

export const DialogContent = forwardRef<HTMLDivElement, NewDialogContentProps>(
  (props, ref) => {
    const { portalled = true, portalRef, backdrop = true, ...rest } = props;
    const overriddenProps: NewDialogContentProps = {
      ref,
      // asChild: true,
      asChild: false,
      ...rest,
    };
    return (
      <Portal disabled={!portalled} container={portalRef}>
        {backdrop && <ChakraDialog.Backdrop />}
        <DialogPositioner>
          <ChakraDialog.Content {...overriddenProps} />
        </DialogPositioner>
      </Portal>
    );
  },
);

interface NewDialogCloseTriggerProps extends DialogCloseTriggerProps {
  children?: React.ReactNode;
  ref?: React.ForwardedRef<HTMLButtonElement>;
  asChild?: boolean;
}

export const DialogCloseTrigger = forwardRef<
  HTMLButtonElement,
  NewDialogCloseTriggerProps
>((props, ref) => {
  const overriddenProps: NewDialogCloseTriggerProps = {
    ref,
    ...props,
  };
  return <ChakraDialog.CloseTrigger {...overriddenProps} />;
});

interface NewDialogTitleProps extends ChakraDialog.TitleProps {
  children: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement>;
}

export const DialogTitle = forwardRef<HTMLDivElement, NewDialogTitleProps>(
  (props, ref) => {
    const overriddenProps: NewDialogTitleProps = {
      ref,
      ...props,
    };

    return <ChakraDialog.Title {...overriddenProps} />;
  },
);

export const DialogRoot = ChakraDialog.Root;
export const DialogFooter = ChakraDialog.Footer;
export const DialogHeader = ChakraDialog.Header;
export const DialogBody = ChakraDialog.Body;
export const DialogBackdrop = ChakraDialog.Backdrop;
export const DialogDescription = ChakraDialog.Description;
export const DialogTrigger = ChakraDialog.Trigger;
export const DialogActionTrigger = ChakraDialog.ActionTrigger;
