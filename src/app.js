/**
 * App component.
 * @author Josué David Cubero Sánchez.
 */

import 'babel-polyfill'; // necessary for async & await

import React from 'react'; //ES6 modules
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

//Styles
import './assets/scss/main.scss';

// Components
import Header from './components/header';
import Footer from './components/footer';

// Pages
import Home from './pages/home/';
import Pokemon from './pages/pokemon/';

const App = () => {
    return (
        <Provider store={store}>
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
        </Provider>
    )
};

export default App;