import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useIsAuthenticated } from '@azure/msal-react'
import LoginPage from '@/features/auth/LoginPage'
import DashboardPage from '@/features/dashboard/dashboardPage'
import ViewDataPage from '@/features/view-data/viewDataPage'
import AuthHandler from '@/features/auth/AuthHandler'

export const ROUTES = {
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  VIEW_DATA: '/view-data',
  AUTH: '/auth'
}


function ProtectedLayout() {
  const isAuthenticated = useIsAuthenticated()
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
}

function PublicLayout() {
  const isAuthenticated = useIsAuthenticated()
  return isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Outlet />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Route>

      <Route path={ROUTES.AUTH} element={<AuthHandler />} />

      <Route element={<ProtectedLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.VIEW_DATA} element={<ViewDataPage />} />
      </Route>
    </Routes>
  )
}
