import PrimaryButton from "@/atoms/button/PrimaryButton";
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
import { useForm } from "react-hook-form";

type Props = Pick<UseDisclosureReturn, "open" | "onToggle" | "setOpen">;

interface FormValues {
  studyContent: string;
  studyTime: number;
}

const InputModal: FC<Props> = ({ open, onToggle, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit = handleSubmit((formData) => {
    if (!isValid) return;

    const newRecord = {
      title: formData.studyContent,
      time: formData.studyTime,
    };

    // (async () => {
    //   const addedRecord = await insertRecord(newRecord);

    //   // if (addedRecord === null) {
    //   //   setStudyTitle("");
    //   //   setStudyTime(0);
    //   //   return;
    //   // }
    // })();

    // const addedRecord = await insertRecord(newRecord);

    // if (addedRecord === null) {
    //   setStudyTitle("");
    //   setStudyTime(0);
    //   return;
    // }

    // setStudyTitle("");
    // setStudyTime(NaN);

    setOpen(false);
  });

  // const addRecord = async () => {
  //   if (studyTitle === "" || Number.isNaN(studyTime) || !studyTime) {
  //     setError("入力されていない項目があります");
  //     return;
  //   }

  //   if (studyTime <= 0) {
  //     setError("学習時間は1時間以上を指定してください");
  //     return;
  //   }

  //   setError("");

  //   const newRecord = {
  //     title: studyTitle,
  //     time: studyTime,
  //   };

  //   const addedRecord = await insertRecord(newRecord);

  //   if (addedRecord === null) {
  //     setStudyTitle("");
  //     setStudyTime(0);
  //     return;
  //   }

  //   setRecords((prev) => [...prev, addedRecord]);
  //   setStudyTitle("");
  //   setStudyTime(NaN);
  // };

  return (
    <Dialog.Root size={"sm"} open={open} onOpenChange={onToggle}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>学習記録登録</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack>
                <form id="register" onSubmit={onSubmit}>
                  <Stack gap="4" align="flex-start" maxW="md">
                    <Field.Root invalid={!!errors.studyContent}>
                      <Field.Label>学習記録</Field.Label>
                      <Input
                        {...register("studyContent", {
                          required: "内容の入力は必須です",
                        })}
                      />
                      <Field.ErrorText>
                        {errors.studyContent?.message}
                      </Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.studyTime}>
                      <Field.Label>学習時間</Field.Label>
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
                            // valueAsNumber: true,
                            required: "時間の入力は必須です",
                            min: {
                              value: 0,
                              message: "時間は0以上である必要があります",
                            },

                            // pattern: {
                            //   value: /^(0|[1-9]\d*)(\.\d+)?$/g,

                            // },
                          })}
                        />
                        <Text>時間</Text>
                      </Flex>

                      <Field.ErrorText>
                        {errors.studyTime?.message}
                      </Field.ErrorText>
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
