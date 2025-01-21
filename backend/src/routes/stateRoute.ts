import express from 'express';
import { createState, getStates, updateState, deleteState, getStateById } from '../controllers/stateController';

const stateRoutes = express.Router();

stateRoutes.post('/', createState);
stateRoutes.get('/', getStates);
stateRoutes.get('/:id', getStateById);
stateRoutes.put('/:id', updateState);
stateRoutes.delete('/:id', deleteState);

export default stateRoutes;
