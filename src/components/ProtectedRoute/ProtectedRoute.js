import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/api/auth';

function ProtectedRoute({ noAuth, children }) {
  const { user } = useAuth();
  const location = useLocation();
  const from = location?.state?.from || '/';

  if (noAuth && user.success) {
    return children && <Navigate to={from} />;
  }

  if (noAuth && !user.success) {
    return children;
  }

  if (!user.success) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
