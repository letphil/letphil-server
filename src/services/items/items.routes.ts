import { Router } from 'express';

const router = Router();

// Define your user routes here
router
  .get('/', (req, res) => {
    res.send('Get all items');
  })
  .post('/', (req, res) => {})
  .put('/:id', (req, res) => {})
  .delete('/:id', (req, res) => {});

export default router;
