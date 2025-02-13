import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useForgotPasswordApi } from "../../hooks/auth/useForgotPasswordApi";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword: React.FC = () => {
  const mutation = useForgotPasswordApi();
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (
    values: { email: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    mutation.mutate(values, {
      onSuccess: () => {
        setEmailSent(true);
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="container">
      <div className="formWrapper">
        <Typography variant="h4" gutterBottom className="title">
          Forgot Password
        </Typography>
        {emailSent ? (
          <Typography variant="body1" color="success">
            If an account with that email exists, a password reset link has been
            sent.
          </Typography>
        ) : (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <Form>
                <Field
                  name="email"
                  as={TextField}
                  variant="outlined"
                  label="Email"
                  fullWidth
                  error={Boolean(errors.email) && Boolean(touched.email)}
                  helperText={touched.email && errors.email}
                />
                <Box height={14} />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  {mutation.isPending ? "Sending..." : "Send Reset Link"}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
