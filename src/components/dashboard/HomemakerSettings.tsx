import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function HomemakerSettings() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{currentUser?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <p className="mt-1 text-gray-900">Homemaker</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Member Since</label>
            <p className="mt-1 text-gray-900">
              {new Date(currentUser?.metadata.creationTime).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}