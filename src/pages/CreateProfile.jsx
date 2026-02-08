import React, { useState } from 'react';
import { profileAPI } from '../services/api';

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    skills: '',
    projectTitle: '',
    projectDescription: '',
    projectLinks: '',
    github: '',
    linkedin: '',
    portfolio: '',
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const skills = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s);

      const projects = formData.projectTitle
        ? [
            {
              title: formData.projectTitle,
              description: formData.projectDescription,
              links: formData.projectLinks,
            },
          ]
        : [];

      const work = [
        {
          links: {
            github: formData.github,
            linkedin: formData.linkedin,
            portfolio: formData.portfolio,
          },
        },
      ];

      const profileData = {
        name: formData.name,
        email: formData.email,
        education: formData.education,
        skills,
        projects,
        work,
      };

      const response = await profileAPI.createProfile(profileData);

      if (response.success) {
        setMessage({ text: 'Profile created successfully! 🎉', type: 'success' });
        setFormData({
          name: '',
          email: '',
          education: '',
          skills: '',
          projectTitle: '',
          projectDescription: '',
          projectLinks: '',
          github: '',
          linkedin: '',
          portfolio: '',
        });
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Failed to create profile',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Create New Profile</h2>

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Education
          </label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="e.g., B.Tech Computer Science, MIT"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Skills
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Python, JavaScript, React, MongoDB"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          />
          <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
        </div>

        <h3 className="text-2xl font-bold text-purple-600 pt-6">
          Project (Optional)
        </h3>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Project Title
          </label>
          <input
            type="text"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            placeholder="e.g., E-commerce Platform"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Project Description
          </label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Brief description of your project"
            rows="4"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-y"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Project Link
          </label>
          <input
            type="url"
            name="projectLinks"
            value={formData.projectLinks}
            onChange={handleChange}
            placeholder="https://github.com/username/project"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>

        <h3 className="text-2xl font-bold text-purple-600 pt-6">
          Social Links (Optional)
        </h3>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            GitHub
          </label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            LinkedIn
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Portfolio
          </label>
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;