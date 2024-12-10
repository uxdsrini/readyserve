import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import UserLogin from './pages/UserLogin';
import HomemakerLogin from './pages/HomemakerLogin';
import UserSignup from './pages/UserSignup';
import HomemakerSignup from './pages/HomemakerSignup';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/user" element={<UserLogin />} />
              <Route path="/login/homemaker" element={<HomemakerLogin />} />
              <Route path="/signup/user" element={<UserSignup />} />
              <Route path="/signup/homemaker" element={<HomemakerSignup />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              } />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/orders/:orderId" element={
                <PrivateRoute>
                  <OrderTrackingPage />
                </PrivateRoute>
              } />
            </Routes>
            <Toaster position="top-center" />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}