// import { Dialog as ChakraDialog, Portal } from "@chakra-ui/react";
import {
  Box,
  Dialog as ChakraDialog,
  Dialog,
  Portal,
  type DialogCloseTriggerProps,
  type DialogPositionerProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { CloseButton } from "./close-button";

interface NewDialogPositionerProps extends ChakraDialog.PositionerProps {
  children?: React.ReactNode;
}

const DialogPositioner = forwardRef<HTMLDivElement, NewDialogPositionerProps>(
  function DialogPositioner(props, ref) {
    // const { children, ...rest } = props;
    const newProps: DialogPositionerProps = {
      unstyled: true,
      children: <Box ref={ref}>{props.children}</Box>,
    };

    return <ChakraDialog.Positioner {...newProps} {...props} />;
  }
);

interface DialogContentProps extends ChakraDialog.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
  backdrop?: boolean;
  children?: React.ReactNode;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(props, ref) {
    const {
      children,
      portalled = true,
      portalRef,
      backdrop = true,
      ...rest
    } = props;

    return (
      <Portal disabled={!portalled} container={portalRef}>
        {backdrop && <ChakraDialog.Backdrop />}
        <DialogPositioner>
          <ChakraDialog.Content ref={ref} {...rest} asChild={false}>
            {children}
          </ChakraDialog.Content>
        </DialogPositioner>
      </Portal>
    );
  }
);

interface NewDialogCloseTriggerProps extends DialogCloseTriggerProps {
  children?: React.ReactNode;
}

export const DialogCloseTrigger = forwardRef<
  HTMLButtonElement,
  NewDialogCloseTriggerProps
>(function DialogCloseTrigger(props, ref) {
  const chakraDialogCloseTriggerProps: DialogCloseTriggerProps = {
    asChild: true,
    position: "absolute",
    top: "2",
    insetEnd: "2",
    children: (
      <CloseButton size="sm" ref={ref}>
        {props.children}
      </CloseButton>
    ),
  };

  return (
    <ChakraDialog.CloseTrigger {...chakraDialogCloseTriggerProps} {...props} />
  );
});

interface DialogTitleProps extends ChakraDialog.TitleProps {
  children: React.ReactNode;
}

export const DialogTitle = forwardRef<HTMLDivElement, DialogTitleProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <Dialog.Title ref={ref} {...rest}>
        {children}
      </Dialog.Title>
    );
  }
);

export const DialogRoot = ChakraDialog.Root;
export const DialogFooter = ChakraDialog.Footer;
export const DialogHeader = ChakraDialog.Header;
export const DialogBody = ChakraDialog.Body;
export const DialogBackdrop = ChakraDialog.Backdrop;
// export const DialogTitle = ChakraDialog.Title;
export const DialogDescription = ChakraDialog.Description;
export const DialogTrigger = ChakraDialog.Trigger;
export const DialogActionTrigger = ChakraDialog.ActionTrigger;
