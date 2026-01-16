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
  IconButton,
  Stack,
  Table,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";

interface FormValues {
  studyContent: string;
  studyTime: number;
}

const StudyRecord = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { open, setOpen, onToggle } = useDisclosure();

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
  } = useForm<FormValues>({
    mode: "onSubmit",
  });

  const onSubmit = handleSubmit(async (formData) => {
    if (!isValid) return;

    const newRecord = {
      title: formData.studyContent,
      time: formData.studyTime,
    };

    const addedRecord = await insertRecord(newRecord);

    if (addedRecord === null) return;

    setRecords((prev) => [...prev, addedRecord]);
    reset();
    setOpen(false);
  });

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
            onClick={() => setOpen(true)}
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
            <Table.Body>
              {records.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.time}</Table.Cell>
                  <Table.Cell textAlign={"center"}>
                    <IconButton
                      variant={"ghost"}
                      size="sm"
                      onClick={() => onDelete(item.id)}
                    >
                      <FaRegTrashAlt />
                    </IconButton>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>

        <InputModal
          open={open}
          onToggle={onToggle}
          onSubmit={onSubmit}
          errors={errors}
          register={register}
          isValid={isValid}
        />
      </Box>
    </Flex>
  );
};

export default StudyRecord;
