/**
 * Search form component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

const SearchForm = ()  => {
    return (
        <form className="row form">
                <div className="col-xs-12 col-sm-6 col-md-5 col-lg-5">
                    <div className="form-group">
                        <label htmlFor="filter-by-game">Chose game</label>
                        <input type="email" className="form-control" id="filter-by-game" aria-describedby="emailHelp" placeholder="Enter game version. Eg: red"/>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 text-center d-flex flex-column">
                    <button type="submit" className="btn btn-primary form__button mt-auto mx-auto mb-3">Go!</button>
                </div>
        </form>
    );
};

export default SearchForm;