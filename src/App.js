import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaMoon, FaSun, FaTwitter, FaBuilding, FaMapMarkerAlt, FaBook, FaFileAlt, FaUsers, FaUserPlus, FaCode, FaCalendarAlt, FaSync, FaStar, FaUsersCog, FaLink, FaClock, FaTimes } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

function App() {
  const [userData, setUserData] = useState(null);
  const [userData2, setUserData2] = useState(null);
  const [userData3, setUserData3] = useState(null);
  const [showInput2, setShowInput2] = useState(false);
  const [showInput3, setShowInput3] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  // Fetch user data from GitHub API
  const fetchUserData = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error('User not found');
    return response.json();
  };

  const fetchUserRepos = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) throw new Error('Failed to fetch repos');
    return response.json();
  };

  const fetchStarredCount = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/starred`);
    if (!response.ok) throw new Error('Failed to fetch starred');
    const data = await response.json();
    return data.length;
  };

  const fetchOrgsCount = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/orgs`);
    if (!response.ok) throw new Error('Failed to fetch orgs');
    const data = await response.json();
    return data.length;
  };

  const fetchLatestEvent = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/events/public`);
    if (!response.ok) throw new Error('Failed to fetch events');
    const data = await response.json();
    return data[0]?.created_at || null;
  };

  const extractLanguages = (repos) => {
    const languages = new Set();
    repos.forEach((repo) => repo.language && languages.add(repo.language));
    return Array.from(languages);
  };

  const handleUsernameSubmit = async (inputUsername, setter) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await fetchUserData(inputUsername);
      const repos = await fetchUserRepos(inputUsername);
      const languages = extractLanguages(repos);
      const starredCount = await fetchStarredCount(inputUsername);
      const orgsCount = await fetchOrgsCount(inputUsername);
      const latestEvent = await fetchLatestEvent(inputUsername);
      setter({ ...user, languages, starredCount, orgsCount, latestEvent });
    } catch (err) {
      setError('> Error: User not found. Check the handle, bro!');
    } finally {
      setIsLoading(false);
    }
  };

  const removeUser = (setter, setShowInput) => {
    setter(null);
    setShowInput(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-4 pt-20 pb-16 font-mono ${
        darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-green-400' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800'
      }`}
    >
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-opacity-90 backdrop-blur-md z-10 border-b border-green-500/20">
        <h1 className="text-2xl font-bold tracking-wider"> GitHub VibeCheck</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-green-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-colors`}
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </header>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center my-8">
          <ClipLoader color={darkMode ? '#34D399' : '#000000'} loading={isLoading} size={50} />
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-xl my-4 tracking-wide">{error}</p>}

      {/* Initial Input or User Cards */}
      {!userData ? (
        <UserInput onSubmit={(input) => handleUsernameSubmit(input, setUserData)} darkMode={darkMode} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          <UserInfo userData={userData} darkMode={darkMode} isMain={true} />
          {userData2 && (
            <UserInfo
              userData={userData2}
              darkMode={darkMode}
              isMain={false}
              onRemove={() => removeUser(setUserData2, setShowInput2)}
            />
          )}
          {userData3 && (
            <UserInfo
              userData={userData3}
              darkMode={darkMode}
              isMain={false}
              onRemove={() => removeUser(setUserData3, setShowInput3)}
            />
          )}
        </div>
      )}

      {/* Add Second User Button */}
      {userData && !userData2 && (
        <button
          onClick={() => setShowInput2(true)}
          className="mt-6 bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-400 transition-colors font-bold"
        >
           Add Another Dev
        </button>
      )}

      {/* Second User Input */}
      {showInput2 && !userData2 && (
        <UserInput onSubmit={(input) => handleUsernameSubmit(input, setUserData2)} darkMode={darkMode} />
      )}

      {/* Add Third User Button */}
      {userData2 && !userData3 && (
        <button
          onClick={() => setShowInput3(true)}
          className="mt-6 bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-400 transition-colors font-bold"
        >
         Add One More Dev
        </button>
      )}

      {/* Third User Input */}
      {showInput3 && !userData3 && (
        <UserInput onSubmit={(input) => handleUsernameSubmit(input, setUserData3)} darkMode={darkMode} />
      )}
    </div>
  );
}

// User Input Form Component
function UserInput({ onSubmit, darkMode }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={`p-6 rounded-lg shadow-lg bg-opacity-80 backdrop-blur-md max-w-md w-full border ${
        darkMode ? 'bg-gray-900/80 border-green-500/30' : 'bg-white/80 border-gray-300'
      }`}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="> Enter GitHub username"
        className={`w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 font-mono ${
          darkMode ? 'bg-gray-800 border-gray-700 text-green-400' : 'bg-white border-gray-300 text-gray-800'
        }`}
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-black p-3 rounded-md hover:bg-green-400 transition-colors font-bold"
      >
         Execute
      </button>
    </motion.form>
  );
}

// User Info Card Component
function UserInfo({ userData, darkMode, isMain = false, onRemove }) {
  const isRecent = userData.latestEvent && (new Date() - new Date(userData.latestEvent)) / (1000 * 60 * 60 * 24) < 7;

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: isMain ? '0 0 25px rgba(52, 211, 153, 0.8)' : '0 0 15px rgba(0, 0, 0, 0.3)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-lg shadow-lg bg-opacity-80 backdrop-blur-md relative ${
        darkMode ? 'bg-gray-900/80 text-green-400' : 'bg-white/80 text-gray-800'
      } ${isMain ? 'border-4 border-green-500/50 bg-gradient-to-br from-green-500/10 to-blue-500/10' : 'border-2 border-gray-600/50'}`}
    >
      {/* Remove Button for Comparison Users */}
      {!isMain && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-400 transition-colors"
        >
          <FaTimes size={20} />
        </button>
      )}

      <div className="text-left">
        {/* Profile Section */}
        <div className="pb-4 border-b border-green-500/20">
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className={`${isMain ? 'w-32 h-32' : 'w-24 h-24'} rounded-full mx-auto mb-4 border-4 border-green-500`}
          />
          <div className={`${isMain ? 'py-2 relative dev-username' : ''}`}>
            <h2 className={`${isMain ? 'text-4xl' : 'text-3xl'} font-bold mb-4 text-center`}>
              {userData.name || userData.login}
            </h2>
          </div>
          <div className="space-y-2 text-sm">
            {userData.company && (
              <div className="flex items-center space-x-2">
                <FaBuilding className="text-lg" />
                <p> Works at: {userData.company}</p>
              </div>
            )}
            {userData.location && (
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-lg" />
                <p> Location: {userData.location}</p>
              </div>
            )}
            {userData.blog && (
              <div className="flex items-center space-x-2">
                <FaLink className="text-lg" />
                <p>
                   Blog:{' '}
                  <a href={userData.blog} target="_blank" rel="noopener noreferrer" className="text-green-300 hover:underline">
                    {userData.blog}
                  </a>
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-4 py-2 rounded-md transition-colors font-bold ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700 text-green-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
            {userData.twitter_username && (
              <a
                href={`https://twitter.com/${userData.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-colors font-bold"
              >
                <FaTwitter className="mr-2" /> Twitter
              </a>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="pt-4 space-y-2 text-sm">
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center space-x-1 bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              <FaBook />
              <p> Repos: {userData.public_repos}</p>
            </div>
            <div className="inline-flex items-center space-x-1 bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              <FaFileAlt />
              <p> Gists: {userData.public_gists}</p>
            </div>
            <div className="inline-flex items-center space-x-1 bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              <FaUsers />
              <p> Followers: {userData.followers}</p>
            </div>
            <div className="inline-flex items-center space-x-1 bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              <FaUserPlus />
              <p> Following: {userData.following}</p>
            </div>
            <div className="inline-flex items-center space-x-1 bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              <FaStar />
              <p> Starred: {userData.starredCount}</p>
            </div>
            <div className="inline-flex items-center space-x-1 bg-green-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              <FaUsersCog />
              <p> Orgs: {userData.orgsCount}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaCode className="text-lg" />
            <p> Languages: {userData.languages?.join(', ') || 'None'}</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-sm" />
            <p> Joined: {new Date(userData.created_at).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaSync className="text-sm" />
            <p> Last Updated: {new Date(userData.updated_at).toLocaleDateString()}</p>
          </div>
          {userData.latestEvent && (
            <div className="flex items-center space-x-2">
              <FaClock className="text-sm" />
              <p>
               Last Active: {new Date(userData.latestEvent).toLocaleDateString()}{' '}
                {isRecent && <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default App;