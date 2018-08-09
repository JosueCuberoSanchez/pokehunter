/**
 * App component.
 * @author Josué David Cubero Sánchez.
 */

import 'babel-polyfill'; // necessary for async & await

import React from 'react'; //ES6 modules
import { BrowserRouter, Route} from 'react-router-dom';

import './assets/scss/main.scss';

import Header from './components/header';
import Footer from './components/footer';

// pages
import Home from './pages/home/';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Route exact path='/' component={Home} />
                <Footer />
            </div>
        </BrowserRouter>
    )
};

export default App;