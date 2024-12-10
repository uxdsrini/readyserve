import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { seedDatabase } from './seedData';

export async function initializeApp() {
  try {
    // Check if data exists
    const recipesQuery = query(
      collection(db, 'recipes'),
      where('status', '==', 'published')
    );
    const snapshot = await getDocs(recipesQuery);

    // If no data exists, seed the database
    if (snapshot.empty) {
      await seedDatabase();
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}