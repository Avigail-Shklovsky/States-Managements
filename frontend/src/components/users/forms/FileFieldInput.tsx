import { Box, Button, Input, Typography } from "@mui/material";
import { FieldProps } from "formik";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

interface FileFieldProps extends FieldProps {
  label: string;
}

export const FileField: React.FC<FileFieldProps> = ({ field, form, label }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const error = form.errors[field.name];
  const touched = form.touched[field.name];
  const theme = useTheme();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    form.setFieldValue(field.name, file);
    form.setFieldTouched(field.name, true, false);
    setFileName(file ? file.name : null);
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Input
        type="file"
        onChange={handleFileChange}
        inputProps={{ accept: "image/*" }}
        style={{ display: "none" }}
        id={field.name}
      />
      <label htmlFor={field.name}>
        <Button variant="outlined" color="primary" component="span">
          {label}
        </Button>
      </label>

      {fileName && (
        <Typography sx={{ color: "green" }}>✔ {fileName}</Typography>
      )}

      {touched && error && typeof error === "string" && (
        <Typography
          sx={{ color: theme.palette.error.main, fontSize: "0.85rem" }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};
