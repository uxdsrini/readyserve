import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Recipe, RecipeCategory } from '../types/recipe';

export function useRecipesByCategory(category: RecipeCategory) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const recipesQuery = query(
          collection(db, 'recipes'),
          where('status', '==', 'published'),
          where('category', '==', category)
        );

        const snapshot = await getDocs(recipesQuery);
        const recipesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Recipe[];

        setRecipes(recipesData);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes');
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, [category]);

  return { recipes, loading, error };
}