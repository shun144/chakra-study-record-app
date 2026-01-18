import { type Record } from "@/domain/record";
import StudyRecord from "@/pages/StudyRecord";
import * as supabaseFunction from "@/utils/supabase/supabaseFunction";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";



function delayResponse<T>(res: T, waitTime: number) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(res), waitTime));
}

// jest.mock("@/utils/supabase/supabaseFunction", () => ({
//   fetchAllRecords: jest.fn().mockImplementation(() =>
//     delayResponse<Record[]>(
//       [
//         {
//           id: "1",
//           title: "テスト課題",
//           time: 10,
//           created_at: Date.now().toLocaleString(),
//         },
//         {
//           id: "2",
//           title: "テスト課題2",
//           time: 8,
//           created_at: Date.now().toLocaleString(),
//         },
//         {
//           id: "3",
//           title: "テスト課題3",
//           time: 4,
//           created_at: Date.now().toLocaleString(),
//         },
//       ],
//       500,
//     ),
//   ),
// }));

const user = userEvent.setup()

describe('first', () => {
  it("", async () => {

    jest.useFakeTimers();

    jest.mock("@/utils/supabase/supabaseFunction", () => ({
      fetchAllRecords: jest.fn().mockImplementation(() =>
        new Promise<Record[]>(resolve => setTimeout(() => (
          resolve([
            {
              id: "1",
              title: "テスト課題",
              time: 10,
              created_at: Date.now().toLocaleString(),
            }
          ])
        ), 500))
      ),
    }));

    await waitFor(() => {
      act(() => render(
        <ChakraProvider value={defaultSystem}>
          <StudyRecord />
        </ChakraProvider>
      ))
    })

    await waitFor(() => {
      expect(screen.getByText("ローディング中")).toBeInTheDocument()
    })

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getByText("学習記録一覧")).toBeInTheDocument()
    })

    // screen.findByRole()

    jest.useRealTimers();
  })
})