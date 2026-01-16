import StudyRecord from "@/pages/StudyRecord";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { userEvent as testingLibraryUserEvent } from "@testing-library/user-event";

jest.mock("@/utils/supabase/supabaseFunction", () => ({
  fetchAllRecords: jest.fn().mockResolvedValue([
    {
      id: "test-id",
      title: "テスト課題",
      time: 10,
      created_at: Date.now().toLocaleString(),
    },
  ]),
}));

describe("StudyRecord.tsx", () => {
  xit("ローディング表示チェック", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <StudyRecord />
      </ChakraProvider>
    );
    const loadingElem = await screen.findByText("ローディング中");
    expect(loadingElem).toBeInTheDocument();
  });

  xit("テーブル表示チェック", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <StudyRecord />
      </ChakraProvider>
    );
    const tableElem = await screen.findByRole("table");
    const trElems = tableElem.querySelectorAll("tbody tr");
    expect(tableElem).toBeInTheDocument();
    expect(trElems.length).toBe(1);
  });

  xit("新規登録ボタン表示チェック", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <StudyRecord />
      </ChakraProvider>
    );
    const buttonElem = await screen.findByRole("button", { name: "新規登録" });
    expect(buttonElem).toBeInTheDocument();
  });

  xit("タイトル表示チェック", async () => {
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

    screen.debug(h2Elem);

    expect(h2Elem).toBeInTheDocument();
  });
});
