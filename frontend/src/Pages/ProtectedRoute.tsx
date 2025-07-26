import React from 'react';
import { useAppSelector } from '../redux/store/store';
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;