// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { TextField, Button, Box, Typography } from "@mui/material";
// import { SignUpFormValues } from "../../types/signUpFormValues";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useState } from "react";
// import "../states/StateForm.scss";
// import { FileField } from "../FileFieldInput";
// import { useSignUpApi } from "../../hooks/useSignUpApi";
// import { useAuth } from "../../hooks/useAuth";

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required("First Name is required"),
//   lastName: Yup.string().required("Last Name is required"),
//   userName: Yup.string().required("Username is required"),
//   phone: Yup.string()
//     .matches(/^\d{7,15}$/, "Phone number must be 7-15 digits")
//     .required("Phone number is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   profileImage: Yup.mixed()
//     .test("required", "Profile image is required", (value) => {
//       return value && value instanceof File;
//     })
//     .test("fileType", "Only image files are allowed", (value) => {
//       return value instanceof File && ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
//     }),
// });


// const SignUpUpdate: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { handleSignUp } = useSignUpApi(id);
//   const { handleLoginLocalStorage } = useAuth();

//   //   const stateData = useQueryStateById(id);

//   const [initialValues] = useState<SignUpFormValues>({
//     firstName: "",
//     lastName: "",
//     userName: "",
//     email: "",
//     phone: "",
//     profileImage: "",
//     password: "",
//     changedDate: new Date(), // Initialize with current date
//     auth: ["read"],
//   });


//   //   useEffect(() => {
//   //     if (stateData) {
//   //       setInitialValues({
//   //         name: stateData.name,
//   //         flag: stateData.flag,
//   //         population: stateData.population,
//   //         region: stateData.region,
//   //       });
//   //     }
//   //   }, [stateData]);

//   const handleSubmit = async (values: SignUpFormValues) => {
//     const formData = new FormData();

//     formData.append("firstName", values.firstName);
//     formData.append("lastName", values.lastName);
//     formData.append("userName", values.userName);
//     formData.append("email", values.email);
//     formData.append("phone", values.phone);
//     formData.append("password", values.password);
//     formData.append("changedDate", values.changedDate.toISOString());
//     formData.append("auth", JSON.stringify(values.auth));

//     // Ensure profileImage is a File
//     if (values.profileImage && values.profileImage as any instanceof File) {
//       formData.append("profileImage", values.profileImage);
//     } else {
//       console.error("No file uploaded or invalid file format:", values.profileImage);
//     }

//     for (const [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }
//     try {
//      const response =  await handleSignUp(formData); // Ensure this function supports FormData
//      handleLoginLocalStorage(response)
//       navigate(`/`);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <div data-testid="state-form">
//       <div className="container">
//         <div className="formWrapper">
//           <Typography variant="h4" gutterBottom className="title">
//             Sign Up
//           </Typography>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             enableReinitialize
//             onSubmit={handleSubmit}
//           >
//             {({ touched, errors }) => (
//               <Form>
//                 <Field
//                   name="firstName"
//                   type="firstName"
//                   as={TextField}
//                   variant="outlined"
//                   color="primary"
//                   label="First Name"
//                   fullWidth
//                   error={Boolean(errors.firstName) && Boolean(touched.firstName)}
//                   helperText={Boolean(touched.firstName) && errors.firstName}
//                 />
//                 <Box height={14} />

//                 <Field
//                   name="lastName"
//                   type="lastName"
//                   as={TextField}
//                   variant="outlined"
//                   color="primary"
//                   label="Last Name"
//                   fullWidth
//                   error={Boolean(errors.lastName) && Boolean(touched.lastName)}
//                   helperText={Boolean(touched.lastName) && errors.lastName}
//                 />
//                 <Box height={14} />

//                 <Field
//                   name="userName"
//                   type="userName"
//                   as={TextField}
//                   variant="outlined"
//                   color="primary"
//                   label="Username"
//                   fullWidth
//                   error={
//                     Boolean(errors.userName) && Boolean(touched.userName)
//                   }
//                   helperText={Boolean(touched.userName) && errors.userName}
//                 />
//                 <Box height={14} />

//                 <Field
//                   name="email"
//                   type="email"
//                   as={TextField}
//                   variant="outlined"
//                   color="primary"
//                   label="Email"
//                   fullWidth
//                   error={Boolean(errors.email) && Boolean(touched.email)}
//                   helperText={Boolean(touched.email) && errors.email}
//                 />
//                 <Box height={14} />

//                 <Field
//                   name="phone"
//                   type="phone"
//                   as={TextField}
//                   variant="outlined"
//                   color="primary"
//                   label="Phone"
//                   fullWidth
//                   error={Boolean(errors.phone) && Boolean(touched.phone)}
//                   helperText={Boolean(touched.phone) && errors.phone}
//                 />
//                 <Box height={14} />

//                 <Field
//                   name="password"
//                   type="password"
//                   as={TextField}
//                   variant="outlined"
//                   color="primary"
//                   label="Password"
//                   fullWidth
//                   error={Boolean(errors.password) && Boolean(touched.password)}
//                   helperText={Boolean(touched.password) && errors.password}
//                 />
//                 <Box height={14} />


//                 <Field name="profileImage" label="Upload Profile Image" component={FileField} error={Boolean(errors.profileImage) && Boolean(touched.profileImage)}
//                   helperText={Boolean(touched.profileImage) && errors.profileImage} />

//                 <Box height={14} />

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   size="large"
//                 // disabled={!dirty || !isValid}
//                 >
//                   Sign Up
//                 </Button>

//                 <Box mt={2} textAlign="center">
//                   <Typography variant="body2">
//                     Already have an account?{" "}
//                     <Link to="/signin" style={{ textDecoration: "none", color: "#1976d2" }}>
//                       Sign in here
//                     </Link>
//                   </Typography>
//                 </Box>


//               </Form>
//             )}
//           </Formik>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpUpdate;


import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSignUpApi } from "../../hooks/useSignUpApi";
import { useAuth } from "../../hooks/useAuth";
import { FileField } from "../FileFieldInput";
import { SignUpFormValues } from "../../types/signUpFormValues";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  userName: Yup.string().required("Username is required"),
  phone: Yup.string()
    .matches(/^\d{7,15}$/, "Phone number must be 7-15 digits")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  profileImage: Yup.mixed()
    .test("required", "Profile image is required", (value) => {
      return value && value instanceof File;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      return value instanceof File && ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    }),
});

const SignUpUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: handleSignUp, isPending } = useSignUpApi();
  const { handleLoginLocalStorage } = useAuth();

  const [initialValues] = useState<SignUpFormValues>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    profileImage: "",
    password: "",
    changedDate: new Date(),
    auth: ["read"],
  });

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

    if (values.profileImage && values.profileImage as any instanceof File) {
      formData.append("profileImage", values.profileImage);
    }

    handleSignUp(formData, {
      onSuccess: (response) => {
        handleLoginLocalStorage(response);
        navigate(`/`);
      },
    });
  };

  return (
    <div data-testid="state-form">
      <div className="container">
        <div className="formWrapper">
          <Typography variant="h4" gutterBottom className="title">
            Sign Up
          </Typography>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ touched, errors }) => (
              <Form>
                <Field
                  name="firstName"
                  as={TextField}
                  variant="outlined"
                  label="First Name"
                  fullWidth
                  error={Boolean(errors.firstName) && Boolean(touched.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <Box height={14} />

                <Field
                  name="lastName"
                  as={TextField}
                  variant="outlined"
                  label="Last Name"
                  fullWidth
                  error={Boolean(errors.lastName) && Boolean(touched.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <Box height={14} />

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

                <Field name="profileImage" label="Upload Profile Image" component={FileField} />

                <Box height={14} />

                <Button type="submit" variant="contained" color="primary" size="large" disabled={isPending}>
                  {isPending ? "Signing Up..." : "Sign Up"}
                </Button>

                <Box mt={2} textAlign="center">
                  <Typography variant="body2">
                    Already have an account?{" "}
                    <Link to="/signin" style={{ textDecoration: "none", color: "#1976d2" }}>
                      Sign in here
                    </Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUpUpdate;
