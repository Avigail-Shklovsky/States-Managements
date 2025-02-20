import { renderHook } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { vi } from "vitest";
import useAdminAuth from "../../../hooks/auth/useAdminAuth";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("useAdminAuth", () => {
  //@ts-ignore
  let navigateMock: vi.Mock;

  beforeEach(() => {
    navigateMock = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigateMock);
    localStorage.clear();
  });

  it("should return true for admin user", () => {
    localStorage.setItem("user", JSON.stringify({ email: "9013825@gmail.com" }));
    
    const { result } = renderHook(() => useAdminAuth(), { wrapper: MemoryRouter });
    
    expect(result.current).toBe(true);
  });

  it("should redirect for non-admin user", () => {
    localStorage.setItem("user", JSON.stringify({ email: "notadmin@gmail.com" }));
    
    renderHook(() => useAdminAuth(), { wrapper: MemoryRouter });
    
    expect(navigateMock).toHaveBeenCalledWith("/unauthorized");
  });

  it("should not redirect if redirectOnFail is false", () => {
    localStorage.setItem("user", JSON.stringify({ email: "notadmin@gmail.com" }));
    
    const { result } = renderHook(() => useAdminAuth(false), { wrapper: MemoryRouter });
    
    expect(navigateMock).not.toHaveBeenCalled();
    expect(result.current).toBe(false);
  });

  it("should redirect if no user is found", () => {
    renderHook(() => useAdminAuth(), { wrapper: MemoryRouter });
    
    expect(navigateMock).toHaveBeenCalledWith("/unauthorized");
  });
});
