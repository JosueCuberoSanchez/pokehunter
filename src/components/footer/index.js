/**
 * Header component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

import logo from'../../assets/img/content/logo.png';
import trainer from'../../assets/img/content/trainer.png';

const Footer = ()  => {
    return (
        <footer>
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex">
                                <a className="navbar-brand mr-0 navbar__small-text justify-content-center align-self-center" href="#">
                                <img src={logo} alt="Pokéhunter logo" className="w-50 mr-2"/>
                                powered by PokéAPI
                                </a>
                            </div>
                            <div className="col-xs-12 col-sm-5 offset-sm-1 col-md-5 offset-md-1 col-lg-5 offset-lg-1">
                                <a className="nav-link pl-3 navbar__link" href="https://josuecuberosanchez.github.io/Developer_portfolio/">
                                Meet the author trainer
                                <img src={trainer} alt="Pokéhunter trainer" className="navbar__trainer ml-5"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;