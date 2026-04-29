import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/features/auth/LoginPage'
import DashboardPage from './features/dashboard/dashboardPage'
import AuthHandler from '@/features/auth/AuthHandler'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'

function App() {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup();
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
        />
        <Route path="/auth" element={<AuthHandler />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  )
}

export default App
