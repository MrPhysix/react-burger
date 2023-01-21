import React, { ReactElement } from 'react';
import { Navigate, useLocation, RouteProps } from 'react-router-dom';
import { useAuth } from '../../utils/api/auth';

type TProtectedRoute = RouteProps & {
  noAuth?: boolean
};

function ProtectedRoute({ noAuth, children }: TProtectedRoute): ReactElement
  | React.ReactNode | any {
  // не знаю как тут тип return ставить
  const { user }: any /* и такое */ = useAuth();

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

ProtectedRoute.defaultProps = {
  noAuth: false,
};

export default ProtectedRoute;
