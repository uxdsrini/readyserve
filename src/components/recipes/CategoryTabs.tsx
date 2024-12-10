import React from 'react';
import { RECIPE_CATEGORIES, RecipeCategory } from '../../types/recipe';

interface CategoryTabsProps {
  selectedCategory: RecipeCategory;
  onSelectCategory: (category: RecipeCategory) => void;
}

export default function CategoryTabs({ selectedCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      {RECIPE_CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedCategory === category
              ? 'bg-orange-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}