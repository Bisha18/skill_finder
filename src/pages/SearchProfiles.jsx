import React, { useState } from 'react';
import { profileAPI } from '../services/api';
import ProfileCard from '../components/ProfileCard';

const SearchProfiles = () => {
  const [skill, setSkill] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!skill.trim()) {
      setMessage({ text: 'Please enter a skill to search', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: '', type: '' });
      const response = await profileAPI.searchBySkill(skill);
      
      if (response.success) {
        setProfiles(response.data);
        setSearched(true);
        if (response.data.length === 0) {
          setMessage({
            text: `No profiles found with skill "${skill}"`,
            type: 'info',
          });
        }
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Failed to search profiles',
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
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
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
        Search Profiles by Skill
      </h2>

      <form onSubmit={handleSearch} className="flex gap-4 mb-8">
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Enter skill (e.g., Python, React, MongoDB)"
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : '🔍 Search'}
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

      {searched && profiles.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-purple-600">
            Found {profiles.length} profile(s) with "{skill}"
          </h3>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="text-2xl font-semibold text-gray-600 animate-pulse">
            Searching for profiles...
          </div>
        </div>
      )}

      {!loading && profiles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile._id}
              profile={profile}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!loading && searched && profiles.length === 0 && !message.text && (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-600 mb-2">
            No profiles found
          </h3>
          <p className="text-gray-500">Try searching for a different skill</p>
        </div>
      )}
    </div>
  );
};

export default SearchProfiles;