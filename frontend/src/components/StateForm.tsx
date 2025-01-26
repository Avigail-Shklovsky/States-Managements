import { Formik, FormikValues, FormikHelpers, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material";
import { FormValues } from "../types/formValues";
import { useNavigate, useParams } from "react-router-dom";
import { addState, updateState } from "../services/statesApi";
import { IState } from "../types/state";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { useRecoilState } from "recoil";
import { currentNameStateState } from "../context/atom";
import toast from "react-hot-toast";

const StateForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setName] = useRecoilState(currentNameStateState);

  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Retrieve the state from the cache if it exists
  const cachedStates = queryClient.getQueryData<IState[]>(["states"]);
  const stateData = cachedStates?.find((state) => String(state._id) === id);

  // Set initial values based on the state data or default values
  const initialValues: FormValues = stateData || {
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

  const handleSubmit = async (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      if (id) {
        // Update state
        await updateState(values as unknown as IState);
      } else {
        // Add new state
        const result = await addState(values as unknown as IState);
        console.log(result);

        if (result._id) toast.success("State saved successfully!");
      }

      // Invalidate the query to refresh the table
      queryClient.invalidateQueries({ queryKey: ["states"] });
      setSubmitting(false);
      navigate(`/`);
      setName("");
    } catch (error) {
      toast.error(
        !id ? "The state is already existing." : "Failed to save state."
      );
      console.error("Error saving state:", error);
    }
  };
  return (
    <div>
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
              disabled={!dirty || !isValid}
            >
              {id ? "Update State" : "Create State"}
            </Button>

            <Button
              type="button"
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
      <ConfirmModal
        type="cancel"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => navigate("/")}
      />
    </div>
  );
};

export default StateForm;
