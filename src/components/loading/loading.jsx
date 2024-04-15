import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

const Loading = () => {
    const loading = useSelector((state) => state.loading);
    const ignoreLoadScreen = loading.every(
        ({ ignoreLoadScreen }) => !!ignoreLoadScreen
    );
    return (
        <div className="loading">
            <span className="accessibility-text" aria-live="polite" aria-atomic>
                {loading.length ? 'Loading' : 'Finished Loading'}
            </span>
            {!ignoreLoadScreen && loading.length > 0 ? (
                <Fragment>
                    <div className="loading-background-cover" />
                    <span className="pulse-loading" />
                </Fragment>
            ) : null}
        </div>
    );
};

export default Loading;
