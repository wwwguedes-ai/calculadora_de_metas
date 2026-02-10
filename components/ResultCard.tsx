
import React from 'react';

interface ResultCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ label, value, icon, description }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
          {icon}
        </div>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-auto">
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default ResultCard;
