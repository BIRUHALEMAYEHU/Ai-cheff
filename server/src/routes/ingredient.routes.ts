import express from 'express';
import { auth } from '../middleware/auth.middleware';
import {
  addIngredient,
  getIngredients,
  updateIngredient,
  deleteIngredient,
  getExpiringIngredients,
} from '../controllers/ingredient.controller';

const router = express.Router();

// All routes are protected
router.use(auth);

router.post('/', addIngredient);
router.get('/', getIngredients);
router.get('/expiring', getExpiringIngredients);
router.patch('/:id', updateIngredient);
router.delete('/:id', deleteIngredient);

export const ingredientRouter = router; 