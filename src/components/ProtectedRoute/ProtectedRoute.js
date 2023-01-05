import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/api/auth';

function ProtectedRoute({ noAuth, children }) {
  const { getUser, user } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    if (!isUserLoaded) return null;
    await getUser();
    return setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (noAuth && !user) {
    return children;
  }

  if (noAuth && user) {
    return children && <Navigate to="/" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
