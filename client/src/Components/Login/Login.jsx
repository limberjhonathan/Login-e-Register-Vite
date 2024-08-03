// import React from "react";
import './Login.css';
import { Link } from 'react-router-dom';

import video from '../../LoginAssets/video.mp4'
import logo from '../../LoginAssets/logo.png'

export default function Login() {
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
                        <span className="text">Don't have an account?</span>
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

                    <form action="" className='form grid'>
                        <sapn>Login Status will go here</sapn>
                        <div className="inputDiv">
                            <label htmlFor='username'>Username</label>
                            <div className="input flex">
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
