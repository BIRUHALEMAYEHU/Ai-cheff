import mongoose, { Document, Schema } from 'mongoose';

interface IIngredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface IRecipe extends Document {
  name: string;
  description: string;
  ingredients: IIngredient[];
  instructions: string[];
  cookingTime: number;
  difficulty: string;
  servings: number;
  category: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  imageUrl?: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const recipeSchema = new Schema<IRecipe>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [{
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
        enum: ['g', 'kg', 'ml', 'l', 'tbsp', 'tsp', 'cup', 'piece', 'slice'],
      },
    }],
    instructions: [{
      type: String,
      required: true,
    }],
    cookingTime: {
      type: Number,
      required: true,
      min: 0,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['easy', 'medium', 'hard'],
    },
    servings: {
      type: Number,
      required: true,
      min: 1,
    },
    category: [{
      type: String,
      enum: [
        'breakfast',
        'lunch',
        'dinner',
        'snack',
        'dessert',
        'vegetarian',
        'vegan',
        'gluten-free',
        'dairy-free',
      ],
    }],
    nutritionalInfo: {
      calories: {
        type: Number,
        required: true,
      },
      protein: {
        type: Number,
        required: true,
      },
      carbs: {
        type: Number,
        required: true,
      },
      fat: {
        type: Number,
        required: true,
      },
    },
    imageUrl: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
recipeSchema.index({ userId: 1, name: 1 }, { unique: true });
recipeSchema.index({ category: 1 });

export const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema); 