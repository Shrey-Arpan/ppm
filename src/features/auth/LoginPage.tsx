import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Shield, FileText, Cpu, ChevronRight, Info } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleMicrosoftSignIn = () => {
    setIsLoading(true)
    // Microsoft Entra ID SSO — wire up MSAL here
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="login-root">
      {/* ─── Left panel ─────────────────────────────────── */}
      <div className="login-left">
        {/* Brand */}
        <div className="login-brand">
          <div className="login-brand-icon">
            <FileText size={20} />
          </div>
          <span className="login-brand-name">AI PPM ANALYSIS PLATFORM</span>
        </div>

        {/* Hero */}
        <div className="login-hero">
          <h1 className="login-hero-title">
            Redefining PPM
            <br />
            <span className="login-hero-accent">Intelligence.</span>
          </h1>
          <p className="login-hero-subtitle">
            Harness the power of AI to extract, summarize, and visualize
            unstructured deal data into structured formats.
          </p>

          {/* Feature pills */}
          <div className="login-features">
            <div className="login-feature-item">
              <Cpu size={16} className="login-feature-icon" />
              <span>AUTOMATED EXTRACTION</span>
            </div>
            <div className="login-feature-item">
              <Shield size={16} className="login-feature-icon" />
              <span>MICROSOFT ENTRA ID AUTHENTICATED</span>
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="login-bottom-nav">
          {['ARCHITECTURE', 'INTELLIGENCE', 'EFFICIENCY'].map((item, i) => (
            <div key={item} className="login-bottom-nav-item">
              <span>{item}</span>
              {i < 2 && <div className="login-bottom-nav-divider" />}
            </div>
          ))}
        </div>

        {/* Animated grid overlay */}
        <div className="login-grid-overlay" aria-hidden="true" />

        {/* Glow blobs */}
        <div className="login-glow-1" aria-hidden="true" />
        <div className="login-glow-2" aria-hidden="true" />
      </div>

      {/* ─── Right panel ────────────────────────────────── */}
      <div className="login-right">
        <Card className="login-card">
          <CardHeader className="login-card-header">
            <CardTitle className="login-card-title">Welcome back.</CardTitle>
            <CardDescription className="login-card-desc">
              Access your institutional deal intelligence platform.
            </CardDescription>
          </CardHeader>

          <CardContent className="login-card-content">
            {/* Microsoft SSO button */}
            <Button
              id="btn-microsoft-signin"
              className="login-ms-btn"
              variant="outline"
              onClick={handleMicrosoftSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="login-ms-spinner" />
              ) : (
                <MicrosoftLogo />
              )}
              <span>{isLoading ? 'Signing in…' : 'Sign in with Microsoft'}</span>
            </Button>

            {/* Divider */}
            <div className="login-divider">
              <Separator className="login-sep" />
              <span className="login-divider-label">ENTERPRISE ACCESS</span>
              <Separator className="login-sep" />
            </div>

            {/* Info card */}
            <div className="login-info-card">
              <Info size={15} className="login-info-icon" />
              <p className="login-info-text">
                Use your Microsoft Entra ID credentials for single-sign-on
                access.
              </p>
            </div>

            {/* Learn more */}
            <button className="login-learn-more" type="button">
              <span>Learn about enterprise security</span>
              <ChevronRight size={14} />
            </button>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="login-footer">
          © {new Date().getFullYear()} AI PPM Analysis Platform. All rights reserved.
        </p>
      </div>
    </div>
  )
}

/* Microsoft logo SVG */
function MicrosoftLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21" fill="none" aria-label="Microsoft logo">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  )
}
