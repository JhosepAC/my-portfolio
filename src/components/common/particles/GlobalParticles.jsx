import { useEffect, useMemo, useState } from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
const seededRandom = seed => { const x = Math.sin(seed) * 10000; return x - Math.floor(x); };
export default function GlobalParticles() {
    const mobile = useMediaQuery('(max-width: 768px)');
    const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
    const [hidden, setHidden] = useState(() => document.hidden);
    useEffect(() => {
        const update = () => setHidden(document.hidden);
        document.addEventListener('visibilitychange', update);
        return () => document.removeEventListener('visibilitychange', update);
    }, []);
    const particles = useMemo(() => Array.from({ length: mobile ? 8 : 24 }, (_, i) => ({
        id: i, left: seededRandom(42 + i * 4) * 100, top: seededRandom(43 + i * 4) * 100,
        delay: seededRandom(44 + i * 4) * 8, duration: 8 + seededRandom(45 + i * 4) * 12,
    })), [mobile]);
    if (reduced) return null;
    return <div className="global-particles" aria-hidden="true" data-paused={hidden}>
        {particles.map(p => <div key={p.id} className="global-particle" style={{
            left: p.left + '%', top: p.top + '%', animationDelay: p.delay + 's', animationDuration: p.duration + 's',
        }} />)}
    </div>;
}
