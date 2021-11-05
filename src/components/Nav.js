import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {

    render() {
        return (
            <div className="Nav">
                    <Link to="/">Logo</Link>
                    <Link to="/autocomplete">AutoComplete</Link>
                    <Link to="/count">Count</Link>
                    <Link to="/apicalls">APICalls</Link>
                    <Link to="/card">Card</Link>

            </div>
        )
    }
}

export default Nav;