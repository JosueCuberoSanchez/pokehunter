import React from "react";

const SearchBar = (props) => {
    let input;
    const handleChange = () => {
        props.onSearch(input.value);
    };
    return (
        <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-5">
                <label htmlFor="filter">Search on the results</label>
                <input
                    className="form-control "
                    ref={n => input = n}
                    type="text"
                    onChange={handleChange}
                    id="filter"
                    placeholder="Search something, trainer."
                />
            </div>
        </div>
    );
};

export default SearchBar;