import { useState, useEffect } from "react";
import { Types } from "mongoose";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../context/atom";
import { usePermissionRequest } from "../../hooks/messages/usePermissionRequest";
import { usePendingPermissionRequest } from "../../hooks/messages/usePendingPermissionRequest";

const validPermissions = ["read", "create", "update", "delete"];

export const usePermissionForm = () => {
  const [permission, setPermission] = useState<string>("");
  const [error, setError] = useState<string>("");
  const currentUser = useRecoilValue(currentUserState);
  const permissionRequest = usePermissionRequest();
  const isPending = usePendingPermissionRequest(permission);

  useEffect(() => {
    if (!currentUser) {
      console.log("You must be logged in to request permissions");
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!permission) {
      setError("Please select a permission");
      return;
    }
    if (isPending) {
      setError("Your request for this permission is still pending. Please wait.");
      return;
    }
    const message = {
      _id: new Types.ObjectId(),
      userId: currentUser!._id.toString(),
      actionType: permission,
      read: false,
      approved: false,
      dateOpen: new Date(),
      dateClose: new Date(),
    };
    permissionRequest.mutate(message);
  };

  return {
    permission,
    error,
    setPermission,
    handleSubmit,
    currentUser,
    userPermissions: currentUser?.auth || [],
    validPermissions,
  };
};
