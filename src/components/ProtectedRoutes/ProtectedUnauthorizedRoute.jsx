import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedUnauthorizedRoute = () => {
    const location = useLocation();

    const { isAuth: isAuthFromAuth } = useSelector((state) => state.auth);
    const { isAuth: isAuthFromRefresh, isAuthChecked } = useSelector((state) => state.refreshToken);

    const isAuthenticated = isAuthFromAuth || isAuthFromRefresh;

    if (!isAuthChecked) {
        return <div>Проверка аутентификации...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
};