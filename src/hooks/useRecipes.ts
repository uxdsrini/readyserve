import { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { db, getHomemakerRecipesQuery } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Recipe } from '../types';
import { handleFirebaseError } from '../lib/errorHandling';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const query = getHomemakerRecipesQuery(currentUser.uid);
    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const recipesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Recipe[];
        setRecipes(recipesData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        const errorMessage = handleFirebaseError(error);
        setError(errorMessage);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  return { recipes, loading, error };
}