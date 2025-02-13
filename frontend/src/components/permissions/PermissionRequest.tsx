import React, { useEffect, useState } from "react";
import {Button,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio,Typography} from "@mui/material";
import { usePermissionRequest } from "../../hooks/messages/usePermissionRequest";
import { Types } from "mongoose";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../context/atom";
import { usePendingPermissionRequest } from "../../hooks/messages/usePendingPermissionRequest";

const validPermissions = ["read", "create", "update", "delete"];

const PermissionRequestForm: React.FC = () => {
  const [permission, setPermission] = useState<string>("");
  const [error, setError] = useState<string>("");
  const currentUser = useRecoilValue(currentUserState);

  const userPermissions = currentUser?.auth || [];
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
      setError(
        "Your request for this permission is still pending. Please wait."
      );
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

  return (
    <div className="container">
      <div className="formWrapper">
        {error && <div style={{ color: "red" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <Typography variant="h6">Your current permissions:</Typography>
            <ul>
              {userPermissions.length > 0 ? (
                userPermissions.map((perm, index) => (
                  <li key={index}>
                    {perm.charAt(0).toUpperCase() + perm.slice(1)}
                  </li>
                ))
              ) : (
                <li>No permissions assigned yet.</li>
              )}
            </ul>
          </div>

          <FormControl component="fieldset" fullWidth required>
            <FormLabel component="legend">
              Select Requested Permission
            </FormLabel>
            <RadioGroup
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
              aria-label="permission"
              name="permission"
            >
              {validPermissions.map((perm) => (
                <FormControlLabel
                  key={perm}
                  value={perm}
                  control={<Radio />}
                  label={perm.charAt(0).toUpperCase() + perm.slice(1)}
                  disabled={userPermissions.includes(perm)}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Request Permission
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PermissionRequestForm;
