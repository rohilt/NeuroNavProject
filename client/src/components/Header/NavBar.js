import React from 'react';
import { Link } from 'react-router-dom';
//import LoginPage from '../auth/LoginPage';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className = "header">
            {/* Logo */}
            <a target='_blank' rel="noopener noreferrer" href="https://neurosurgery.ufl.edu">
                <img className = "nav-logo" src={"/Orange-UF-Monogram.jpg"} alt="React logo" />
            </a>
            <h1 className="text">
                DEPARTMENT OF NEUROSURGERY
            </h1>

            {/* Page Links */}
            <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>Home</Link>
                <Link className = "nav-link" to='/Directions'>Directions</Link>
                <Link className = "nav-link" to='/Info'>Sign-In</Link>


            </div>

        </div>
    )
};

export default NavBar;
