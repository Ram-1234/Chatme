import React from 'react';
import './header.css';
import logo from './LogoWhitechat.png';


function Header() {
    return (
        <div className="headerContainer">
            <div className="headerLogo">
                <img src={logo} alt="web home logo" />
            </div>
            <div className="homeAboutUser">
                <div className="headerHome">home</div>
                <div className="headerAbout">about</div>
                <div className="headerUser">user</div>
            </div>
        </div>
    )
}

export default Header;
