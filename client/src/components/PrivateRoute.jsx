import { isAuthenticated } from '../helpers/authService';
import { Navigate, useNavigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {

    const auth = isAuthenticated();


    return auth ? children : <Navigate to={'/login'} replace />;
};
