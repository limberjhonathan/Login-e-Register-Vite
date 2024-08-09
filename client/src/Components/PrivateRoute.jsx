import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
    const token = localStorage.getItem('token');

    let isAuthenticated = false;
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp > currentTime) {
                isAuthenticated = true;
            }
        } catch (error) {
            console.error('Token decoding failed:', error);
        }
    }
    return isAuthenticated ? <Element token={token}/> : <Navigate to="/" replace />;
};

export default PrivateRoute;