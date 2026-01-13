import { supabase } from "./supabaseClient";
import { type Tables } from "./types";

export const fetchAllRecords = async (): Promise<Tables<"study-record">[]> => {
  try {
    const records = await supabase.from("study-record").select("*");

    if (records.status !== 200 || records.data === null) {
      throw new Error("学習記録の取得に失敗しました");
    }

    return records.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    return [];
  }
};
