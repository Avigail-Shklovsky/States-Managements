import * as Yup from "yup";

export const validationSchema = (mode: "signup" | "edit") =>
  Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string().required("Username is required"),
    phone: Yup.string().matches(/^\d{7,15}$/, "Phone number must be 7-15 digits").required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: mode === "signup" ? Yup.string().min(6, "Password must be at least 6 characters").required("Password is required") : Yup.string().notRequired(),
    profileImage: mode === "signup"
      ? Yup.mixed()
          .test("required", "Profile image is required", (value) => value instanceof File)
          .test("fileType", "Only image files are allowed", (value) => value instanceof File && ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
      : Yup.mixed().notRequired(),
  });
