import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';
import { AlertCircle, ArrowLeft, ShieldCheck, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ENTRA_AUTH_API } from '@/apis';

const STEPS = [
  { id: 'connect', label: 'Connecting to secure servers' },
  { id: 'exchange', label: 'Exchanging authorization code' },
  { id: 'verify', label: 'Verifying session integrity' },
  { id: 'finalize', label: 'Preparing your workspace' },
];

const AuthHandler = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasExchanged = useRef(false);
  
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Helper to wait for a minimum time to make the UI readable
  const minWait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    // If we are already authenticated, just go to dashboard
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
      return;
    }

    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state && !hasExchanged.current) {
      hasExchanged.current = true;
      
      const exchangeCode = async () => {
        try {
          // Step 0: Connecting (Start)
          await minWait(800);
          
          // Step 1: Exchanging
          setActiveStep(1);
          const fetchPromise = fetch(`${ENTRA_AUTH_API}?code=${code}&state=${state}`);
          const [response] = await Promise.all([fetchPromise, minWait(1200)]);
          
          if (!response.ok) {
            throw new Error(`Authentication failed: ${response.statusText}`);
          }

          // Step 2: Verifying
          setActiveStep(2);
          const dataPromise = response.json();
          const [data] = await Promise.all([dataPromise, minWait(1000)]);
          
          if (data.authenticated && data.user) {
            // Step 3: Finalizing
            setActiveStep(3);
            await minWait(800);
            
            setIsSuccess(true);
            // Small delay to show success state
            setTimeout(() => {
              login(data.user);
              navigate('/dashboard', { replace: true });
            }, 800);
          } else {
            throw new Error('Authentication failed or user data missing');
          }
        } catch (err) {
          console.error('Auth Error:', err);
          setError(err instanceof Error ? err.message : 'An unexpected error occurred during sign-in.');
        }
      };

      exchangeCode();
    } else if (searchParams.has('error')) {
      const errorDesc = searchParams.get('error_description') || 'Authentication was cancelled or failed.';
      console.error('Auth Error from Microsoft:', errorDesc);
      setError(errorDesc);
    } else if (!searchParams.get('code') && !isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate, login, isAuthenticated]);

  const handleBack = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-slate-50">
      {/* Animated Mesh Background */}
      <div 
        className="absolute inset-0 opacity-40 animate-mesh"
        style={{
          backgroundImage: `
            radial-gradient(at 0% 0%, hsla(210,100%,90%,1) 0, transparent 50%), 
            radial-gradient(at 50% 0%, hsla(220,100%,95%,1) 0, transparent 50%), 
            radial-gradient(at 100% 0%, hsla(210,100%,90%,1) 0, transparent 50%), 
            radial-gradient(at 50% 100%, hsla(220,100%,95%,1) 0, transparent 50%)
          `
        }}
      />

      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse transition-delay-2000" />

      {/* Auth Card */}
      <div className={cn(
        "relative w-full max-w-md mx-4 p-8 transition-all duration-500 transform",
        "bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]",
        "rounded-[2.5rem] flex flex-col items-center",
        error ? "translate-y-0 opacity-100" : "animate-in fade-in zoom-in-95"
      )}>
        {error ? (
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-red-50 rounded-2xl mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Sign-in Failed</h2>
            <p className="text-slate-600 mb-8 leading-relaxed px-4">
              {error}
            </p>
            <button
              onClick={handleBack}
              className="group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Return to Login
            </button>
          </div>
        ) : isSuccess ? (
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-green-50 rounded-2xl mb-6">
              <ShieldCheck className="w-10 h-10 text-green-500 animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Authenticated</h2>
            <p className="text-slate-600">Redirecting to your dashboard...</p>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
                <div className="relative p-5 bg-white rounded-full shadow-sm border border-blue-100">
                  <Spinner className="w-10 h-10" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                Signing you in
              </h2>
              <p className="text-slate-500 mt-1">Please wait a moment</p>
            </div>

            {/* Stepped Progress List */}
            <div className="space-y-4 px-2">
              {STEPS.map((step, index) => {
                const isCompleted = index < activeStep;
                const isActive = index === activeStep;
                
                return (
                  <div 
                    key={step.id} 
                    className={cn(
                      "flex items-center gap-4 transition-all duration-500",
                      isActive ? "opacity-100 translate-x-1" : isCompleted ? "opacity-100" : "opacity-40"
                    )}
                  >
                    <div className="relative flex items-center justify-center">
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-50 animate-in zoom-in duration-300" />
                      ) : isActive ? (
                        <div className="flex items-center justify-center">
                          <div className="absolute w-4 h-4 bg-blue-500/20 rounded-full animate-ping" />
                          <Spinner className="w-5 h-5" />
                        </div>
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300" />
                      )}
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isActive ? "text-slate-900" : isCompleted ? "text-slate-600" : "text-slate-400"
                    )}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Subtle progress line */}
            <div className="relative mt-10 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000 ease-out"
                style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 text-slate-400 text-xs font-semibold uppercase tracking-widest">
        Secure Auth Handler
      </div>
    </div>
  );
};

export default AuthHandler;
