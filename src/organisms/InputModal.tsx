import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { memo, type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = Partial<UseDisclosureReturn>;

type Inputs = {
  example: string;
  exampleRequired: string;
};

const InputModal: FC<Props> = ({ open, onToggle }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example"));

  return (
    <Dialog.Root size={"sm"} open={open} onOpenChange={onToggle}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <HStack>
                {/* <form onSubmit={handleSubmit(onSubmit)}>
                  <input defaultValue="test" {...register("example")} />

                  <input {...register("exampleRequired", { required: true })} />
                  {errors.exampleRequired && (
                    <span>This field is required</span>
                  )}
                  <input type="submit" />
                </form> */}

                {/* <label htmlFor="">
                  学習内容
                  <input id="title" name="title" type="text" />
                </label> */}
              </HStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Save</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default memo(InputModal);
