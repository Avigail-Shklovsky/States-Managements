// import { renderHook, act } from "@testing-library/react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { vi } from "vitest";
// import { sendResetEmail } from "../../../services/api/authApi";
// import { useForgotPasswordApi } from "../../../hooks/auth/useForgotPasswordApi";

// // Mock the API function
// vi.mock("../../../services/api/authApi", () => ({
//   sendResetEmail: vi.fn(),
// }));

// describe("useForgotPasswordApi", () => {
//   let queryClient: QueryClient;

//   beforeEach(() => {
//     queryClient = new QueryClient(); // Ensure a fresh QueryClient for each test
//   });

//   const wrapper = ({ children }: { children: React.ReactNode }) => (
//     <QueryClientProvider client={queryClient}>
//     {children}
//     </QueryClientProvider>
//   );

//   it("should call sendResetEmail and handle success", async () => {
//     const mockResponse = { message: "Email sent" };
//     (sendResetEmail as jest.Mock).mockResolvedValue(mockResponse);

//     const { result } = renderHook(() => useForgotPasswordApi(), { wrapper });

//     await act(async () => {
//       result.current.mutate({ email: "test@example.com" });
//     });

//     expect(sendResetEmail).toHaveBeenCalledWith({ email: "test@example.com" });
//   });

//   it("should handle error response", async () => {
//     const mockError = new Error("Failed to send email");
//     (sendResetEmail as jest.Mock).mockRejectedValue(mockError);

//     const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

//     const { result } = renderHook(() => useForgotPasswordApi(), { wrapper });

//     await act(async () => {
//       result.current.mutate({ email: "test@example.com" });
//     });

//     expect(consoleErrorMock).toHaveBeenCalledWith(
//       "Error sending reset email:",
//       mockError
//     );

//     consoleErrorMock.mockRestore();
//   });
// });
