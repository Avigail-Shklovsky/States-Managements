import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { FileField } from "../FileFieldInput";
import { SignUpFormValues } from "../../types/signUpFormValues";
import { useLocation } from "react-router-dom";
import { useSignUpApi } from "../../hooks/auth/useSignUpApi";
import { useUpdateProfileApi } from "../../hooks/users/useUpdateProfileApi";
import { useQueryUserById } from "../../hooks/users/useQueryUserbyId";

type Props = {
  mode: "signup" | "edit";
  user?: SignUpFormValues | null;
  userId?: string;
};

const SignUpUpdate: React.FC<Props> = ({ mode, user = null,userId="" }) => {
  const { id } = useParams();
  const userData = useQueryUserById(id);

  const navigate = useNavigate();
  const { mutate: handleSignUp, isPending: isSignUpPending } = useSignUpApi();
  const { mutate: handleUpdateProfile, isPending: isUpdatePending } =
    useUpdateProfileApi();
  const { handleLoginLocalStorage } = useAuth();
  const location = useLocation();
  const [initialValues, setInitialValues] = useState<SignUpFormValues>(
    user ?? {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      phone: "",
      profileImage: "",
      password: "",
      changedDate: new Date(),
      auth: ["read"],
      messages: [],
    }
  );

  useEffect(() => {
    if (mode === "edit" && location.state?.user && !id) {
      setInitialValues(location.state.user);
    } else if (mode === "edit" && userData) {
      setInitialValues(userData);
    }
  }, [mode, location.state]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string().required("Username is required"),
    phone: Yup.string()
      .matches(/^\d{7,15}$/, "Phone number must be 7-15 digits")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password:
      mode === "signup"
        ? Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required")
        : Yup.string().notRequired(),
    profileImage:
      mode === "signup"
        ? Yup.mixed()
            .test(
              "required",
              "Profile image is required",
              (value) => value instanceof File
            )
            .test(
              "fileType",
              "Only image files are allowed",
              (value) =>
                value instanceof File &&
                ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
            )
        : Yup.mixed().notRequired(),
  });

  const handleSubmit = async (values: SignUpFormValues) => {
    
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "profileImage") {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (mode === "edit" && initialValues.profileImage) {
          formData.append(key, initialValues.profileImage);
        }
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item)); 
      } else if (value) {
        formData.append(key, value.toString());
      }
    });
    

    if (mode === "signup") {
      handleSignUp(formData, {
        onSuccess: (response) => {
          handleLoginLocalStorage(response);
          navigate("/");
        },
      });
    } else {
      if (user) {
        try {
          handleUpdateProfile({ userId, formData });
          navigate(-1);
        } catch (error) {
          console.error("Failed to update profile:", error);
        }
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: { xs: 0, md: 2 }, mb: { xs: 2, md: 4 } }}>
      <div data-testid="state-form">
        <div className="container">
          <div className="formWrapper">
            <Typography variant="h4" gutterBottom className="title">
              {mode === "signup" ? "Sign Up" : "Edit Profile"}
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ touched, errors }) => (
                <Form>
                  <Field
                    name="firstName"
                    as={TextField}
                    variant="outlined"
                    label="First Name"
                    fullWidth
                    error={
                      Boolean(errors.firstName) && Boolean(touched.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                  />
                  <Box height={14} />
                  <Field
                    name="lastName"
                    as={TextField}
                    variant="outlined"
                    label="Last Name"
                    fullWidth
                    error={
                      Boolean(errors.lastName) && Boolean(touched.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                  />
                  <Box height={14} />
                  <Field
                    name="userName"
                    as={TextField}
                    variant="outlined"
                    label="Username"
                    fullWidth
                    error={
                      Boolean(errors.userName) && Boolean(touched.userName)
                    }
                    helperText={touched.userName && errors.userName}
                  />
                  <Box height={14} />
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
                  <Field
                    name="phone"
                    as={TextField}
                    variant="outlined"
                    label="Phone"
                    fullWidth
                    error={Boolean(errors.phone) && Boolean(touched.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  <Box height={14} />
                  {mode === "signup" && (
                    <>
                      <Field
                        name="password"
                        type="password"
                        as={TextField}
                        variant="outlined"
                        label="Password"
                        fullWidth
                        error={
                          Boolean(errors.password) && Boolean(touched.password)
                        }
                        helperText={touched.password && errors.password}
                      />
                      <Box height={14} />
                    </>
                  )}
                  <Field
                    name="profileImage"
                    label="Upload Profile Image"
                    component={FileField}
                  />
                  <Box height={14} />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={isSignUpPending || isUpdatePending}
                    // onClick={handleSubmit}
                  >
                    {mode === "signup"
                      ? isSignUpPending
                        ? "Signing Up..."
                        : "Sign Up"
                      : isUpdatePending
                      ? "Updating..."
                      : "Update Profile"}
                  </Button>
                  {mode === "signup" && (
                    <Box mt={2} textAlign="center">
                      <Typography variant="body2">
                        Already have an account?{" "}
                        <Link
                          to="/signin"
                          style={{
                            textDecoration: "none",
                            color: "#1976d2",
                          }}
                        >
                          Sign in here
                        </Link>
                      </Typography>
                    </Box>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignUpUpdate;
