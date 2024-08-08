import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigateTo = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove o token de autenticação
        navigateTo('/'); // Redireciona para a página de login
    };

    return (
        <div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}
