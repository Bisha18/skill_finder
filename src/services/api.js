import axios from 'axios';

const API_URL = 'https://api-9qmg.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Profile API calls
export const profileAPI = {
  // Create a new profile
  createProfile: async (profileData) => {
    const response = await api.post('/profile', profileData);
    return response.data;
  },

  // Get all profiles
  getAllProfiles: async () => {
    const response = await api.get('/profiles');
    return response.data;
  },

  // Get profile by ID
  getProfileById: async (id) => {
    const response = await api.get(`/profile/${id}`);
    return response.data;
  },

  // Get profile by email
  getProfileByEmail: async (email) => {
    const response = await api.get(`/profile/email/${email}`);
    return response.data;
  },

  // Update profile
  updateProfile: async (id, profileData) => {
    const response = await api.put(`/profile/${id}`, profileData);
    return response.data;
  },

  // Delete profile
  deleteProfile: async (id) => {
    const response = await api.delete(`/profile/${id}`);
    return response.data;
  },

  // Search profiles by skill
  searchBySkill: async (skill) => {
    const response = await api.get(`/search/skill/${skill}`);
    return response.data;
  },

  // Get all projects
  getAllProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  // Get top skills
  getTopSkills: async (limit = 10) => {
    const response = await api.get(`/top-skills?limit=${limit}`);
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;