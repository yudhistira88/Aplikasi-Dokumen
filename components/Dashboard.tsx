import React, { useMemo } from 'react';
import { Status } from '../types';
import type { DocumentData } from '../types';

import DocumentIcon from './icons/DocumentIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';
import ClockIcon from './icons/ClockIcon';
import CashIcon from './icons/CashIcon';
import CategoryChart from './CategoryChart';
import StatusChart from './StatusChart';


interface DashboardProps {
  data: DocumentData;
}

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement<{ className?: string }>;
  colorClass: string;
  className?: string;
  delay: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, colorClass, className = '', delay }) => (
  <div 
    className={`relative p-5 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-1 animate-fadeInUp ${colorClass} ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute -right-5 -bottom-5 text-white opacity-20 transform-gpu scale-110">
      {React.cloneElement(icon, { className: 'h-24 w-24' })}
    </div>
    <div className="relative z-10">
      <p className="text-sm font-semibold uppercase tracking-wider opacity-80">{title}</p>
      <p className="text-3xl xl:text-4xl font-extrabold text-white mt-1 truncate">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const stats = useMemo(() => {
    const allDocuments = Object.values(data).flat();
    
    const totalCount = allDocuments.length;
    const acceptedCount = allDocuments.filter(d => d.status === Status.ACCEPTED).length;
    const rejectedCount = allDocuments.filter(d => d.status === Status.REJECTED).length;
    const pendingCount = allDocuments.filter(d => d.status === Status.PENDING).length;
    const totalAmount = allDocuments.reduce((sum, d) => sum + d.amount, 0);

    return { totalCount, acceptedCount, rejectedCount, pendingCount, totalAmount };
  }, [data]);

  const formatCurrency = (value: number) => {
    if (value >= 1_000_000_000) {
        return `Rp${(value / 1_000_000_000).toFixed(2)} M`;
    }
    if (value >= 1_000_000) {
        return `Rp${(value / 1_000_000).toFixed(2)} Jt`;
    }
    return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;
  };

  const dashboardItems = [
    { title: "Total Dokumen", value: stats.totalCount, icon: <DocumentIcon />, color: "from-sky-500 to-blue-600" },
    { title: "Diterima", value: stats.acceptedCount, icon: <CheckCircleIcon />, color: "from-emerald-500 to-green-600" },
    { title: "Ditolak", value: stats.rejectedCount, icon: <XCircleIcon />, color: "from-rose-500 to-red-600" },
    { title: "Pending", value: stats.pendingCount, icon: <ClockIcon />, color: "from-amber-500 to-orange-600" },
    { title: "Total Amount", value: formatCurrency(stats.totalAmount), icon: <CashIcon />, color: "from-indigo-500 to-violet-600", className: "sm:col-span-2 lg:col-span-1" },
  ];

  return (
    <section className="mt-8 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {dashboardItems.map((item, index) => (
            <DashboardCard 
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
              colorClass={`bg-gradient-to-br ${item.color}`}
              className={item.className}
              delay={100 + index * 100}
            />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 animate-fadeInUp" style={{ animationDelay: '600ms'}}>
          <CategoryChart data={data} />
        </div>
        <div className="lg:col-span-2 animate-fadeInUp" style={{ animationDelay: '700ms'}}>
          <StatusChart data={data} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;