import App from "@/App";
import { render, screen } from "@testing-library/react";

describe("App.tsx", () => {
  it("タイトル表示チェック", async () => {
    render(<App />);
    const title = await screen.findByTestId("kano");
    expect(title).toBeInTheDocument();
  });
});
