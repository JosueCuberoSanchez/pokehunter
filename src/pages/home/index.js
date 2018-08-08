/**
 * Main page component.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

import SearchForm from '../../components/home-main/search-form/';
import DataTable from '../../components/home-main/data-table/';

export class Home extends Component {
    render () {
        return (
            <main className="w-100">
                <section className="container-fluid pt-4 pb-5">
                    <div className="container main">
                        <SearchForm />
                        <DataTable />
                    </div>
                </section>
            </main>
        )
    }
}

export default Home;
