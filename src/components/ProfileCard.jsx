import React from 'react';

const ProfileCard = ({ profile, onDelete, onView }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-2xl font-bold text-purple-600 mb-2">{profile.name}</h3>
      <p className="text-purple-800 font-semibold mb-3">📧 {profile.email}</p>
      
      {profile.education && (
        <p className="text-gray-700 mb-3">🎓 {profile.education}</p>
      )}
      
      {profile.skills && profile.skills.length > 0 && (
        <div className="mb-4">
          <p className="font-semibold text-gray-800 mb-2">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.projects && profile.projects.length > 0 && (
        <div className="mb-4">
          <p className="font-semibold text-gray-800 mb-2">
            Projects ({profile.projects.length}):
          </p>
          {profile.projects.slice(0, 2).map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-md mb-2 border-l-4 border-pink-500"
            >
              <h4 className="text-lg font-bold text-pink-600 mb-1">
                {project.title}
              </h4>
              {project.description && (
                <p className="text-gray-700 text-sm mb-2">{project.description}</p>
              )}
              {project.links && (
                <a
                  href={project.links}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 font-semibold text-sm inline-block"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
          {profile.projects.length > 2 && (
            <p className="text-gray-500 text-sm mt-2">
              +{profile.projects.length - 2} more project(s)
            </p>
          )}
        </div>
      )}

      {profile.work && profile.work.length > 0 && profile.work[0].links && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            {profile.work[0].links.github && (
              <a
                href={profile.work[0].links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
              >
                GitHub
              </a>
            )}
            {profile.work[0].links.linkedin && (
              <a
                href={profile.work[0].links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
              >
                LinkedIn
              </a>
            )}
            {profile.work[0].links.portfolio && (
              <a
                href={profile.work[0].links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
              >
                Portfolio
              </a>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-4 flex-wrap">
        {onView && (
          <button
            onClick={() => onView(profile)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold text-sm"
          >
            View Details
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(profile._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold text-sm"
          >
            Delete
          </button>
        )}
      </div>

      {profile.createdAt && (
        <p className="text-gray-400 text-xs mt-4">
          Created: {new Date(profile.createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default ProfileCard;