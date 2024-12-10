import React from 'react';
import { Coffee } from 'lucide-react';
import { Recipe } from '../../types/recipe';
import RecipeCard from '../RecipeCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface RecipeGridProps {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

export default function RecipeGrid({ recipes, loading, error }: RecipeGridProps) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Coffee className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading recipes</h3>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <Coffee className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes available</h3>
        <p className="text-gray-500">Check back later for more delicious options!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}