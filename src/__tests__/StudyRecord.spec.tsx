import StudyRecord from "@/pages/StudyRecord";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen, within } from "@testing-library/react";
import { userEvent as testingLibraryUserEvent } from "@testing-library/user-event";

import * as supabaseFunction from "@/utils/supabase/supabaseFunction";

jest.mock("@/utils/supabase/supabaseFunction", () => ({
  fetchAllRecords: jest.fn().mockResolvedValue([
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
  ]),
  insertRecord: jest.fn().mockResolvedValue({
    id: "add-test-id",
    title: "追加テスト課題",
    time: 20,
    created_at: Date.now().toLocaleString(),
  }),
  DeleteRecord: jest.fn(),
}));

describe("StudyRecord.tsx", () => {
  it("ローディング表示チェック", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <StudyRecord />
      </ChakraProvider>
    );
    const loadingElem = await screen.findByText("ローディング中");
    expect(loadingElem).toBeInTheDocument();
  });

  it("テーブル表示チェック", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <StudyRecord />
      </ChakraProvider>
    );
    const tableElem = await screen.findByRole("table");
    const trElems = tableElem.querySelectorAll("tbody tr");
    expect(tableElem).toBeInTheDocument();
    expect(trElems.length).toBe(3);
  });

  it("新規登録ボタン表示チェック", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <StudyRecord />
      </ChakraProvider>
    );
    const buttonElem = await screen.findByRole("button", { name: "新規登録" });
    expect(buttonElem).toBeInTheDocument();
  });

  it("タイトル表示チェック", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <StudyRecord />
      </ChakraProvider>
    );
    const hElem = await screen.findByRole("heading", {
      name: "学習記録一覧",
    });
    expect(hElem.textContent).toBe("学習記録一覧");
  });

  it("モーダルタイトル表示チェック", async () => {
    const userEvent = testingLibraryUserEvent.setup();

    render(
      <ChakraProvider value={defaultSystem}>
        <StudyRecord />
      </ChakraProvider>
    );
    const buttonElem = await screen.findByRole("button", { name: "新規登録" });
    await userEvent.click(buttonElem);

    const h2Elem = await screen.findByRole("heading", {
      level: 2,
      name: "学習記録登録",
    });

    expect(h2Elem).toBeInTheDocument();
  });

  it("学習内容未入力_登録エラーチェック", async () => {
    const spyOnInsertRecord = jest.spyOn(supabaseFunction, "insertRecord");

    const userEvent = testingLibraryUserEvent.setup();

    render(
      <ChakraProvider value={defaultSystem}>
        <StudyRecord />
      </ChakraProvider>
    );
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

    const userEvent = testingLibraryUserEvent.setup();

    render(
      <ChakraProvider value={defaultSystem}>
        <StudyRecord />
      </ChakraProvider>
    );
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
    const userEvent = testingLibraryUserEvent.setup();
    const delFuncSpy = jest.spyOn(supabaseFunction, "DeleteRecord");

    render(
      <ChakraProvider value={defaultSystem}>
        <StudyRecord />
      </ChakraProvider>
    );

    const deleteBtnElems = await screen.findAllByRole("button", {
      name: "記録削除",
    });

    await userEvent.click(deleteBtnElems[0]);
    const trElems = within(screen.getByTestId("tbody")).getAllByRole("row");
    expect(trElems.length).toBe(2);
    expect(delFuncSpy).toHaveBeenCalledTimes(1);
  });
});
