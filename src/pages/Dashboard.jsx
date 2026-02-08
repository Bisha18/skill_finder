import React, { useState, useEffect } from 'react';
import { profileAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProfiles: 0,
    totalProjects: 0,
    topSkills: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      const [profilesRes, projectsRes, skillsRes] = await Promise.all([
        profileAPI.getAllProfiles(),
        profileAPI.getAllProjects(),
        profileAPI.getTopSkills(5),
      ]);

      setStats({
        totalProfiles: profilesRes.count || 0,
        totalProjects: projectsRes.count || 0,
        topSkills: skillsRes.data || [],
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-2xl font-semibold text-gray-600 animate-pulse">
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-8 rounded-xl shadow-lg">
          <h3 className="text-5xl font-bold mb-2">{stats.totalProfiles}</h3>
          <p className="text-xl opacity-90">Total Profiles</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-8 rounded-xl shadow-lg">
          <h3 className="text-5xl font-bold mb-2">{stats.totalProjects}</h3>
          <p className="text-xl opacity-90">Total Projects</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white p-8 rounded-xl shadow-lg">
          <h3 className="text-5xl font-bold mb-2">{stats.topSkills.length}</h3>
          <p className="text-xl opacity-90">Unique Skills</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-purple-600 mb-6">
          🏆 Top 5 Skills
        </h3>
        {stats.topSkills.length > 0 ? (
          <div className="space-y-4">
            {stats.topSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200 hover:border-purple-500 transition-all duration-300 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-purple-600">
                    #{index + 1}
                  </span>
                  <span className="text-xl font-semibold text-gray-800">
                    {skill._id}
                  </span>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold text-lg">
                  {skill.count} developer{skill.count !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No skills data available</p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={fetchStats}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold text-lg shadow-lg"
        >
          🔄 Refresh Stats
        </button>
      </div>
    </div>
  );
};

export default Dashboard;