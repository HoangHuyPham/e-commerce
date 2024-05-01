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
        let user = null
      
        return (
            <div className="top-bar">
                <a className="top-bar__item"><img src={logo} className="app-header__logo" alt="logo" /></a>
                <div className="top-bar__search-bar-wrapper">
                    <input placeholder="Search..." type="text" className="search-bar"></input>
                    <button className="search-button"><i className="fa-solid fa-search"></i></button>
                </div>

                <div className="top-bar__cart solid--hover">
                    <div className="icon"><i className="fa-solid fa-cart-shopping"></i></div>
                    <label>Cart</label>
                    {(cart > 0 && cart < 10)?<div className="badge">{cart}</div>:<div className="badge">9+</div>}
                </div>

                {
                    user?
                    <div className="top-bar__user solid--hover">
                        <div className="icon"><i className="fa-solid fa-user"></i></div>
                        <label>{user.name}</label>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>:
                    <div className="top-bar__signin-signup">
                        <div className="btn">Sign in <i className="fa-solid fa-right-from-bracket"></i></div>
                        <div className="btn btn--signup">Sign up <i className="fa-solid fa-user-plus"></i></div>
                    </div>
                }
            </div>
        )
    }
}

export default TopBar