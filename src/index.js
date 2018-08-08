/**
 * Index component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react'; //ES6 modules
import ReactDOM from 'react-dom';

import App from './app';

const Index = () => {
    return (
        <App />
    )
};

ReactDOM.render(<Index />, document.getElementById('root'));