import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Menu, X, User, LogOut, Cloud, ChevronDown,
  Home, LayoutDashboard, Map, Newspaper, Bell
} from 'lucide-react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [weather, setWeather] = useState({ temp: '24°C', condition: 'Sunny' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/api/placeholder/40/40'
  };

  // Mock notifications
  const notifications = [
    { id: 1, text: 'New emergency alert in your area', time: '5m ago', isUnread: true },
    { id: 2, text: 'Weather warning: Heavy rain expected', time: '1h ago', isUnread: true },
    { id: 3, text: 'System maintenance scheduled', time: '2h ago', isUnread: false },
  ];

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Mock auth functions
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsProfileOpen(false);
  };

  const NavLinks = () => (
    <>
      <a href="../../home" className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400">
        <Home className="w-5 h-5" />
        <span className="hidden lg:inline">Home</span>
      </a>
      <a href="../../dashboard" className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400">
        <LayoutDashboard className="w-5 h-5" />
        <span className="hidden lg:inline">Dashboard</span>
      </a>
      <a href="../../map" className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400">
        <Map className="w-5 h-5" />
        <span className="hidden lg:inline">Map</span>
      </a>
      <a href="../../news" className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400">
        <Newspaper className="w-5 h-5" />
        <span className="hidden lg:inline">News</span>
      </a>
    </>
  );

  return (
    <nav className={`
      w-full fixed top-0 z-50 transition-colors duration-300
      ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}
      shadow-lg
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold">Brand</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Weather Widget */}
            <div className="flex items-center space-x-2 text-sm">
              <Cloud className="w-5 h-5" />
              <span>{weather.temp}</span>
              <span className="hidden lg:inline">{weather.condition}</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className={`
                  absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1
                  ${darkMode ? 'bg-gray-800' : 'bg-white'}
                  ring-1 ring-black ring-opacity-5
                `}>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`
                        px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700
                        ${notification.isUnread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                      `}
                    >
                      <p className="text-sm">{notification.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden lg:inline">{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className={`
                    absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1
                    ${darkMode ? 'bg-gray-800' : 'bg-white'}
                    ring-1 ring-black ring-opacity-5
                  `}>
                    <a
                      href="../../profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Your Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign in
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`
            px-2 pt-2 pb-3 space-y-1
            ${darkMode ? 'bg-gray-900' : 'bg-white'}
          `}>
            {/* Navigation Links Mobile */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <NavLinks />
            </div>

            {/* Weather Widget Mobile */}
            <div className="flex items-center space-x-2 px-3 py-2">
              <Cloud className="w-5 h-5" />
              <span>{weather.temp}</span>
              <span>{weather.condition}</span>
            </div>

            {/* Notifications Mobile */}
            <div className="px-3 py-2">
              <div className="font-medium mb-2">Notifications</div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`
                    py-2 border-b last:border-0
                    ${notification.isUnread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                  `}
                >
                  <p className="text-sm">{notification.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>

            {/* Dark Mode Toggle Mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex w-full items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <>
                  <Sun className="w-5 h-5 mr-2" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 mr-2" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            {/* Auth Section Mobile */}
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
                <a
                  href="#profile"
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Your Profile
                </a>
                <a
                  href="#settings"
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full text-left px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 