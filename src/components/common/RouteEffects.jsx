import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppReady } from '../../context/AppReadyContext';

export default function RouteEffects() {
    const { pathname, hash, key } = useLocation();
    const { i18n } = useTranslation();
    const ready = useAppReady();

    useEffect(() => {
        document.documentElement.lang = i18n.resolvedLanguage || 'es';
    }, [i18n.resolvedLanguage]);

    useEffect(() => {
        if (!ready) return;
        const frame = requestAnimationFrame(() => {
            const id = hash.slice(1);
            const target = id ? document.getElementById(id) : null;
            if (target) {
                target.scrollIntoView({ behavior: 'instant', block: 'start' });
            } else {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
            const focusTarget = target?.querySelector('h1, h2') || document.querySelector('[data-page-title]');
            if (focusTarget) {
                focusTarget.setAttribute('tabindex', '-1');
                focusTarget.focus({ preventScroll: true });
            }
        });
        return () => cancelAnimationFrame(frame);
    }, [pathname, hash, key, ready]);

    return null;
}
