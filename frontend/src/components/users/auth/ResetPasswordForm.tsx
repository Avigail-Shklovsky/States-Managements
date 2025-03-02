import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material";

const validationSchema = Yup.object().shape({
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

interface ResetPasswordFormProps {
  onSubmit: (values: { password: string }) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit }) => (
  <Formik initialValues={{ password: "" }} validationSchema={validationSchema} onSubmit={onSubmit}>
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
);

export default ResetPasswordForm;
