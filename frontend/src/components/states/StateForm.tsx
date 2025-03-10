import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { FormValues } from "../../types/formValues";
import { useNavigate, useParams } from "react-router-dom";
import { IState } from "../../types/state";
import ConfirmModal from "./ConfirmModal";
import { useRecoilState } from "recoil";
import { currentNameStateState } from "../../context/atom";
import { useModal } from "../../hooks/useModal";
import { useState, useEffect } from "react";
import "./StateForm.scss";
import { useStateAPI } from "../../hooks/states/useStateAPI";
import { useQueryStateById } from "../../hooks/states/useQueryStateById";
import { Types } from "mongoose";
import { BASE_ACTIONS, STATE_EDIT_CREATE, YUP_ERRORS_STATE } from "../../constants";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(YUP_ERRORS_STATE.NAME),
  flag: Yup.string().required(YUP_ERRORS_STATE.FLAG),
  population: Yup.number()
    .positive(YUP_ERRORS_STATE.POPULATION_POSITIVE)
    .required(YUP_ERRORS_STATE.POPULATION),
  region: Yup.string().required(YUP_ERRORS_STATE.REGION),
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

  const handleCancel = (isDirty: boolean) => {
    if (isDirty) {
      openModal();
    } else {
      navigate("/");
      setName("");
    }
  };

  const handleSubmit = async (values: FormValues) => {
    const formattedState: IState = {
      _id: new Types.ObjectId(),
      name: values.name,
      flag: values.flag,
      population: values.population,
      region: values.region,
      cities: [],
    };
    await handleSaveState(formattedState);
    setName("");
    navigate(`/`);
  };

  return (
    <div data-testid="state-form">
      <div className="container">
        <div className="formWrapper">
          <Typography variant="h4" gutterBottom className="title">
            {id ?  STATE_EDIT_CREATE.UPDATE:STATE_EDIT_CREATE.CREATE}
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
            {id ?  STATE_EDIT_CREATE.UPDATE:STATE_EDIT_CREATE.CREATE}
            </Button>

                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => handleCancel(dirty)}
                >
                 {BASE_ACTIONS.CANCEL}
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
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StateForm;
