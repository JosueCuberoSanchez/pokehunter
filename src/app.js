/**
 * App component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react'; //ES6 modules
import './assets/scss/main.scss';
import { BrowserRouter, Route} from 'react-router-dom';

import Header from './components/header';
import Home from './pages/home/';
import Footer from './components/footer';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path='/' component={Home} />
                    <Footer />
                </div>
            </BrowserRouter>
        </div>
    )
};

export default App;