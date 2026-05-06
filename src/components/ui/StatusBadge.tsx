import React from 'react';
import { CheckCircle2, RefreshCw, Clock, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles: Record<string, string> = {
    completed: 'bg-green-100 text-green-700 border-green-200',
    'in process': 'bg-blue-100 text-blue-700 border-blue-200',
    queued: 'bg-gray-100 text-gray-700 border-gray-200',
    failed: 'bg-red-100 text-red-700 border-red-200',
  };

  const icons: Record<string, React.ReactNode> = {
    completed: <CheckCircle2 size={14} className="mr-1" />,
    'in process': <RefreshCw size={14} className="mr-1" />,
    queued: <Clock size={14} className="mr-1" />,
    failed: <AlertCircle size={14} className="mr-1" />,
  };

  return (
    <span
      className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status?.toLowerCase()] || styles['queued']}`}
    >
      {icons[status?.toLowerCase()] || icons['queued']}
      {status}
    </span>
  );
};
