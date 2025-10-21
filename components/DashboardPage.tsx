import React from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import { DocumentData } from '../types';

interface DashboardPageProps {
  data: DocumentData;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ data }) => {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-sky-200/50 p-6 md:p-8 relative animate-fadeInUp">
      <Header />
      <Dashboard data={data} />
    </div>
  );
};

export default DashboardPage;