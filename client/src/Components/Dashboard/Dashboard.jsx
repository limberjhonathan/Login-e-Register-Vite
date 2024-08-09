import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css'

export default function Dashboard({ token }) {
    const navigateTo = useNavigate();


    useEffect(() => {
        const checkTokenValidity = () => {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp <= currentTime) {
                    // Token expirado, redireciona para a página de login
                    localStorage.removeItem('token');
                    navigateTo('/');
                }
            } catch (error) {
                console.error('Token decoding failed:', error);
                // Em caso de falha na decodificação, redireciona para a página de login
                localStorage.removeItem('token');
                navigateTo('/');
            }
        };

        // Checa a validade do token a cada minuto
        const intervalId = setInterval(checkTokenValidity, 1000);

        // Checa a validade imediatamente
        checkTokenValidity();

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, [token, navigateTo]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigateTo('/');
    };

    return (
        <div className='container-btn'>
            <button className='btn' onClick={handleLogout}>Log Out</button>
        </div>
    );
}
