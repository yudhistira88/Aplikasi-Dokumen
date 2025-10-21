import React, { useState, FormEvent } from 'react';
import { User } from '../types';

interface AuthPageProps {
  onLoginSuccess: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getUsersFromStorage = (): (User & { password: string })[] => {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Email dan password harus diisi.');
      return;
    }

    const users = getUsersFromStorage();
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      onLoginSuccess({ name: foundUser.name, email: foundUser.email });
    } else {
      setError('Email atau password salah.');
    }
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password) {
      setError('Semua field harus diisi.');
      return;
    }
    
    const users = getUsersFromStorage();
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      setError('Email sudah terdaftar. Silakan login.');
      return;
    }

    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setSuccess('Registrasi berhasil! Silakan login.');
    setIsLoginView(true);
    setName('');
    setEmail('');
    setPassword('');
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setSuccess('');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-700">
                Selamat Datang
            </h1>
            <p className="text-slate-600 mt-2">
                Aplikasi Serah Terima Dokumen Penagihan
            </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-sky-200/50 p-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
            {isLoginView ? 'Login' : 'Daftar Akun'}
          </h2>
          {error && <p className="bg-red-100 text-red-700 text-sm font-medium p-3 rounded-lg mb-4 text-center">{error}</p>}
          {success && <p className="bg-green-100 text-green-700 text-sm font-medium p-3 rounded-lg mb-4 text-center">{success}</p>}
          
          <form onSubmit={isLoginView ? handleLogin : handleRegister} className="space-y-5">
            {!isLoginView && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
                required
              />
            </div>
            <div>
              <label htmlFor="password"className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-5 py-3 text-base font-semibold text-white bg-sky-600 rounded-lg shadow-lg shadow-sky-500/30 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {isLoginView ? 'Login' : 'Daftar'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            {isLoginView ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button onClick={toggleView} className="font-semibold text-sky-600 hover:text-sky-700 hover:underline focus:outline-none">
              {isLoginView ? 'Daftar di sini' : 'Login di sini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
