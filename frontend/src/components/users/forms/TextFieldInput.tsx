import { Field } from "formik";
import { TextField, Box } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import { SignUpFormValues } from "../../../types/signUpFormValues";

interface TextFieldInputProps {
  name: keyof SignUpFormValues;
  label: string;
  type?: string;
  errors: FormikErrors<SignUpFormValues>;
  touched: FormikTouched<SignUpFormValues>;
}

const TextFieldInput: React.FC<TextFieldInputProps> = ({ name, label, type = "text", errors, touched }) => {
  const errorMessage = errors[name] as string | undefined;
  const isTouched = touched[name] as boolean | undefined;

  return (
    <Box sx={{ width: "100%", marginBottom: 2 }}>
      <Field
        name={name}
        as={TextField}
        type={type}
        variant="outlined"
        label={label}
        fullWidth
        size="medium"
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#ccc" },
            "&:hover fieldset": { borderColor: "primary.main" },
            "&.Mui-focused fieldset": { borderColor: "primary.main" },
          },
        }}
        error={Boolean(errorMessage) && Boolean(isTouched)}
        helperText={isTouched && errorMessage}
      />
    </Box>
  );
};

export default TextFieldInput;
