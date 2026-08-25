import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const handler = (e) => setIsMobile(e.matches);
        setIsMobile(mql.matches);
        // modern browsers
        if (mql.addEventListener) mql.addEventListener('change', handler);
        else mql.addListener(handler);
        return () => {
            if (mql.removeEventListener) mql.removeEventListener('change', handler);
            else mql.removeListener(handler);
        };
    }, [breakpoint]);

    return isMobile;
};

export default useIsMobile;
