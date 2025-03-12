// import { render, screen } from "@testing-library/react";
// import { vi } from "vitest";
// import { MemoryRouter } from "react-router-dom"; // Add MemoryRouter
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
// import { RecoilRoot } from "recoil";
// import { Types } from "mongoose";
// import { IState } from "../types/state";
// import { useStates } from "../hooks/states/useStates";
// import StatesGridLayout from "../components/states/StatesGridLayout";

// // Mock the hooks
// vi.mock("../hooks/useStates", () => ({
//   useStates: vi.fn(), 
// }));

// vi.mock("../hooks/useDeleteState", () => ({

//     handleDelete: vi.fn(), 

// }));

// vi.mock('../hooks/states/useStates', () => ({
//   useStates: vi.fn(() => ({
//     data: [],
//     error: null,
//     isLoading: false,
//   })),
// }));

// const mockedUseStates = vi.mocked(useStates);

// describe('StatesGridLayout Component', () => {
//   // const queryClient = new QueryClient();

//   const renderWithProviders = (ui: React.ReactElement) => {
//     const queryClient = new QueryClient();
//     return render(
//       <QueryClientProvider client={queryClient}>
//         <RecoilRoot>
//           <MemoryRouter>{ui}</MemoryRouter>
//         </RecoilRoot>
//       </QueryClientProvider>
//     );
//   };
  
//   it('renders states table when data is available', () => {
//     mockedUseStates.mockReturnValue({
//       data: [
//         {
//           _id: '678f689dce698de42670a5fa' as unknown as Types.ObjectId,
//           name: 'State 1',
//           flag: 'usa.png',
//           population: 340000000,
//           region: 'North America',
//         },
//       ] as IState[],
//       error: null,
//       isLoading: false,
//       queryClient: new QueryClient(),
//     });
  
//     renderWithProviders(<StatesGridLayout />);
//     expect(screen.getByText('State 1')).toBeInTheDocument();
//   });
 
//   // it("renders error message when data fetching fails", () => {
//   //   // Mock useStates to return an error
//   //   mockedUseStates.mockReturnValue({
//   //     data: null,
//   //     error: "Failed to fetch data",
//   //     isLoading: false,
//   //   });

//   //   render(
//   //     <QueryClientProvider client={queryClient}>
//   //       <RecoilRoot>
//   //         <MemoryRouter>
//   //           <StatesGridLayout />
//   //         </MemoryRouter>
//   //       </RecoilRoot>
//   //     </QueryClientProvider>
//   //   );

//   //   // Assert that the error message is rendered
//   //   expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
//   // });
// });