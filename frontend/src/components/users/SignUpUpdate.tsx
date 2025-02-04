import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { SignUpFormValues } from "../../types/signUpFormValues";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../states/ConfirmModal";
import { useRecoilState } from "recoil";
import { currentNameStateState } from "../../context/atom";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import "../states/StateForm.scss";
import { FileField } from "../FileFieldInput";
import { useSignUpApi } from "../../hooks/useSignUpApi";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  profileImage: Yup.mixed()
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true; // Allow empty file (optional)
      return value instanceof File;
    }),
});

const SignUpUpdate: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setName] = useRecoilState(currentNameStateState);

  const { handleSignUp } = useSignUpApi(id);
  const { isModalOpen, openModal, closeModal } = useModal();

  //   const stateData = useQueryStateById(id);

  const [initialValues] = useState<SignUpFormValues>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    profileImage: "",
    password: "",
    changedDate: new Date(), // Initialize with current date
    auth: ["read"],
  });


  //   useEffect(() => {
  //     if (stateData) {
  //       setInitialValues({
  //         name: stateData.name,
  //         flag: stateData.flag,
  //         population: stateData.population,
  //         region: stateData.region,
  //       });
  //     }
  //   }, [stateData]);

  const handleSubmit = async (values: SignUpFormValues) => {
    const formData = new FormData();
  
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("userName", values.userName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("password", values.password);
    formData.append("changedDate", values.changedDate.toISOString());
    formData.append("auth", JSON.stringify(values.auth));
  
   // Ensure profileImage is a File
  if (values.profileImage && values.profileImage as any instanceof File) {
    formData.append("profileImage", values.profileImage);
  } else {
    console.error("No file uploaded or invalid file format:", values.profileImage);
  }

  // 🔹 Log FormData properly
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
    try {      
      await handleSignUp(formData); // Ensure this function supports FormData
      navigate(`/`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  return (
    <div data-testid="state-form">
      <div className="container">
        <div className="formWrapper">
          <Typography variant="h4" gutterBottom className="title">
            Sign Up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ dirty, touched, errors }) => (
              <Form>
                <Field
                  name="firstName"
                  type="firstName"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="First Name"
                  fullWidth
                  error={Boolean(errors.firstName) && Boolean(touched.firstName)}
                  helperText={Boolean(touched.firstName) && errors.firstName}
                />
                <Box height={14} />

                <Field
                  name="lastName"
                  type="lastName"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Last Name"
                  fullWidth
                  error={Boolean(errors.lastName) && Boolean(touched.lastName)}
                  helperText={Boolean(touched.lastName) && errors.lastName}
                />
                <Box height={14} />

                <Field
                  name="userName"
                  type="userName"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Username"
                  fullWidth
                  error={
                    Boolean(errors.userName) && Boolean(touched.userName)
                  }
                  helperText={Boolean(touched.userName) && errors.userName}
                />
                <Box height={14} />

                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Email"
                  fullWidth
                  error={Boolean(errors.email) && Boolean(touched.email)}
                  helperText={Boolean(touched.email) && errors.email}
                />
                <Box height={14} />

                <Field
                  name="phone"
                  type="phone"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Phone"
                  fullWidth
                  error={Boolean(errors.phone) && Boolean(touched.phone)}
                  helperText={Boolean(touched.phone) && errors.phone}
                />
                <Box height={14} />

                <Field
                  name="password"
                  type="password"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Password"
                  fullWidth
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  helperText={Boolean(touched.password) && errors.password}
                />
                <Box height={14} />

                {/* <Field
                  name="profileImage"
                  type="file"
                //   as={FileField}
                  variant="outlined"
                  color="primary"
                  label="Profile Image"
                  fullWidth
                  error={Boolean(errors.phone) && Boolean(touched.phone)}
                  helperText={Boolean(touched.phone) && errors.phone}
                /> */}
                {/* <Field
                  name="profileImage"
                  label="Upload Profile Image"
                  component={FileField}
                  error={Boolean(errors.phone) && Boolean(touched.phone)}
                  helperText={Boolean(touched.phone) && errors.phone}
                /> */}

<Field name="profileImage" label="Upload Profile Image" component={FileField} />

                <Box height={14} />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                // disabled={!dirty || !isValid}
                >
                  Sign Up
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => {
                    if (dirty) openModal();
                    else navigate(`/`);
                  }}
                >
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
          <ConfirmModal
            type="cancel"
            open={isModalOpen}
            onClose={closeModal}
            onConfirm={() => {
              navigate("/");
              setName("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpUpdate;


