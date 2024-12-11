import React from "react";
import '../../App.css'; 
import logo from '../../static/logo.png';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


export const Header = () => {
    const navigate = useNavigate();
    const Logout = () => {
        navigate('/');
    };

    return <div class= "header">
        <div class="app-header">
            <div class="header-container">
            <img class="App-logo" src={logo}></img>
            </div>
            <div class="header-container">
            <button class="header-button" onClick={Logout} >
            <i class="fa-solid fa-user"></i>
            </button>
            </div>   
         
        </div>
    
    </div>
}