
import { Router } from 'express';
import itemsController from './items.controller';

const router = Router();

// Define your user routes here
router
  .route('/')
  .get(itemsController.list.bind(itemsController))
  .post(itemsController.create.bind(itemsController));

router
  .route('/:id')
  .get(itemsController.getById.bind(itemsController))
  .put(itemsController.update.bind(itemsController))
  .delete(itemsController.delete.bind(itemsController));

export default router;
  