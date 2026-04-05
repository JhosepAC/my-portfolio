import {useMemo} from 'react';

const PARTICLE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 40;

const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const GlobalParticles = () => {
    const particles = useMemo(() => {
        const data = [];
        const baseSeed = 42;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            data.push({
                id: i,
                left: seededRandom(baseSeed + i * 4) * 100,
                top: seededRandom(baseSeed + i * 4 + 1) * 100,
                delay: seededRandom(baseSeed + i * 4 + 2) * 8,
                duration: 8 + seededRandom(baseSeed + i * 4 + 3) * 12
            });
        }
        return data;
    }, []);

    return (
        <div className="global-particles" aria-hidden="true">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="global-particle"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`
                    }}
                />
            ))}
        </div>
    );
};

export default GlobalParticles;
