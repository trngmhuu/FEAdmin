import React from 'react';
import './header.css';
import Logo from './logo/Logo';
import Nav from './nav/Nav';

function Header() {
    return (
        <header id='header' className='header fixed-top d-flex align-items-center' >
            {/* logo */}
            <Logo />
            {/* nav */}
            <Nav />
        </header>
    )
}

export default Header