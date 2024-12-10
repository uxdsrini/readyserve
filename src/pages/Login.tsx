import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, User as UserIcon } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please select your account type
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to="/login/user"
            className="w-full flex items-center justify-center p-4 border-2 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
          >
            <div className="text-center">
              <div className="p-3 bg-orange-100 rounded-full inline-block">
                <UserIcon className="h-6 w-6 text-orange-600" />
              </div>
              <p className="mt-2 font-medium text-gray-900">Customer Login</p>
              <p className="mt-1 text-sm text-gray-500">Order delicious homemade food</p>
            </div>
          </Link>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup/user" className="font-medium text-orange-600 hover:text-orange-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}