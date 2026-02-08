import React, { useState } from 'react';
import { profileAPI } from '../services/api';
import ProfileCard from '../components/ProfileCard';

const ViewProfile = () => {
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage({ text: 'Please enter an email address', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: '', type: '' });
      setProfile(null);

      const response = await profileAPI.getProfileByEmail(email);

      if (response.success) {
        setProfile(response.data);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setMessage({
          text: `No profile found for email: ${email}`,
          type: 'info',
        });
      } else {
        setMessage({
          text: error.response?.data?.message || 'Failed to fetch profile',
          type: 'error',
        });
      }
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
        setProfile(null);
        setEmail('');
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Failed to delete profile',
        type: 'error',
      });
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        View Profile by Email
      </h2>

      <form onSubmit={handleSearch} className="flex gap-4 mb-8">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : '👁️ View Profile'}
        </button>
      </form>

      {message.text && (
        <div
          className={`p-4 rounded-lg mb-6 font-semibold ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border-2 border-green-300'
              : message.type === 'info'
              ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
              : 'bg-red-100 text-red-800 border-2 border-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="text-2xl font-semibold text-gray-600 animate-pulse">
            Loading profile...
          </div>
        </div>
      )}

      {profile && (
        <div className="max-w-2xl mx-auto">
          <ProfileCard profile={profile} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default ViewProfile;