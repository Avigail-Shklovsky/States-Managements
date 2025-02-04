import { Box, Button, Input, Typography } from "@mui/material";
import { FieldProps } from "formik";
import { useState } from "react";

interface FileFieldProps extends FieldProps {
  label: string;
}

export const FileField: React.FC<FileFieldProps> = ({ field, form, label }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    form.setFieldValue(field.name, file); // Update Formik state
    setFileName(file ? file.name : null); // Store file name for indicator
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
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

      {/* Show checkmark and file name if a file is uploaded */}
      {fileName && (
        <Typography color="success.main">
            <Typography sx={{ color: "green" }}>✔ {fileName}</Typography>  
        </Typography>
      )}
    </Box>
  );
};
