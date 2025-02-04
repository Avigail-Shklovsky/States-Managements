import { Box, Button, Input } from "@mui/material";
import { FieldProps } from "formik";

interface FileFieldProps extends FieldProps {
  label: string;
}

export const FileField: React.FC<FileFieldProps> = ({ field, form, label }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    form.setFieldValue(field.name, file); // Update Formik state with selected file
  };

  return (
    <Box>
      <Input
        type="file"
        onChange={handleFileChange}
        fullWidth
        inputProps={{ accept: "image/*" }}
        style={{ display: "none" }}
        id={field.name}
      />
      <label htmlFor={field.name}>
        <Button variant="outlined" color="primary" component="span">
          {label}
        </Button>
      </label>
    </Box>
  );
};
