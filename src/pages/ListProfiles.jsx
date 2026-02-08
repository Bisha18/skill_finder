import React, { useState, useEffect } from 'react';
import { profileAPI } from '../services/api';
import ProfileCard from '../components/ProfileCard';

const ListProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.getAllProfiles();
      if (response.success) {
        setProfiles(response.data);
      }
    } catch (error) {
      setMessage({
        text: 'Failed to fetch profiles',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) {
      return;
    }

    try {
      const response = await profileAPI.deleteProfile(id);
      if (response.success) {
        setMessage({ text: 'Profile deleted successfully! ✅', type: 'success' });
        setProfiles(profiles.filter((p) => p._id !== id));
        if (selectedProfile && selectedProfile._id === id) {
          setSelectedProfile(null);
        }
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Failed to delete profile',
        type: 'error',
      });
    }
  };

  const handleView = (profile) => {
    setSelectedProfile(profile);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-2xl font-semibold text-gray-600 animate-pulse">
            Loading profiles...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">
          All Profiles ({profiles.length})
        </h2>
        <button
          onClick={fetchProfiles}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg"
        >
          🔄 Refresh
        </button>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-lg mb-6 font-semibold ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border-2 border-green-300'
              : 'bg-red-100 text-red-800 border-2 border-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      {selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 rounded-full hover:bg-red-600 transition-colors font-bold text-xl"
            >
              ×
            </button>
            <ProfileCard profile={selectedProfile} onDelete={handleDelete} />
          </div>
        </div>
      )}

      {profiles.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-600 mb-2">
            No profiles found
          </h3>
          <p className="text-gray-500">Create your first profile to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile._id}
              profile={profile}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListProfiles;