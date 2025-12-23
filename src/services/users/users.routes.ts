import { Router } from 'express';
import usersController from './users.controller';

const router = Router();

// Define your user routes here
router
  .route('/')
  .get(usersController.list.bind(usersController))
  .post(usersController.create.bind(usersController));

router
  .route('/:id')
  .get(usersController.getById.bind(usersController))
  .put(usersController.update.bind(usersController))
  .delete(usersController.delete.bind(usersController));

export default router;
