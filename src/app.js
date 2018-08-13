/**
 * App component.
 * @author Josué David Cubero Sánchez.
 */

import 'babel-polyfill'; // necessary for async & await

import React from 'react'; //ES6 modules
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './assets/scss/main.scss';

import Header from './components/header';
import Footer from './components/footer';

// pages
import Home from './pages/home/';
import Pokemon from './pages/pokemon/';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/info/:name/:game' component={Pokemon} />
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    )
};

export default App;