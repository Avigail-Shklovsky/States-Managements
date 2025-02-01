import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { FormValues } from "../types/formValues";
import { useNavigate, useParams } from "react-router-dom";
import { IState } from "../types/state";
import ConfirmModal from "./ConfirmModal";
import { useRecoilState } from "recoil";
import { currentNameStateState } from "../context/atom";
import { useStateAPI } from "../hooks/useStateAPI";
import { useModal } from "../hooks/useModal";
import { useQueryStateById } from "../hooks/useQueryStateById";
import { useState, useEffect } from "react";
import "./StateForm.scss";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  flag: Yup.string().required("Flag URL is required"),
  population: Yup.number()
    .positive("Population must be a positive number")
    .required("Population is required"),
  region: Yup.string().required("Region is required"),
});

const StateForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setName] = useRecoilState(currentNameStateState);

  const { handleSaveState } = useStateAPI(id);
  const { isModalOpen, openModal, closeModal } = useModal();

  const stateData = useQueryStateById(id);

  const [initialValues, setInitialValues] = useState<FormValues>({
    name: "",
    flag: "",
    population: 0,
    region: "",
  });

  useEffect(() => {
    if (stateData) {
      setInitialValues({
        name: stateData.name,
        flag: stateData.flag,
        population: stateData.population,
        region: stateData.region,
      });
    }
  }, [stateData]);

  const handleSubmit = async (values: FormValues) => {
    await handleSaveState(values as unknown as IState);
    setName("");
    navigate(`/`);
  };

  return (
    <div data-testid="state-form">
      <div className="container">
        <div className="formWrapper">
          <Typography variant="h4" gutterBottom className="title">
            {id ? "Update State" : "Create State"}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
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
                  error={
                    Boolean(errors.population) && Boolean(touched.population)
                  }
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

export default StateForm;
