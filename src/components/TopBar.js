import React, { Component } from "react";
import logo from '../assets/images/logo.png';

class TopBar extends React.Component{
    state = {
        cart:5,
        user:{
            id:123,
            name:"Nguyen Van A",
            balance:0
        }
    }
    
    constructor(props){
        super(props)
    }
 
    render(){

        let {cart} = this.state
        let {user} = this.state
      
        return (
            <div className="top-bar">
                <a className="top-bar__item"><img src={logo} className="app-header__logo" alt="logo" /></a>
                <div className="top-bar__search-bar-wrapper">
                    <input placeholder="Search..." type="text" className="search-bar"></input>
                    <button className="search-button"><i className="fa-solid fa-search"></i></button>
                </div>

                <div className="top-bar__cart solid--hover">
                    <div className="icon"><i className="fa-solid fa-cart-shopping"></i></div>
                    <div className="name">Cart</div>
                    {(cart > 0 && cart < 10)?<div className="badge">{cart}</div>:<div className="badge">9+</div>}
                </div>

                {
                    user && 
                    <div className="top-bar__user solid--hover">
                        <div className="icon"><i className="fa-solid fa-user"></i></div>
                        <div className="name">{user.name}</div>
                    </div>
                }
            </div>
        )
    }
}

export default TopBar