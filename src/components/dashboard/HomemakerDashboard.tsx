import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Clock, Users, DollarSign, Package, Plus, Settings } from 'lucide-react';
import RecipeForm from '../recipes/RecipeForm';
import { useHomemakerOrders } from '../../hooks/useOrders';
import { useRecipes } from '../../hooks/useRecipes';
import HomemakerOrdersList from './HomemakerOrdersList';
import HomemakerRecipesList from './HomemakerRecipesList';
import HomemakerSettings from './HomemakerSettings';
import { ErrorMessage } from '../ui/ErrorMessage';
import { LoadingSpinner } from '../ui/LoadingSpinner';

type TabType = 'orders' | 'recipes' | 'settings';

export default function HomemakerDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const { orders, loading: ordersLoading, error: ordersError } = useHomemakerOrders();
  const { recipes, loading: recipesLoading, error: recipesError } = useRecipes();

  const menuItems = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'recipes', label: 'My Recipes', icon: ChefHat },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (ordersError || recipesError) {
    return <ErrorMessage message={ordersError || recipesError || 'Something went wrong'} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <HomemakerOrdersList orders={orders} loading={ordersLoading} />;
      case 'recipes':
        return (
          showRecipeForm ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Add New Recipe
                </h2>
                <button
                  onClick={() => setShowRecipeForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
              <RecipeForm 
                onSuccess={() => {
                  setShowRecipeForm(false);
                }}
              />
            </div>
          ) : (
            <HomemakerRecipesList 
              recipes={recipes}
              loading={recipesLoading}
              onAddNew={() => setShowRecipeForm(true)}
            />
          )
        );
      case 'settings':
        return <HomemakerSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <Link to="/" className="text-2xl font-bold text-orange-600">
              HomeMade
            </Link>
          </div>
          <nav className="mt-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'text-orange-600 bg-orange-50 border-r-2 border-orange-600'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}