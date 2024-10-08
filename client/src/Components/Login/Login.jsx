import { useState, useEffect } from "react";
import './Login.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import Axios from "axios";
import { jwtDecode } from "jwt-decode";

import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';

export default function Login() {
    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigateTo = useNavigate();

    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    // useEffect que verifica se um token válido está presente no localStorage ao carregar o componente.
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                // Se o token estiver válido, redireciona para a página de dashboard.
                if (decodedToken.exp > currentTime) {
                    navigateTo('/dashboard');
                }
            } catch (error) {
                console.error('Token decoding failed:', error);
                localStorage.removeItem('token');
            }
        }
    }, [navigateTo]);

    // Função para lidar com o envio do formulário de login
    const loginUser = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/login', {
            LoginUserName: loginUserName,
            LoginPassword: loginPassword
        }).then((response) => {
            console.log(response);

            if (response.data.message === 'Login successful') {
                localStorage.setItem('token', response.data.token);
                navigateTo('/dashboard');
            } else {
                setLoginStatus('Credentials Don’t Exist!');
                navigateTo('/');
            }
        });
    };

    // useEffect para controlar a exibição da mensagem de status.
    useEffect(() => {
        if (loginStatus !== '') {
            setStatusHolder('showMessage');
            setTimeout(() => {
                setStatusHolder('message');
            }, 4000);
        }
    }, [loginStatus]);

    return (
        <div className='loginPage flex'>
            <div className="container flex">
                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>
                    <div className="textDiv">
                        <h2 className='title'>Create and Sell Extraordinary Products</h2>
                        <p>Adopt the peace of nature!</p>
                    </div>

                    <div className="footerDiv flex">
                        <span className="text">Don’t have an account?</span>
                        <Link to={'/register'}>
                            <button className="btn">Sign Up</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt='Logo Image'/>
                        <h3>Welcome Back!</h3>
                    </div>

                    <form action="" className='form grid' onSubmit={loginUser}>
                        <span className={statusHolder}>{loginStatus}</span>
                        <div className="inputDiv">
                            <label htmlFor='username'>Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon'/>
                                <input type='text' id='username' placeholder='Enter Username' onChange={(e) => {
                                    setLoginUserName(e.target.value);
                                }}/>
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor='password'>Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon'/>
                                <input type='password' id='password' placeholder='Enter Password' onChange={(e) => {
                                    setLoginPassword(e.target.value);
                                }}/>
                            </div>
                        </div>

                        <button type='submit' className='btn flex'>
                            <span>Login </span>
                            <AiOutlineSwapRight className='icon'/>
                        </button>

                        <span className="forgotPassword">
                            Forgot your password? <a href=''>Click Here</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}
