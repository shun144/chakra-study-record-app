import PrimaryButton from "@/atoms/button/PrimaryButton";
import { Record } from "@/domain/record";
import InputModal from "@/organisms/InputModal";
import {
  DeleteRecord,
  fetchAllRecords,
  insertRecord,
} from "@/utils/supabase/supabaseFunction";
import { HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

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

  const totalTime = records.reduce((accu, curr) => {
    return accu + curr.time;
  }, 0);

  return (
    <>
      <h1 data-testid="title" style={{ color: "green" }}>
        学習記録一覧
      </h1>
      <div
        style={{
          width: "450px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <div style={{ margin: "15px 0", width: "200px" }}>
          <ul
            style={{
              listStyle: "none",
              padding: "0",
            }}
          >
            {records.map((record) => (
              <li key={record.id}>
                <HStack>
                  <p>{`${record.title}:${record.time}時間`}</p>
                  <IconButton
                    onClick={() => onDelete(record.id)}
                    size={"sm"}
                    aria-label="delete record"
                  >
                    <RxCross2 />
                  </IconButton>
                </HStack>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: "center", width: "100%" }}>
          <PrimaryButton onClick={() => setOpen(true)}>登録</PrimaryButton>
          <p>{`合計時間：${totalTime} / 1000(h)`}</p>
        </div>
      </div>

      <InputModal
        open={open}
        onToggle={onToggle}
        onSubmit={onSubmit}
        errors={errors}
        register={register}
        isValid={isValid}
      />
    </>
  );
};

export default StudyRecord;
