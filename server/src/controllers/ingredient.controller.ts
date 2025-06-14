import { Request, Response } from 'express';
import { Ingredient } from '../models/ingredient.model';

interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const addIngredient = async (req: AuthRequest, res: Response) => {
  try {
    const { name, quantity, unit, category, expiryDate } = req.body;
    const userId = req.user?.userId;

    const ingredient = new Ingredient({
      name,
      quantity,
      unit,
      category,
      expiryDate,
      userId,
    });

    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: 'Error adding ingredient', error });
  }
};

export const getIngredients = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const ingredients = await Ingredient.find({ userId });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ingredients', error });
  }
};

export const updateIngredient = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity, unit, expiryDate } = req.body;
    const userId = req.user?.userId;

    const ingredient = await Ingredient.findOneAndUpdate(
      { _id: id, userId },
      { quantity, unit, expiryDate },
      { new: true }
    );

    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ingredient', error });
  }
};

export const deleteIngredient = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const ingredient = await Ingredient.findOneAndDelete({ _id: id, userId });

    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.json({ message: 'Ingredient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ingredient', error });
  }
};

export const getExpiringIngredients = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const expiringIngredients = await Ingredient.find({
      userId,
      expiryDate: {
        $gte: today,
        $lte: weekFromNow,
      },
    });

    res.json(expiringIngredients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expiring ingredients', error });
  }
}; 