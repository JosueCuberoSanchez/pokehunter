/**
 * Header component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

import error from "../../assets/img/content/error.gif";
import './error.scss';

const Index = ()  => {
    return (
        <div>
            <div className="error-screen__error w-100 d-block text-center">
                <p className='error-screen__error-msg'><strong>An error occurred, please try again later...</strong></p>
                <img src={error} className='w-50 d-block mx-auto' alt="Loading" />
            </div>
        </div>
    );
};

export default Index;