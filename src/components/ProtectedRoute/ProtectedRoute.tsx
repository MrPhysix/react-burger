import React, { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation, RouteProps } from 'react-router-dom';
import { useAuth } from '../../utils/api/auth';
import { TUser } from '../../types';

type TProtectedRoute = RouteProps & {
  noAuth?: boolean
};

function ProtectedRoute<P>({ noAuth, children }: TProtectedRoute): FC<PropsWithChildren<P>> | any {
  const { user }: {user: TUser } | any = useAuth();

  const location = useLocation();
  const from = location?.state?.from || '/';

  if (noAuth && user?.success) {
    return children && <Navigate to={from} />;
  }

  if (noAuth && !user?.success) {
    return children;
  }

  if (!user || !user.success) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

ProtectedRoute.defaultProps = {
  noAuth: false,
};

export default ProtectedRoute;
