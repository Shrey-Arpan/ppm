import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FileText, Cpu, AlertCircle, ShieldCheck } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '@/config/msal'
import type { AuthenticationResult } from '@azure/msal-browser'

export default function LoginPage() {
  const [isLoadingAuth, setIsLoadingAuth] = useState(false)
  const { instance } = useMsal();

  const handleLogin = async () => {
    setIsLoadingAuth(true)
    try {
      const response: AuthenticationResult = await instance.loginPopup({
        ...loginRequest,
        redirectUri: '/redirect.html',
      });
      console.log('res: ', response);
      if (response.account) {
        instance.setActiveAccount(response.account);
      }
    } catch (error) {
      console.log("Login Failed", error);

    } finally {
      setIsLoadingAuth(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex overflow-hidden font-sans">
      {/* ─── Left Pane (Visual & Branding) ───────────────── */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover scale-105"
            alt="Architecture"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-slate-900 via-slate-900/80 to-transparent"></div>

        <div className="relative z-20 flex flex-col justify-between h-full p-16 w-full">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-900/20">
              <FileText className="text-white" size={28} />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase">AI PPM Analysis Platform</span>
          </div>

          <div className="max-w-xl">
            <h1 className="text-6xl font-black text-white leading-none mb-6">
              Redefining PPM <br />
              <span className="text-blue-500 underline decoration-4 underline-offset-8">Intelligence.</span>
            </h1>
            <p className="text-xl text-slate-300 font-medium leading-relaxed mb-8">
              Harness the power of AI to extract, summarize, and visualize unstructured deal data into structured formats.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-slate-800/50 rounded-lg text-blue-400">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-tight">Automated Extraction</h4>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-slate-800/50 rounded-lg text-blue-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-tight">Microsoft Entra ID authenticated</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
            <span>Architecture</span>
            <span className="w-8 h-[1px] bg-slate-700"></span>
            <span>Intelligence</span>
            <span className="w-8 h-[1px] bg-slate-700"></span>
            <span>Efficiency</span>
          </div>
        </div>
      </div>

      {/* ─── Right Pane (Authentication) ─────────────────── */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-center p-8 md:p-16 bg-white">
        <div className="w-full max-sm:px-4">
          <div className="lg:hidden mb-12 flex justify-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <FileText className="text-white" size={24} />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">AI PPM Analysis Platform</span>
            </div>
          </div>

          {/* Welcome Header */}
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 mb-3">Welcome back.</h2>
            <p className="text-slate-500 font-medium">Access your institutional deal intelligence platform.</p>
          </div>

          {/* Authentication Actions */}
          <div className="space-y-4">
            {/* Microsoft SSO button */}
            <Button
              id="btn-microsoft-signin"
              className="w-full flex items-center justify-center gap-4 py-6 px-6 rounded-2xl font-bold transition-all shadow-md active:scale-[0.98] disabled:opacity-70 group border bg-blue-50 border-blue-200 text-blue-600"
              variant="outline"
              onClick={handleLogin}
              disabled={isLoadingAuth}
            >
              {isLoadingAuth ? (
                <>
                  <Spinner data-icon="inline-end" className="text-blue-600" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <MicrosoftLogo />
                  <span>Sign in with Microsoft</span>
                </>
              )}
            </Button>

            {/* Divider Section */}
            <div className="flex items-center gap-4 py-2">
              <Separator className="flex-1 bg-slate-100 w-auto" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Enterprise Access</span>
              <Separator className="flex-1 bg-slate-100 w-auto" />
            </div>

            {/* Info/Alert Box */}
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
              <div className="flex gap-3 items-start">
                <AlertCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed font-medium">
                  Use your Microsoft Entra ID credentials for single-sign-on access.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

/* Microsoft logo SVG */
function MicrosoftLogo() {
  return (
    <svg className="w-5 h-5 transition-all" viewBox="0 0 21 21" fill="none" aria-label="Microsoft logo">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  )
}