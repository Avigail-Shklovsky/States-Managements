import { Formik, Form, Field } from "formik";
import { Button, Box } from "@mui/material";
import { SignUpFormValues } from "../../../types/signUpFormValues";
import { getInitialValues } from "./InitialValues";
import { validationSchema } from "../ValidationSchema";
import TextFieldInput from "./TextFieldInput";
import { FileField } from "./FileFieldInput";
import { useHandleSubmit } from "../../../hooks/users/useHandleSubmit";

type Props = {
  mode: "signup" | "edit";
  user?: SignUpFormValues | null;
  userId?: string;
};

const SignUpUpdateForm: React.FC<Props> = ({ mode, user, userId = "" }) => {
  const handleSubmit = useHandleSubmit();

  return (

        <Formik
          initialValues={getInitialValues(user)}
          validationSchema={validationSchema(mode)}
          onSubmit={(values) => handleSubmit(values, mode, userId)}
          enableReinitialize
        >
          {({ touched, errors }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  padding: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <TextFieldInput
                  name="firstName"
                  label="First Name"
                  errors={errors}
                  touched={touched}
                />
                <TextFieldInput
                  name="lastName"
                  label="Last Name"
                  errors={errors}
                  touched={touched}
                />
                <TextFieldInput
                  name="userName"
                  label="Username"
                  errors={errors}
                  touched={touched}
                />
                <TextFieldInput
                  name="email"
                  label="Email"
                  errors={errors}
                  touched={touched}
                />
                <TextFieldInput
                  name="phone"
                  label="Phone"
                  errors={errors}
                  touched={touched}
                />
                {mode === "signup" && (
                  <TextFieldInput
                    name="password"
                    label="Password"
                    type="password"
                    errors={errors}
                    touched={touched}
                  />
                )}
                <Field
                  name="profileImage"
                  component={FileField}
                  label="Upload Profile Image"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  {mode === "signup" ? "Sign Up" : "Update Profile"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
     
  );
};

export default SignUpUpdateForm;
