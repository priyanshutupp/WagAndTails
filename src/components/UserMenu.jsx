import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserMenu = ({ styles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 py-2 px-4 rounded-lg bg-black-gradient hover:opacity-80 transition-opacity ${styles}`}
      >
        <div className="w-8 h-8 rounded-full bg-green-gradient flex items-center justify-center text-white font-semibold">
          {user?.email?.[0].toUpperCase() || 'U'}
        </div>
        <span className="text-white">{user?.email?.split('@')[0]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-black-gradient shadow-lg py-1 z-10">
          <button
            onClick={() => {
              navigate('/profile');
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors"
          >
            Profile
          </button>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 