import { type Record } from "@/domain/record";
import StudyRecord from "@/pages/StudyRecord";
import * as supabaseFunction from "@/utils/supabase/supabaseFunction";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import { userEvent as testingLibraryUserEvent } from "@testing-library/user-event";

function delayResponse<T>(res: T, waitTime: number) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(res), waitTime));
}

jest.mock("@/utils/supabase/supabaseFunction", () => ({
  fetchAllRecords: jest.fn().mockImplementation(() =>
    delayResponse<Record[]>(
      [
        {
          id: "1",
          title: "テスト課題",
          time: 10,
          created_at: Date.now().toLocaleString(),
        },
        {
          id: "2",
          title: "テスト課題2",
          time: 8,
          created_at: Date.now().toLocaleString(),
        },
        {
          id: "3",
          title: "テスト課題3",
          time: 4,
          created_at: Date.now().toLocaleString(),
        },
      ],
      500,
    ),
  ),
  insertRecord: jest.fn().mockResolvedValue({
    id: "add-test-id",
    title: "追加テスト課題",
    time: 20,
    created_at: Date.now().toLocaleString(),
  }),
  DeleteRecord: jest.fn(),
}));

describe.skip("StudyRecord.tsx", () => {
  const userEvent = testingLibraryUserEvent.setup();

  beforeEach(async () => {
    // // タイマー関数をモックする
    // jest.useFakeTimers();

    await waitFor(() => {
      act(() =>
        render(
          <ChakraProvider value={defaultSystem}>
            <StudyRecord />
          </ChakraProvider>,
        ),
      );
    });
  });

  // afterEach(() => {
  //   jest.runOnlyPendingTimers();

  //   // モックから通常のタイマー関数に戻す
  //   jest.useRealTimers();
  // });

  it("ローディング表示チェック", async () => {
    await waitFor(() => {
      expect(screen.getByText("ローディング中")).toBeInTheDocument();
    });

    // jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.queryByText("ローディング中")).toBeNull();
    });
  });

  it("テーブル表示チェック", async () => {
    const tableElem = await screen.findByRole("table");
    const trElems = tableElem.querySelectorAll("tbody tr");
    expect(tableElem).toBeInTheDocument();
    expect(trElems.length).toBe(3);
  });

  it("新規登録ボタン表示チェック", async () => {
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "新規登録" }),
      ).toBeInTheDocument();
    });
  });

  it("タイトル表示チェック", async () => {
    const hElem = await screen.findByRole("heading", {
      name: "学習記録一覧",
    });
    expect(hElem.textContent).toBe("学習記録一覧");
  });

  it("モーダルタイトル表示チェック", async () => {
    await waitFor(() => {
      userEvent.click(screen.getByRole("button", { name: "新規登録" }));
    });

    const h2 = await screen.findByRole("heading", {
      level: 2,
      name: "学習記録登録",
    });

    expect(h2).toBeInTheDocument();
  });

  it("学習内容未入力_登録エラーチェック", async () => {
    const spyOnInsertRecord = jest.spyOn(supabaseFunction, "insertRecord");

    const openModalBtnElem = await screen.findByRole("button", {
      name: "新規登録",
    });
    await userEvent.click(openModalBtnElem);

    const studyTimeField = await screen.findByLabelText("学習時間");

    await userEvent.type(studyTimeField, "8");

    const registerBtnElem = await screen.findByRole("button", { name: "登録" });

    await userEvent.click(registerBtnElem);

    const studyContentFieldErrorText =
      await screen.findByText("内容の入力は必須です");

    expect(studyContentFieldErrorText).toBeInTheDocument();
    expect(spyOnInsertRecord).toHaveBeenCalledTimes(0);
  });

  it("学習時間未入力_登録エラーチェック", async () => {
    const spyOnInsertRecord = jest.spyOn(supabaseFunction, "insertRecord");

    const openModalBtnElem = await screen.findByRole("button", {
      name: "新規登録",
    });
    await userEvent.click(openModalBtnElem);

    const studyContentField = await screen.findByLabelText("学習内容");
    const studyTimeField = await screen.findByLabelText("学習時間");

    await userEvent.type(studyContentField, "Jest学習");

    const registerBtnElem = await screen.findByRole("button", { name: "登録" });

    await userEvent.click(registerBtnElem);

    const studyTimeFieldErrorText =
      await screen.findByText("時間の入力は必須です");

    expect(studyTimeFieldErrorText).toBeInTheDocument();

    await userEvent.type(studyTimeField, "-1");
    const studyTimeFieldUnderZeroErrorText =
      await screen.findByText("時間は0以上を指定してください");

    expect(studyTimeFieldUnderZeroErrorText).toBeInTheDocument();
    expect(spyOnInsertRecord).toHaveBeenCalledTimes(0);
  });

  it("学習記録_削除正常チェック", async () => {
    const delFuncSpy = jest.spyOn(supabaseFunction, "DeleteRecord");

    const deleteBtnElems = await screen.findAllByRole("button", {
      name: "記録削除",
    });

    await userEvent.click(deleteBtnElems[0]);
    screen.debug();
    const trElems = within(screen.getByTestId("tbody")).getAllByRole("row");
    expect(trElems.length).toBe(2);
    expect(delFuncSpy).toHaveBeenCalledTimes(1);
  });
});
