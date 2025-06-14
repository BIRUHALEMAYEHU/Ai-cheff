import mongoose, { Document, Schema } from 'mongoose';

export interface IIngredient extends Document {
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate?: Date;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ingredientSchema = new Schema<IIngredient>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ['g', 'kg', 'ml', 'l', 'tbsp', 'tsp', 'cup', 'piece', 'slice'],
    },
    category: {
      type: String,
      required: true,
      enum: [
        'vegetables',
        'fruits',
        'meat',
        'fish',
        'dairy',
        'grains',
        'spices',
        'other',
      ],
    },
    expiryDate: {
      type: Date,
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
ingredientSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Ingredient = mongoose.model<IIngredient>('Ingredient', ingredientSchema); 