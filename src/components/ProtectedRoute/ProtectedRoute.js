import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/api/auth';

function ProtectedRoute({ noAuth, children }) {
  const { user } = useAuth();

  if (noAuth && user.success) {
    return children && <Navigate to="/" replace />;
  }

  if (noAuth && !user.success) {
    return children;
  }

  if (!user.success) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
