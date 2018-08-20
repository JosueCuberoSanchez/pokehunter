/**
 * Main page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

import HomeContainer from '../../containers/home/';

class Home extends Component {
    render () {
        return (
            <main className='w-100'>
                <section className='container-fluid pt-4 pb-5'>
                        <HomeContainer />
                </section>
            </main>
        )
    }
}

export default Home;
