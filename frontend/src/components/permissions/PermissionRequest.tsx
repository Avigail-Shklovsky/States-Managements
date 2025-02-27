import React from "react";
import { Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from "@mui/material";
import { usePermissionForm } from "../../hooks/messages/usePermissionForm";

const PermissionRequestForm: React.FC = () => {
  const { permission, error, setPermission, handleSubmit, userPermissions, validPermissions } = usePermissionForm();

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
                  <li key={index}>{perm.charAt(0).toUpperCase() + perm.slice(1)}</li>
                ))
              ) : (
                <li>No permissions assigned yet.</li>
              )}
            </ul>
          </div>

          <FormControl component="fieldset" fullWidth required>
            <FormLabel component="legend">Select Requested Permission</FormLabel>
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