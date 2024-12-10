import { doc, setDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db, recipesCollection, ordersCollection } from './firebase';
import { Recipe, Order } from '../types';

export async function createRecipe(recipe: Partial<Recipe>) {
  const recipeRef = doc(recipesCollection);
  await setDoc(recipeRef, {
    ...recipe,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return recipeRef.id;
}

export async function updateRecipe(recipeId: string, updates: Partial<Recipe>) {
  const recipeRef = doc(recipesCollection, recipeId);
  await updateDoc(recipeRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

export async function deleteRecipe(recipeId: string) {
  await deleteDoc(doc(recipesCollection, recipeId));
}

export async function createOrder(orderData: Partial<Order>) {
  const orderRef = doc(ordersCollection);
  await setDoc(orderRef, {
    ...orderData,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return orderRef.id;
}

export async function updateOrder(orderId: string, updates: Partial<Order>) {
  const orderRef = doc(ordersCollection, orderId);
  await updateDoc(orderRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
}