import { useState, useEffect } from 'react';

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(() => document.readyState !== 'complete');

    useEffect(() => {
        if (document.readyState === 'complete') return;

        const handleLoad = () => {
            requestAnimationFrame(() => {
                setIsLoading(false);
            });
        };

        window.addEventListener('load', handleLoad);

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    return isLoading;
};