import React, { Component } from "react";
import logo from '../assets/images/logo.png';

class TopBar extends React.Component{
    render(){
        return (
            <div className="top-bar">
                <a className="top-bar__item"><img src={logo} className="app-header__logo" alt="logo" /></a>
                <div className="top-bar__search-bar-wrapper">
                    <input placeholder="Search..." type="text" className="search-bar"></input>
                    <button className="search-button"><i className="fa-solid fa-search"></i></button>
                </div>
                <div className="top-bar__user">
                    <div className="icon"><i className="fa-solid fa-user"></i></div>
                    <div className="name">User no1</div>
                </div>
            </div>
        )
    }
}

export default TopBar