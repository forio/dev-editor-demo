import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserType, selectAvailableGroups } from 'selectors';
import { login } from 'actions';
import { TextInput, Dropdown } from 'components';

const getAvailablePaths = (userType) => {
    switch (userType) {
        case 'user':
            return ['/'];
        case 'fac':
            return ['/facilitator'];
        default:
            return ['/'];
    }
};

const Login = () => {
    const userType = useSelector(selectUserType);
    const availableGroups = useSelector(selectAvailableGroups);
    const location = useLocation();
    const dispatch = useDispatch();
    const groups = availableGroups.map(({ groupKey, name }) => ({
        id: groupKey,
        text: name,
    }));

    // Redirect if user is already logged in
    if (userType !== 'none') {
        const from = location.state?.from?.pathname;
        const paths = getAvailablePaths(userType);
        const isViablePath = Boolean(
            from &&
                paths.find((p) => (p === '/' ? from === p : from.includes(p)))
        );
        const redirect = isViablePath ? from : paths[0];

        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        return <Navigate to={redirect} replace />;
    }

    return (
        <div id="login">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(login()).catch((error) => {
                        console.error(error);
                    });
                }}
            >
                <TextInput label="Handle" type="text" name="handle" />
                <TextInput label="Password" type="password" name="password" />
                {!!availableGroups.length && (
                    <Dropdown
                        name="group"
                        options={groups}
                        defaultOption="Select a group"
                        label="Group"
                    />
                )}
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

export default Login;
