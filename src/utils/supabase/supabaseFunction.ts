import { Record } from "@/domain/record";
import { supabase } from "./supabaseClient";

export const fetchAllRecords = async (): Promise<Record[]> => {
  try {
    const res = await supabase.from("study-record").select("*");

    if (res.status !== 200 || res.data === null) {
      throw new Error("学習記録の取得に失敗しました");
    }

    const records = res.data.map((x) => {
      return new Record(x.id, x.title, x.time, x.created_at);
    });

    return records;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    return [];
  }
};

export const insertRecord = async (
  newRecord: Pick<Record, "title" | "time">
): Promise<Record | null> => {
  try {
    const res = await supabase.from("study-record").upsert(newRecord).select();
    if (res.error !== null) {
      throw new Error("学習記録の作成に失敗しました");
    }
    return res.data[0];
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};
