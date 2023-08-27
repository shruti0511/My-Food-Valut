import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import useAuth from 'hooks/useAuth';

export default function ThemeRoutes() {
  const {isAuthenticated} = useAuth()

  // Define your common routes that are used for both authenticated and non-authenticated users
  const commonRoutes = [
    AuthenticationRoutes,
    {
      path: '*',
      element: <Navigate to="/" replace />,
    }
  ]

  const routes = isAuthenticated ? [
    MainRoutes,
    ...commonRoutes
  ]:[
    {
      path: '/',
      element: <Navigate to="/pages/login/login3" replace />,
    },
    AuthenticationRoutes,
    ...commonRoutes
  ]

  return useRoutes(routes);
}


