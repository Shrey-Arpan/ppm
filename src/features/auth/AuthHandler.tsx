import { useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';

const AuthHandler = () => {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && inProgress === 'none') {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, inProgress, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2 text-blue-600">Completing Sign-in...</h2>
        <p className="text-slate-500">Please wait while we verify your credentials.</p>
      </div>
    </div>
  );
};

export default AuthHandler;
