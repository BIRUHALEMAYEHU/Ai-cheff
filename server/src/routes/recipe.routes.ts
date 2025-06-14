import express from 'express';
import { auth } from '../middleware/auth.middleware';
import {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  suggestRecipes,
  getRecipesByCategory,
} from '../controllers/recipe.controller';

const router = express.Router();

// All routes are protected
router.use(auth);

router.post('/', createRecipe);
router.get('/', getRecipes);
router.get('/suggest', suggestRecipes);
router.get('/category/:category', getRecipesByCategory);
router.get('/:id', getRecipe);
router.patch('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export const recipeRouter = router; 