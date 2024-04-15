import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { config } from 'epicenter-libs';

export const useGoogleAnalyticsPageView = () => {
    const location = useLocation();
    useEffect(() => {
        if (!config.isLocal() && window.ga) {
            window.ga(
                'send',
                'pageview',
                `/app/${config.accountShortName}/${config.projectShortName}${location.pathname}`
            );
        }
    }, [location]);
};
