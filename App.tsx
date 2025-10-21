import React, { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import MainApp from './MainApp';
import { User } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user in localStorage on initial load
    try {
      const loggedInUserJson = localStorage.getItem('currentUser');
      if (loggedInUserJson) {
        setCurrentUser(JSON.parse(loggedInUserJson));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('currentUser');
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (user: User) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  if (isLoading) {
    // You can add a loading spinner here for better UX
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!currentUser) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return <MainApp user={currentUser} onLogout={handleLogout} />;
};

export default App;