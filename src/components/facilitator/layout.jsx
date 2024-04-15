import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { getNavLinkClass } from 'utils/formatter';
import { Logout } from 'components';

const FacilitatorLayout = () => (
    <main className="facilitator">
        <h2>Facilitator</h2>
        <Logout.Button />
        <nav>
            <ul>
                <li>
                    <NavLink className={getNavLinkClass} to="settings">
                        Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink className={getNavLinkClass} to="users">
                        Users
                    </NavLink>
                </li>
                <li>
                    <NavLink className={getNavLinkClass} to="overview">
                        Overview
                    </NavLink>
                </li>
            </ul>
        </nav>
        <Outlet />
    </main>
);

export default FacilitatorLayout;
