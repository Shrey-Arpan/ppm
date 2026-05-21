import { FileText, LogOut } from 'lucide-react';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const userName = user?.name || 'Authorized User';
  const usernameEmail = user?.preferred_username || '';

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-1.5 rounded-md shadow-sm">
            <FileText className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight uppercase">
            AI PPM Analysis Platform
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-gray-900">{userName}</p>
            <p className="text-[10px] text-gray-500 font-medium">
              {usernameEmail}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="rounded-full"
          >
            <LogOut size={20} />
          </Button>
        </div>
      </nav>
    </>
  );
}
