import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { useSignInApi } from "../../hooks/auth/useSignInApi";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useSignInApi();
  const { handleLoginLocalStorage } = useAuth();

  const handleSubmit = async (
    values: { userName: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    mutation.mutate(values, {
      onSuccess: (response) => {
        handleLoginLocalStorage(response);
        navigate("/");
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
          Sign In
        </Typography>
        <Formik
          initialValues={{ userName: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <Field
                name="userName"
                as={TextField}
                variant="outlined"
                label="Username"
                fullWidth
                error={Boolean(errors.userName) && Boolean(touched.userName)}
                helperText={touched.userName && errors.userName}
              />
              <Box height={14} />

              <Field
                name="password"
                type="password"
                as={TextField}
                variant="outlined"
                label="Password"
                fullWidth
                error={Boolean(errors.password) && Boolean(touched.password)}
                helperText={touched.password && errors.password}
              />
              <Box height={14} />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                {mutation.isPending ? "Signing in..." : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>

        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Sign up here
            </Link>
          </Typography>
        </Box>

        <Box mt={1} textAlign="center">
          <Link
            to="/forgot-password"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            <Typography variant="body2"> Forgot Password?</Typography>
          </Link>
        </Box>
      </div>
    </div>
  );
};

export default SignIn;
