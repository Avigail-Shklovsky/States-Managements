import { Formik, FormikValues, FormikHelpers, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material"; 

interface FormValues {
  name: string;
  flag: string;
  population: number;
  region: string;
}

const StateForm: React.FC = () => {
  const initialValues: FormValues = {
    name: "",
    flag: "",
    population: 0,
    region: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    flag: Yup.string().required("Flag URL is required"),
    population: Yup.number()
      .positive("Population must be a positive number")
      .required("Population is required"),
    region: Yup.string().required("Region is required"),
  });

  const handleSubmit = (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 500);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ dirty, touched, errors, isValid }) => (
        <Form>
          <Field
            name="name"
            type="name"
            as={TextField}
            variant="outlined"
            color="primary"
            label="Name"
            fullWidth
            error={Boolean(errors.name) && Boolean(touched.name)}
            helperText={Boolean(touched.name) && errors.name}
          />
          <Box height={14} />

          <Field
            name="flag"
            type="flag"
            as={TextField}
            variant="outlined"
            color="primary"
            label="Flag"
            fullWidth
            error={Boolean(errors.flag) && Boolean(touched.flag)}
            helperText={Boolean(touched.flag) && errors.flag}
          />
          <Box height={14} />

          <Field
            name="population"
            type="number"
            as={TextField}
            variant="outlined"
            color="primary"
            label="Population"
            fullWidth
            error={Boolean(errors.population) && Boolean(touched.population)}
            helperText={Boolean(touched.population) && errors.population}
          />
          <Box height={14} />

          <Field
            name="region"
            type="name"
            as={TextField}
            variant="outlined"
            color="primary"
            label="Region"
            fullWidth
            error={Boolean(errors.region) && Boolean(touched.region)}
            helperText={Boolean(touched.region) && errors.region}
          />
          <Box height={14} />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={!isValid || !dirty}
          >
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default StateForm;
