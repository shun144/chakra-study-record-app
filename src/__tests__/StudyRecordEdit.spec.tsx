import StudyRecord from "@/pages/StudyRecord";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const user = userEvent.setup();

jest.mock("@/utils/supabase/supabaseFunction", () => ({
  insertRecord: jest
    .fn()
    .mockImplementation(
      (arg: { id: string | undefined; title: string; time: number }) => ({
        id: arg.id,
        title: arg.title,
        time: arg.time,
      }),
    ),
  fetchAllRecords: jest.fn().mockResolvedValue([
    {
      id: "1",
      title: "初期値課題",
      time: 1,
      created_at: Date.now().toLocaleString(),
    },
    {
      id: "2",
      title: "初期値課題2",
      time: 2,
      created_at: Date.now().toLocaleString(),
    },
  ]),
}));

describe.skip("編集テスト", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <ChakraProvider value={defaultSystem}>
          <StudyRecord />
        </ChakraProvider>,
      );
    });
  });

  xit("編集モーダルタイトルチェック", async () => {
    await waitFor(() => {
      expect(screen.queryByText("ローディング中")).toBeNull();
    });

    const tbodyElme = await screen.findByTestId("tbody");
    const rowElems = within(tbodyElme).getAllByRole("row");
    const firstRowElem = rowElems[0];

    const btnElem = firstRowElem.querySelector('button[aria-label="記録編集"]');
    await user.click(btnElem!);
    const dialogTitle = screen.getByText("学習記録編集");
    expect(dialogTitle).toBe(dialogTitle);
  });

  test.skip.each([0, 1])("編集モーダル_フィールド値チェック_%i", async (rowIdx) => {

    // 準備
    const tbody = await screen.findByRole("tbody");
    const trElems = tbody.querySelectorAll("tr");
    const targetTrElem = trElems[rowIdx];
    const targetStudyContent = await within(targetTrElem).findByRole("cell", { name: "学習内容" });
    const targetStudyTime = await within(targetTrElem).findByRole("cell", { name: "学習時間" });
    const editBtnElem = within(targetTrElem).getByRole("button", { name: "記録編集" })

    // 実行
    await user.click(editBtnElem);

    // 確認
    const dialog = await screen.findByRole("dialog");
    await waitFor(() => {
      expect(within(dialog).getByRole("textbox", { name: "学習内容" })).toHaveValue(targetStudyContent.textContent);
      expect(within(dialog).getByRole("spinbutton", { name: "学習時間" })).toHaveValue(Number(targetStudyTime.textContent.replace(" 時間", "")));
    })

    // 後片づけ
    const cancelBtn = await within(dialog).findByRole("button", { name: "キャンセル" })
    await user.click(cancelBtn);
    await waitFor(() => {
      expect(dialog).not.toBeInTheDocument();
    })
  })

  it("編集モーダル_新規登録_フィールド空欄チェック", async () => {

    const registBtn = await screen.findByRole("button", { name: "新規登録" })
    await user.click(registBtn)

    const dialog = await screen.findByRole("dialog")
    await waitFor(() => {
      expect(within(dialog).getByRole("textbox", { name: "学習内容" })).toHaveValue("");
      expect(within(dialog).getByRole("spinbutton", { name: "学習時間" })).toHaveDisplayValue("");
    })
  })


  xit("記録編集チェック", async () => {
    await waitFor(() => {
      expect(screen.queryByText("ローディング中")).toBeNull();
    });

    const tbodyElme = await screen.findByTestId("tbody");
    const rowElems = within(tbodyElme).getAllByRole("row");
    const targetRowElem = rowElems[0];

    const btnElem = targetRowElem.querySelector(
      'button[aria-label="記録編集"]',
    );
    await user.click(btnElem!);

    // 学習記録編集ダイアログが表示されるまで待機
    await waitFor(() => {
      expect(screen.queryByText("学習記録編集")).not.toBeNull();
    });

    const studyContentField = await screen.findByRole("textbox", {
      name: "学習内容",
    });

    const studyTimeField = await screen.findByRole("spinbutton", {
      name: "学習時間",
    });

    await user.clear(studyContentField);
    await user.type(studyContentField, "★★★");

    await user.clear(studyTimeField);
    await user.type(studyTimeField, "99");

    const saveBtn = await screen.findByRole("button", {
      name: "保存",
    });

    await user.click(saveBtn);

    const targetStudyContent = await within(targetRowElem).findByRole("cell", {
      name: "学習内容",
    });
    const targetStudyTime = await within(targetRowElem).findByRole("cell", {
      name: "学習時間",
    });

    expect(targetStudyContent.textContent).toBe("★★★");
    expect(targetStudyTime.textContent).toBe("99 時間");
  });
});
