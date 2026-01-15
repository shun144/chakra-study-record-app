import StudyRecord from "@/pages/StudyRecord";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";

jest.mock("@/utils/supabase/supabaseFunction", () => ({
  fetchAllRecords: jest.fn().mockResolvedValue([]),
}));

describe("StudyRecord.tsx", () => {
  it("タイトル表示チェック", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <StudyRecord />
      </ChakraProvider>
    );
    const loadingElem = await screen.findByText("ローディング中");
    screen.debug(loadingElem);
    expect(loadingElem).toBeInTheDocument();
  });
});
