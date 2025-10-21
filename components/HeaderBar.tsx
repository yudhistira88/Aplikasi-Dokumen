import React from 'react';
import { User } from '../types';
import UserIcon from './icons/UserIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';

interface HeaderBarProps {
    user: User;
    onLogout: () => void;
    currentPage: 'dashboard' | 'table';
    setCurrentPage: (page: 'dashboard' | 'table') => void;
}

const NavButton: React.FC<{isActive: boolean; onClick: () => void; children: React.ReactNode}> = ({ isActive, onClick, children }) => {
    const baseClasses = "px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500";
    const activeClasses = "bg-sky-100 text-sky-700 shadow-inner";
    const inactiveClasses = "text-slate-600 hover:bg-slate-200/70";
    return (
        <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {children}
        </button>
    )
}


const HeaderBar: React.FC<HeaderBarProps> = ({ user, onLogout, currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 w-full animate-fadeInUp">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Logo and App Name */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0 p-2 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg text-white">
                <DocumentTextIcon className="h-6 w-6" />
            </div>
            <span className="font-bold text-lg text-slate-800 tracking-tight hidden sm:block">
              Aplikasi Dokumen
            </span>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden md:flex items-center gap-2 justify-center bg-slate-100/80 p-1 rounded-xl">
             <NavButton isActive={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')}>
                Dashboard
             </NavButton>
             <NavButton isActive={currentPage === 'table'} onClick={() => setCurrentPage('table')}>
                Manajemen Dokumen
             </NavButton>
          </nav>

          {/* Right side: User Info and Logout */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="text-right hidden sm:block">
                <p className="font-semibold text-slate-700 text-sm">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <div className="h-10 w-10 bg-gradient-to-br from-sky-100 to-indigo-200 rounded-full flex items-center justify-center flex-shrink-0">
                <UserIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <button 
              onClick={onLogout}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-200/80 rounded-lg shadow-sm hover:bg-slate-300/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-all"
            >
                Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;