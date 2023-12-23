import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined

  const roles = decoded?.roles || [] ;
  
  return (
    roles.find(role => allowedRoles?.includes(role.authority))
    ? <Outlet />
    : auth?.user
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;