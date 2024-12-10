export class FirebaseError extends Error {
  constructor(
    public code: string,
    public message: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'FirebaseError';
  }
}

export function handleFirebaseError(error: any): string {
  console.error('Firebase error:', error);

  if (error.code === 'failed-precondition') {
    return 'Database is not properly initialized. Please try again in a few moments.';
  }

  if (error.code === 'permission-denied') {
    return 'You do not have permission to perform this action.';
  }

  if (error.code === 'not-found') {
    return 'The requested resource was not found.';
  }

  return 'An unexpected error occurred. Please try again later.';
}