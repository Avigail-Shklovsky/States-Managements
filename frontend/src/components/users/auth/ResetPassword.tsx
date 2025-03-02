import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useResetPasswordApi } from "../../../hooks/auth/useResetPasswordApi";
import ResetPasswordForm from "./ResetPasswordForm";
import toast from "react-hot-toast";

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [resetSuccess, setResetSuccess] = useState(false);
  const mutation = useResetPasswordApi();

  const handleSubmit = async (values: { password: string }) => {
    if (token) {
      mutation.mutate(
        { token, password: values.password },
        {
          onSuccess: () => {
            setResetSuccess(true);
            toast.success("Password reset successfully");
            navigate(`/signin`);
          },
        }
      );
    }
  };

  return (
    <div className="container">
      <div className="formWrapper">
        <Typography variant="h4" gutterBottom className="title">
          Reset Password
        </Typography>
        {resetSuccess ? (
          <Typography variant="body1" color="success">
            Password reset successfully! Redirecting...
          </Typography>
        ) : (
          <ResetPasswordForm onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
