
import { Router } from 'express';
import carsController from './cars.controller';

const router = Router();

// Define your user routes here
router
  .route('/')
  .get(carsController.list.bind(carsController))
  .post(carsController.create.bind(carsController));

router
  .route('/:id')
  .get(carsController.getById.bind(carsController))
  .put(carsController.update.bind(carsController))
  .delete(carsController.delete.bind(carsController));

export default router;
  