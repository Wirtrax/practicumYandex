import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

export const ProtectedAuthorizedRoute = ({ children }) => {
    const location = useLocation();

    const { isAuth: isAuthFromAuth } = useSelector((state) => state.auth);
    const { isAuth: isAuthFromRefresh, isAuthChecked } = useSelector((state) => state.refreshToken);

    const isAuthenticated = isAuthFromAuth || isAuthFromRefresh;

    if (!isAuthChecked) {
        return <Loader/>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};