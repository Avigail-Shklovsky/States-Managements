import { renderHook, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useAuth } from "../../../hooks/auth/useAuth";

describe("useAuth Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize user from localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ id: 1, name: "Test User" }));

    const { result } = renderHook(() => useAuth(), { wrapper: RecoilRoot });

    expect(result.current.user).toEqual({ id: 1, name: "Test User" });
  });

  it("should store user in localStorage and update Recoil state on login", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: RecoilRoot });

    act(() => {
      result.current.handleLoginLocalStorage({ user: { id: 2, name: "New User" } });
    });

    expect(localStorage.getItem("user")).toBe(JSON.stringify({ id: 2, name: "New User" }));
    expect(result.current.user).toEqual({ id: 2, name: "New User" });
  });

  it("should clear localStorage and reset user state on logout", () => {
    localStorage.setItem("user", JSON.stringify({ id: 3, name: "Logout User" }));
    
    const { result } = renderHook(() => useAuth(), { wrapper: RecoilRoot });

    act(() => {
      result.current.logout();
    });

    expect(localStorage.getItem("user")).toBeNull();
    expect(result.current.user).toBeNull();
  });
});
