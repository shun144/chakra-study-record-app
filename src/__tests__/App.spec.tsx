import StudyRecord from "@/pages/StudyRecord";
import { render, screen } from "@testing-library/react";

jest.mock("@/utils/supabase/supabaseFunction", () => ({
  fetchAllRecords: jest.fn().mockResolvedValue([]),
}));

describe("App.tsx", () => {
  it("タイトル表示チェック", async () => {
    render(<StudyRecord />);
    const title = await screen.findByTestId("title");
    expect(title).toBeInTheDocument();
  });
});
