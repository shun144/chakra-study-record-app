import PrimaryButton from "@/atoms/button/PrimaryButton";
import {
  DialogCloseTrigger,
  DialogContent,
  DialogPositioner,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldErrorText, FieldLabel } from "@/components/ui/field";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  Input,
  Portal,
  Stack,
  Text,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { memo, type FC } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormValues {
  studyContent: string;
  studyTime: number;
}

type Props = Pick<UseDisclosureReturn, "open" | "onToggle"> & {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  isValid: boolean;
};

const InputModal: FC<Props> = ({
  open,
  onToggle,
  onSubmit,
  errors,
  register,
  isValid,
}) => {
  return (
    <Dialog.Root size={"sm"} open={open} onOpenChange={onToggle}>
      <Portal>
        <Dialog.Backdrop />
        <DialogPositioner>
          <DialogContent>
            <Dialog.Header>
              <DialogTitle>学習記録登録</DialogTitle>
            </Dialog.Header>
            <Dialog.Body>
              <Stack>
                <form id="register" onSubmit={onSubmit}>
                  <Stack gap="4" align="flex-start" maxW="md">
                    <Field.Root invalid={!!errors.studyContent}>
                      <FieldLabel>学習記録</FieldLabel>
                      <Input
                        {...register("studyContent", {
                          required: "内容の入力は必須です",
                        })}
                      />
                      <FieldErrorText>
                        {errors.studyContent?.message}
                      </FieldErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.studyTime}>
                      <FieldLabel>学習時間</FieldLabel>
                      <Flex align={"center"} w="100%" gap={2}>
                        <Input
                          type="number"
                          min={0}
                          w={"90%"}
                          {...register("studyTime", {
                            pattern: {
                              value: /^(0|[1-9]\d*)(\.\d+)?$/,
                              message: "整数で入力してください。",
                            },
                            required: "時間の入力は必須です",
                            min: {
                              value: 0,
                              message: "時間は0以上である必要があります",
                            },
                          })}
                        />
                        <Text>時間</Text>
                      </Flex>

                      <FieldErrorText>
                        {errors.studyTime?.message}
                      </FieldErrorText>
                    </Field.Root>
                  </Stack>
                </form>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <PrimaryButton
                type="submit"
                form="register"
                isDisabled={!isValid}
              >
                登録
              </PrimaryButton>
              <Dialog.ActionTrigger asChild>
                <Button>キャンセル</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <DialogCloseTrigger asChild>
              <CloseButton size="sm" />
            </DialogCloseTrigger>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </Dialog.Root>
  );
};

export default memo(InputModal);
