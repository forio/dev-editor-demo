import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import { Logout } from 'components';

const Header = () => {
    return (
        <Routes>
            <Route path="/login" element={null} />
            <Route
                path="/*"
                element={
                    <header id="header">
                        <Logout.Button />
                    </header>
                }
            />
        </Routes>
    );
};

Header.propTypes = {};

export default Header;
