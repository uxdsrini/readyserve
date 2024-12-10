import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, orderBy } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCNHWkjru9rL-zRkSVveGvCpxEs6niQ984",
  authDomain: "homemade-19c8d.firebaseapp.com",
  projectId: "homemade-19c8d",
  storageBucket: "homemade-19c8d.firebasestorage.app",
  messagingSenderId: "756431533342",
  appId: "1:756431533342:web:11a4294bb2ef54670e850f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Collection references
export const ordersCollection = collection(db, 'orders');
export const recipesCollection = collection(db, 'recipes');
export const homemakersCollection = collection(db, 'homemakers');

// Query functions
export const getHomemakerOrdersQuery = (homemakerId: string) => 
  query(
    ordersCollection,
    where('recipe.homemakerId', '==', homemakerId),
    orderBy('createdAt', 'desc')
  );

export const getUserOrdersQuery = (userId: string) =>
  query(
    ordersCollection,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

export const getHomemakerRecipesQuery = (homemakerId: string) =>
  query(
    recipesCollection,
    where('homemakerId', '==', homemakerId),
    orderBy('createdAt', 'desc')
  );

export const getPublishedRecipesQuery = (category?: string) => {
  const constraints = [
    where('status', '==', 'published'),
    orderBy('createdAt', 'desc')
  ];
  
  if (category) {
    constraints.unshift(where('category', '==', category));
  }
  
  return query(recipesCollection, ...constraints);
};