import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/features/auth/LoginPage'
import DashboardPage from './features/dashboard/dashboardPage'
import AuthHandler from '@/features/auth/AuthHandler'
import { useIsAuthenticated } from '@azure/msal-react'

function App() {
  const isAuthenticated = useIsAuthenticated();

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
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  )
}

export default App
