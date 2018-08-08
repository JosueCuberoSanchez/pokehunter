/**
 * Header component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

import logo from'../../assets/img/content/logo.png';

const Header = ()  => {
    return (
        <header>
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                                <a className="navbar-brand mr-0" href="#"><img src={logo} alt="Pokéhunter logo" className="w-75"/></a>
                            </div>
                            <div className="col-xs-3 offset-xs-3 col-sm-3 offset-sm-3 col-md-3 offset-md-5 col-lg-3 offset-lg-6">
                                <ul className="d-flex justify-content-between pl-0 mb-0">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="about.html">About<span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="https://pokeapi.co/">API</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;