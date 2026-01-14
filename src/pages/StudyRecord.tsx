import { fetchAllRecords } from "@/utils/supabase/supabaseFunction";
// import { type Tables } from "@/utils/supabase/types";
import { useCallback, useEffect, useState } from "react";
// import RecordLi from "./molecules/record/RecordLi";
import PrimaryButton from "@/atoms/button/PrimaryButton";
import { Record } from "@/domain/record";
import InputModal from "@/organisms/InputModal";
import { useDisclosure } from "@chakra-ui/react";

const StudyRecord = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [studyTitle, setStudyTitle] = useState("");
  const [studyTime, setStudyTime] = useState(NaN);
  const [error, setError] = useState("");
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

  const handleChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      setStudyTitle(val);
    },
    []
  );

  const handleChangeTime = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(event.target.value);
      if (Number.isNaN(val)) setError("入力されていない項目があります");
      setStudyTime(val);
    },
    []
  );

  const addRecord = () => {
    setOpen(true);
  };

  // const handleChangeTime = (event) => {
  //   const val = parseInt(event.target.value);
  //   if (Number.isNaN(val)) setError("入力されていない項目があります");

  //   setStudyTime(val);
  // };

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

  // const handleRecodeDelete = async (deleteId) => {
  //   await deleteDbRecord(deleteId);
  //   setRecords((prev) => prev.filter(({ id }) => id !== deleteId));
  // };

  // const totalTime = records.reduce((acc, cur) => {
  //   return acc + parseInt(cur.time);
  // }, 0);

  if (isLoading) return <div>ローディング中</div>;

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
        <div>
          <label htmlFor="study-content">学習内容</label>
          <input
            id="study-content"
            aria-label="study-content"
            type="text"
            value={studyTitle}
            onChange={handleChangeText}
          />
        </div>
        <div>
          <label htmlFor="study-time">学習時間</label>
          <input
            id="study-time"
            aria-label="study-time"
            type="number"
            min={0}
            name="study-time"
            value={studyTime}
            onChange={handleChangeTime}
          />
        </div>
        <div>{`入力されている学習内容： ${studyTitle}`}</div>
        <div>{`入力されている時間： ${typeof studyTime === "number" && !isNaN(studyTime) ? studyTime : ""}時間`}</div>
        <div style={{ margin: "15px 0", width: "200px" }}>
          <ul
            style={{
              listStyle: "none",
              padding: "0",
            }}
          >
            {records.map((record) => (
              <li key={record.id}>{`${record.title}:${record.time}時間`}</li>
              // <RecordLi
              //   key={record.id}
              //   record={record}
              //   onDelete={() => handleRecodeDelete(record.id)}
              // />
            ))}
          </ul>
        </div>

        <div style={{ textAlign: "center", width: "100%" }}>
          <PrimaryButton onClick={addRecord}>登録</PrimaryButton>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* <p>{`合計時間：${totalTime} / 1000(h)`}</p> */}
        </div>
      </div>

      <InputModal open={open} onToggle={onToggle} />
    </>
  );
};

export default StudyRecord;
