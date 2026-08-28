import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'theme';
const DARK = 'dark';
const LIGHT = 'light';

function getSystemPreference() {
    if (typeof window === 'undefined') return LIGHT;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
}

function getInitialTheme() {
    if (typeof window === 'undefined') return LIGHT;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === DARK || stored === LIGHT) return stored;
    return getSystemPreference();
}

export function useTheme() {
    const [theme, setTheme] = useState(getInitialTheme);

    const applyTheme = useCallback((value) => {
        const root = document.documentElement;
        root.setAttribute('data-theme', value);
        localStorage.setItem(STORAGE_KEY, value);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', value === DARK ? '#0a0a0b' : '#f2f2f2');
        }
    }, []);

    useEffect(() => {
        applyTheme(theme);
    }, [theme, applyTheme]);

    useEffect(() => {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e) => {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === DARK || stored === LIGHT) return;
            const next = e.matches ? DARK : LIGHT;
            setTheme(next);
        };
        if (mql.addEventListener) mql.addEventListener('change', handler);
        else mql.addListener(handler);
        return () => {
            if (mql.removeEventListener) mql.removeEventListener('change', handler);
            else mql.removeListener(handler);
        };
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === DARK ? LIGHT : DARK));
    }, []);

    return { theme, toggleTheme, setTheme };
}
