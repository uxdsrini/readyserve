export interface Recipe {
  id?: string;
  homemakerId: string;
  homemakerName?: string;
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner';
  price: number;
  cookingTime: number;
  servingSize: number;
  photos: string[];
  ingredients: {
    name: string;
    quantity: string;
    unit: string;
  }[];
  instructions: string[];
  status: 'draft' | 'published';
  dietary: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const RECIPE_CATEGORIES = ['breakfast', 'lunch', 'dinner'] as const;
export type RecipeCategory = typeof RECIPE_CATEGORIES[number];