import { useCallback, useMemo, useSyncExternalStore } from 'react';

export default function useMediaQuery(query) {
    const media = useMemo(() => window.matchMedia(query), [query]);
    const subscribe = useCallback(listener => {
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [media]);
    const snapshot = useCallback(() => media.matches, [media]);
    return useSyncExternalStore(subscribe, snapshot, () => false);
}
