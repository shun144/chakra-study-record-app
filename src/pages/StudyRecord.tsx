import PrimaryButton from "@/atoms/button/PrimaryButton";
import { Record } from "@/domain/record";
import InputModal from "@/organisms/InputModal";
import {
  DeleteRecord,
  fetchAllRecords,
  insertRecord,
} from "@/utils/supabase/supabaseFunction";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Table,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

interface FormValues {
  studyContent: string;
  studyTime: number;
}

const StudyRecord = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { open, setOpen, onToggle } = useDisclosure();
  const [selectedRecordId, setSelectedRecordId] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const fetchedRecords = await fetchAllRecords();
      setRecords(fetchedRecords);
      setIsLoading(false);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
    setValue,
  } = useForm<FormValues>({
    mode: "onSubmit",
  });

  const onAddModalOpen = () => {
    setSelectedRecordId(undefined);
    setOpen(true);
  };

  const onSubmit = handleSubmit(async (formData) => {
    if (!isValid) return;
    const newRecord = {
      id: selectedRecordId,
      title: formData.studyContent,
      time: formData.studyTime,
    };
    const upsertedRecord = await insertRecord(newRecord);
    if (upsertedRecord === null) return;

    if (selectedRecordId) {
      setRecords((prev) =>
        prev.map((x) => {
          if (x.id === upsertedRecord.id) {
            return {
              ...x,
              title: upsertedRecord.title,
              time: upsertedRecord.time,
            };
          }
          return x;
        }),
      );
    } else {
      setRecords((prev) => [...prev, upsertedRecord]);
    }

    setSelectedRecordId(undefined);
    reset();
    setOpen(false);
  });

  const onEditModalOpen = (targetId: string) => {
    const foundData = records.find(({ id }) => id === targetId);
    if (!foundData) return;
    setSelectedRecordId(foundData.id);
    setValue("studyContent", foundData.title);
    setValue("studyTime", foundData.time);
    setOpen(true);
  };

  const onDelete = async (targetId: string) => {
    try {
      await DeleteRecord(targetId);
      setRecords((prev) => prev.filter(({ id }) => id !== targetId));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        return;
      }
    }
  };

  if (isLoading) return <div>ローディング中</div>;

  return (
    <Flex
      h="100vh"
      justify={"center"}
      align={"start"}
      p="20"
      bg="gray.100"
      overflowY={"scroll"}
    >
      <Box
        w="800px"
        h="600px"
        bg="white"
        rounded={"sm"}
        shadow={"md"}
        p="12"
        overflowY={"scroll"}
      >
        <Box position="relative" mb="4">
          <Heading size="2xl" color="teal" textAlign={"center"}>
            学習記録一覧
          </Heading>
          <PrimaryButton
            position={"absolute"}
            top="0"
            right="0"
            onClick={onAddModalOpen}
          >
            新規登録
          </PrimaryButton>
        </Box>

        <Stack>
          <Table.Root
            size="sm"
            variant={"outline"}
            overflowX="unset"
            overflowY="unset"
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader textAlign={"center"}>
                  学習内容
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"}>
                  学習時間
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"}>
                  アクション
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body data-testid="tbody">
              {records.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell aria-label="学習内容" textAlign={"center"}>
                    {item.title}
                  </Table.Cell>
                  <Table.Cell
                    aria-label="学習時間"
                    textAlign={"center"}
                  >{`${item.time} 時間`}</Table.Cell>
                  <Table.Cell textAlign={"center"}>
                    <HStack gapX={2} justify={"center"}>
                      <IconButton
                        aria-label="記録削除"
                        variant={"ghost"}
                        size="sm"
                        color="red.500"
                        onClick={() => onDelete(item.id)}
                      >
                        <FaRegTrashAlt />
                      </IconButton>
                      <IconButton
                        aria-label="記録編集"
                        variant={"ghost"}
                        size="sm"
                        onClick={() => onEditModalOpen(item.id)}
                      >
                        <FaRegEdit />
                      </IconButton>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>

        <InputModal
          selectedRecordId={selectedRecordId}
          open={open}
          onToggle={onToggle}
          onSubmit={onSubmit}
          errors={errors}
          register={register}
          reset={reset}
        />
      </Box>
    </Flex>
  );
};

export default StudyRecord;
