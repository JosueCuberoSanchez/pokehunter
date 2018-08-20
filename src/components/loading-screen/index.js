/**
 * Loading screen component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

import loading from'../../assets/img/content/loading.gif';

import './loading-screen.scss';

const LoadingScreen = ({pokemon})  => {

    if(pokemon) {
        return (
            <div className='pt-5'>
                <div className='loading-screen__loading w-100 d-block text-center'>
                    <img src={loading} className='w-25 d-block mx-auto' alt='Loading' />
                    <p><strong>Wait a second please...</strong></p>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className='loading-screen__loading w-100 d-block text-center'>
                    <img src={loading} className='w-25 d-block mx-auto' alt='Loading' />
                    <p><strong>Wait a second please...</strong></p>
                </div>
            </div>
        )
    }
};

export default LoadingScreen;