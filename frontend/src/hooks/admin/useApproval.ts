// useApproval.ts
import { useRef, useEffect } from "react";
import { IUser } from "../../types/user";
import { useUpdateUserAuth } from "../../hooks/users/useUpdateUserAuth";

const useApproval = (userId: string | null, permissionType: string | null, isApproved: boolean, isLoading: boolean) => {
  const prevUpdatedUser = useRef<IUser | null>(null);
  const { mutation, updatedUser: newUser } = useUpdateUserAuth(userId ?? "", permissionType ?? "");
  const { mutate: updateUserAuth } = mutation;

  useEffect(() => {
    if (userId && isApproved && !isLoading && newUser) {
      if (JSON.stringify(prevUpdatedUser.current) !== JSON.stringify(newUser)) {
        updateUserAuth(newUser);
        prevUpdatedUser.current = newUser;
      }
    }
  }, [userId, isApproved, isLoading, newUser, updateUserAuth]);
};

export default useApproval;
