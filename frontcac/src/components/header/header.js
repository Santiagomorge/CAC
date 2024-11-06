import React from "react";
import '../../App.css'; 
import logo from '../../static/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';


export const Header = () => {
    return <div class= "header">
        <div class="app-header">
            <div class="header-container">
            <img class="App-logo" src={logo}></img>
            </div>
            <div class="header-container">
            <button class="header-button">
            <i class="fa-solid fa-user"></i>
            </button>
            </div>   
         
        </div>
    
    </div>
}