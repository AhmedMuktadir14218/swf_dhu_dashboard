import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './Pages/Auth/LoginPage';
import SewingDashboard from './Pages/SewingDashboard/SewingDashboard';
import UserManagement from './Pages/Admin/UserManagement';
import PoDetailsSewing from './Pages/SewingDashboard/PoDetailsSewing';

function AppRoutes() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071a33]">
        <div className="w-8 h-8 border-[3px] border-white/20 border-t-sky-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<SewingDashboard />} />
        <Route path="admin/users" element={<ProtectedRoute adminOnly><UserManagement /></ProtectedRoute>} />
        <Route path="/po-details" element={<PoDetailsSewing />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
