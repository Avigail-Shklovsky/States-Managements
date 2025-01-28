import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom"; // Add MemoryRouter
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Add QueryClientProvider
import { RecoilRoot } from "recoil"; // Add RecoilRoot
import StatesGridLayout from "../components/StatesGridLayout"; // Adjust the import path
import { useStates } from "../hooks/useStates";
import { Types } from "mongoose";
import { IState } from "../types/state";

// Mock the hooks
vi.mock("../hooks/useStates", () => ({
  useStates: vi.fn(), // Mock useStates as a function
}));

vi.mock("../hooks/useDeleteState", () => ({

    handleDelete: vi.fn(), // Mock the handleDelete function

}));

// Explicitly type the mocked useStates function
const mockedUseStates = vi.mocked(useStates);

describe("StatesGridLayout Component", () => {
  const queryClient = new QueryClient(); // Create a QueryClient instance

  it("renders states table when data is available", () => {
    // Mock useStates to return data
    mockedUseStates.mockReturnValue({
      data: [
        {
          _id: "678f689dce698de42670a5fa" as unknown as Types.ObjectId, // Mock ObjectId
          name: "State 1",
          flag: "usa.png",
          population: 340000000,
          region: "North America",
        },
      ] as IState[], // Cast to IState[]
      error: null,
      isLoading: false,
      queryClient: new QueryClient
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <MemoryRouter>
            <StatesGridLayout />
          </MemoryRouter>
        </RecoilRoot>
      </QueryClientProvider>
    );

    // Assert that the table is rendered
    expect(screen.getByText("State 1")).toBeInTheDocument();
  });
// 
  // it("renders error message when data fetching fails", () => {
  //   // Mock useStates to return an error
  //   mockedUseStates.mockReturnValue({
  //     data: null,
  //     error: "Failed to fetch data",
  //     isLoading: false,
  //   });

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <RecoilRoot>
  //         <MemoryRouter>
  //           <StatesGridLayout />
  //         </MemoryRouter>
  //       </RecoilRoot>
  //     </QueryClientProvider>
  //   );

  //   // Assert that the error message is rendered
  //   expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  // });
});