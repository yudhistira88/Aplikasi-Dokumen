import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center border-b-2 border-slate-200 pb-6 animate-fadeInUp">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-700 uppercase">
        Tanda Terima Document Payment Request Finance
      </h1>
      <div className="mt-4 inline-block bg-gradient-to-r from-sky-100 to-indigo-100 text-indigo-800 text-sm font-bold px-4 py-2 rounded-full shadow-md">
        GA-GAF
      </div>
    </header>
  );
};

export default Header;