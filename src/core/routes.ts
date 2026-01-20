import { Router } from 'express';

// ---------------- Services Import --------------------
import usersRoutes from '../services/users/users.routes';

const router = Router();

// ------------- Services Registration -----------------
  router.use('/users', usersRoutes);

export default router;
