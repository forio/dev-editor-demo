import { useState, useEffect, useRef } from 'react';

const REFRESH_RATE = 500;

export const useContour = (options, initialize, refreshRate = REFRESH_RATE) => {
    const [chart, setChart] = useState(null);
    const timeoutRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = new Contour(options);
        setChart(chart);
        initialize(chart);
        chart.render();

        const throttledResize = () => {
            if (!timeoutRef.current) {
                timeoutRef.current = setTimeout(() => {
                    timeoutRef.current = null;
                    chart.resize(chartRef?.current?.offsetWidth).render();
                }, refreshRate);
            }
        };
        window.addEventListener('resize', throttledResize);

        return () => {
            window.removeEventListener('resize', throttledResize);
        };
    }, []);

    return [chart, chartRef];
};
