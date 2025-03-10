import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useForgotPasswordApi } from "../../../hooks/auth/useForgotPasswordApi";
import { FORGOT_PASSWORD, USER_PROPS, USER_PROPS_FORMAL, YUP_ERRORS_AUTH } from "../../../constants";

const validationSchema = Yup.object().shape({
  email: Yup.string().email(YUP_ERRORS_AUTH.EMAIL_FORMAT).required(YUP_ERRORS_AUTH.EMAIL),
});

const ForgotPassword: React.FC = () => {
  const { mutate, isPending } = useForgotPasswordApi(); 
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (
    values: { email: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    mutate(values, {
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
      {FORGOT_PASSWORD.TITLE}
        </Typography>
        {emailSent ? (
          <Typography variant="body1" color="success">
            {FORGOT_PASSWORD.MESSAGE_AFTER_SEND}
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
                  name={USER_PROPS.EMAIL}
                  as={TextField}
                  variant="outlined"
                  label={USER_PROPS_FORMAL.EMAIL}
                  fullWidth
                  error={Boolean(errors.email) && Boolean(touched.email)}
                  helperText={touched.email && errors.email}
                />
                <Box height={14} />

                <Button type="submit" variant="contained" color="primary" size="large">
                  {isPending ? FORGOT_PASSWORD.SENDING: FORGOT_PASSWORD.SUBMIT}
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
