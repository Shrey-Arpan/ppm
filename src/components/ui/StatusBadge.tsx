import React from 'react';
import { CheckCircle2, RefreshCw, Clock, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles: Record<string, string> = {
    Completed: 'bg-green-100 text-green-700 border-green-200',
    'In Process': 'bg-blue-100 text-blue-700 border-blue-200',
    Queued: 'bg-gray-100 text-gray-700 border-gray-200',
    Failed: 'bg-red-100 text-red-700 border-red-200',
  };

  const icons: Record<string, React.ReactNode> = {
    Completed: <CheckCircle2 size={14} className="mr-1" />,
    'In Process': <RefreshCw size={14} className="mr-1" />,
    Queued: <Clock size={14} className="mr-1" />,
    Failed: <AlertCircle size={14} className="mr-1" />,
  };

  return (
    <span
      className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles['Queued']}`}
    >
      {icons[status] || icons['Queued']}
      {status}
    </span>
  );
};
