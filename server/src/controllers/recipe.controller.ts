import { Request, Response } from 'express';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';

interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const createRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const {
      name,
      description,
      ingredients,
      instructions,
      cookingTime,
      difficulty,
      servings,
      category,
      nutritionalInfo,
      imageUrl,
    } = req.body;
    const userId = req.user?.userId;

    const recipe = new Recipe({
      name,
      description,
      ingredients,
      instructions,
      cookingTime,
      difficulty,
      servings,
      category,
      nutritionalInfo,
      imageUrl,
      userId,
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error creating recipe', error });
  }
};

export const getRecipes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const recipes = await Recipe.find({ userId });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
};

export const getRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const recipe = await Recipe.findOne({ _id: id, userId });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error });
  }
};

export const updateRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const updateData = req.body;

    const recipe = await Recipe.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error });
  }
};

export const deleteRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const recipe = await Recipe.findOneAndDelete({ _id: id, userId });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error });
  }
};

export const suggestRecipes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    // Get user's ingredients
    const userIngredients = await Ingredient.find({ userId });
    const ingredientNames = userIngredients.map(ing => ing.name.toLowerCase());

    // Find recipes that can be made with available ingredients
    const recipes = await Recipe.find({ userId });
    
    const suggestedRecipes = recipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
      // Check if at least 70% of recipe ingredients are available
      const availableIngredients = recipeIngredients.filter(ing => 
        ingredientNames.some(userIng => userIng.includes(ing))
      );
      return (availableIngredients.length / recipeIngredients.length) >= 0.7;
    });

    res.json(suggestedRecipes);
  } catch (error) {
    res.status(500).json({ message: 'Error suggesting recipes', error });
  }
};

export const getRecipesByCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { category } = req.params;
    const userId = req.user?.userId;

    const recipes = await Recipe.find({
      userId,
      category: { $in: [category] },
    });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes by category', error });
  }
}; 