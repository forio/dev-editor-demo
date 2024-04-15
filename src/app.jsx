import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { errorManager } from 'epicenter-libs';
import {
    Login,
    Logout,
    Header,
    Footer,
    Loading,
    Test,
    Facilitator,
    NotFound,
    RequireFacAuth,
    RequireUserAuth,
    Modal,
} from 'components';
import { useGoogleAnalyticsPageView } from 'hooks';
import { logout, regenerateSession } from 'actions/login-actions';
import { openModal } from 'actions/modal-actions';
import { selectModalOpen } from 'selectors/general-selectors';
import { handleLoad } from 'actions/loading-actions';

import 'normalize.css/normalize.css';
import 'css/main.scss';

const matchAttemptRegenerate = (() => {
    const status = 401;
    const codes = ['AUTHENTICATION_EXPIRED', 'AUTHENTICATION_INVALIDATED'];
    return (error) => error.status === status && codes.includes(error.code);
})();

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const { unregister } = errorManager.registerHandler(
            matchAttemptRegenerate,
            (error, retry) =>
                dispatch(async (_, getState) => {
                    const failModal = 'regenerate-fail';
                    const state = getState();
                    const awaitingUserLogout =
                        selectModalOpen(failModal)(state);
                    if (awaitingUserLogout) throw error;
                    try {
                        await dispatch(regenerateSession);
                    } catch (regenerateError) {
                        dispatch(openModal(failModal));
                        throw regenerateError;
                    }
                    return retry();
                })
        );
        return unregister;
    }, [dispatch]);

    useGoogleAnalyticsPageView();

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout.Route />} />
                    <Route
                        path="facilitator/*"
                        element={
                            <RequireFacAuth>
                                <Suspense
                                    fallback={
                                        <>Loading facilitator component...</>
                                    }
                                >
                                    <Facilitator />
                                </Suspense>
                            </RequireFacAuth>
                        }
                    />
                    <Route
                        index
                        element={
                            <RequireUserAuth>
                                <Test />
                            </RequireUserAuth>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Loading />
            <Footer />
            <Modal
                name="regenerate-fail"
                unavoidable
                buttons={[
                    {
                        text: 'Back to login',
                        onClick: () =>
                            dispatch(handleLoad(dispatch(logout()), 'logout')),
                    },
                ]}
            >
                <p>
                    Your session has expired and could not be automatically
                    renewed. Please return to the login page to log in again.
                </p>
            </Modal>
        </>
    );
};

export default App;
