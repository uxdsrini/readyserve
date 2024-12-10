import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { RecipeCategory } from '../types/recipe';
import { useRecipesByCategory } from '../hooks/useRecipesByCategory';
import CategoryTabs from '../components/recipes/CategoryTabs';
import RecipeGrid from '../components/recipes/RecipeGrid';
import SubscriptionPlans from '../components/SubscriptionPlans';
import Footer from '../components/Footer';

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>('breakfast');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const { cart } = useCart();
  const { recipes, loading, error } = useRecipesByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-orange-600">
                HomeMade
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <>
                  <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                  <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                    Cart ({cart.length})
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {currentUser ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/cart"
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cart ({cart.length})
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-orange-600 text-white rounded-md"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Homemade Food,{' '}
              <span className="text-orange-600">Delivered Fresh</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover authentic home-cooked meals from talented home chefs in your neighborhood.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <RecipeGrid
          recipes={recipes}
          loading={loading}
          error={error}
        />
      </div>

      {/* Subscription Plans */}
      <SubscriptionPlans />

      {/* Footer */}
      <Footer />
    </div>
  );
}