import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Settings from './settings';
import Users from './users';
import Overview from './overview';

const Facilitator = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Settings />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} />
            <Route path="overview" element={<Overview />} />
        </Route>
    </Routes>
);

export default Facilitator;
