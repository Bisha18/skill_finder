import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import CreateProfile from './pages/CreateProfile';
import ListProfiles from './pages/ListProfiles';
import SearchProfiles from './pages/SearchProfiles';
import ViewProfile from './pages/ViewProfile';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'create':
        return <CreateProfile />;
      case 'list':
        return <ListProfiles />;
      case 'search':
        return <SearchProfiles />;
      case 'view':
        return <ViewProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-b-3xl shadow-2xl">
          <h1 className="text-5xl font-bold mb-2 text-center">Skills Finder APP</h1>
          <p className="text-xl text-center opacity-90">Helps you find the best skilled engineer</p>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-white shadow-lg mt-6 rounded-2xl overflow-hidden">
          <div className="flex overflow-x-auto">
            <button
              className={`flex-1 min-w-max px-6 py-4 font-semibold text-lg transition-all duration-300 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button
              className={`flex-1 min-w-max px-6 py-4 font-semibold text-lg transition-all duration-300 ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('create')}
            >
              ✏️ Create Profile
            </button>
            <button
              className={`flex-1 min-w-max px-6 py-4 font-semibold text-lg transition-all duration-300 ${
                activeTab === 'list'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('list')}
            >
              📋 List All
            </button>
            <button
              className={`flex-1 min-w-max px-6 py-4 font-semibold text-lg transition-all duration-300 ${
                activeTab === 'search'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('search')}
            >
              🔍 Search
            </button>
            <button
              className={`flex-1 min-w-max px-6 py-4 font-semibold text-lg transition-all duration-300 ${
                activeTab === 'view'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('view')}
            >
              👁️ View Profile
            </button>
          </div>
        </nav>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl mt-6 mb-6 min-h-[600px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;