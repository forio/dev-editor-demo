import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { logout } from 'actions';
import { useDispatch } from 'react-redux';

const Route = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
    }, []);

    return <Navigate to="/login" replace />;
};

const Button = ({ ...props }) => {
    const dispatch = useDispatch();

    return (
        <button type="button" onClick={() => dispatch(logout())} {...props}>
            Logout
        </button>
    );
};

const Logout = {
    Route,
    Button,
};

export default Logout;
