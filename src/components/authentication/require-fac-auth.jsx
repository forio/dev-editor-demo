import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUserType } from 'selectors';
import { useLocation, Navigate } from 'react-router-dom';

const RequireFacAuth = ({ children }) => {
    const location = useLocation();
    const userType = useSelector(selectUserType);

    if (userType !== 'fac') {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

RequireFacAuth.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]),
};

export default RequireFacAuth;
