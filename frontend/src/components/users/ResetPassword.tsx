import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useResetPasswordApi } from "../../hooks/auth/useResetPasswordApi"; 


const validationSchema = Yup.object().shape({
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

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
          <Formik initialValues={{ password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ touched, errors }) => (
              <Form>
                <Field
                  name="password"
                  type="password"
                  as={TextField}
                  variant="outlined"
                  label="New Password"
                  fullWidth
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  helperText={touched.password && errors.password}
                />
                <Box height={14} />

                <Button type="submit" variant="contained" color="primary" size="large">
                  Reset Password
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
