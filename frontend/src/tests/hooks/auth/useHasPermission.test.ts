import { renderHook } from "@testing-library/react";
import { useRecoilValue } from "recoil";
import useHasPermission from "../../../hooks/auth/useHasPermission";
import { vi } from "vitest";


vi.mock("recoil", () => {
  return {
    useRecoilValue: vi.fn(),
    atom: vi.fn(), 
  };
});

describe("useHasPermission", () => {
  it("should return true if the user has the permission", () => {
    const mockUser = {
      auth: ["read", "write"],
    };

    //@ts-ignore
    (useRecoilValue as vi.Mock).mockReturnValue(mockUser);

    const { result } = renderHook(() => useHasPermission("read"));

    expect(result.current).toBe(true);
  });

  it("should return false if the user does not have the permission", () => {
    const mockUser = {
      auth: ["read", "write"],
    };

    //@ts-ignore
    (useRecoilValue as vi.Mock).mockReturnValue(mockUser);

    const { result } = renderHook(() => useHasPermission("delete"));

    expect(result.current).toBe(false);
  });
});
