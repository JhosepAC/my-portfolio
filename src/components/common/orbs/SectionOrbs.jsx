import {useEffect, useState, useRef, useCallback} from 'react';

const createOrbStyle = (orb) => ({
    position: 'absolute',
    borderRadius: '50%',
    background: orb.gradient,
    filter: `blur(${orb.blur}px)`,
    pointerEvents: 'none',
    willChange: 'transform',
    ...orb.style
});

const sectionOrbsData = {
    home: [
        { width: 400, height: 400, gradient: 'radial-gradient(circle, rgba(88, 166, 255, 0.2), transparent)', blur: 80, style: { top: '10%', right: '-5%' }, animation: 'float-orb-1 12s ease-in-out infinite' },
        { width: 350, height: 350, gradient: 'radial-gradient(circle, rgba(125, 140, 255, 0.15), transparent)', blur: 100, style: { top: '60%', left: '-5%' }, animation: 'float-orb-2 14s ease-in-out infinite' },
    ],
    skills: [
        { width: 300, height: 300, gradient: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent)', blur: 60, style: { top: '20%', right: '-10%' }, animation: 'float-orb-3 16s ease-in-out infinite' },
        { width: 250, height: 250, gradient: 'radial-gradient(circle, rgba(88, 166, 255, 0.12), transparent)', blur: 70, style: { top: '70%', left: '5%' }, animation: 'float-orb-4 13s ease-in-out infinite' },
    ],
    projects: [
        { width: 400, height: 400, gradient: 'radial-gradient(circle, rgba(59, 130, 246, 0.12), transparent)', blur: 90, style: { top: '30%', right: '-15%' }, animation: 'float-orb-1 15s ease-in-out infinite' },
        { width: 280, height: 280, gradient: 'radial-gradient(circle, rgba(199, 146, 255, 0.1), transparent)', blur: 80, style: { bottom: '10%', left: '-5%' }, animation: 'float-orb-2 18s ease-in-out infinite' },
    ],
    education: [
        { width: 320, height: 320, gradient: 'radial-gradient(circle, rgba(88, 166, 255, 0.1), transparent)', blur: 70, style: { top: '15%', left: '-8%' }, animation: 'float-orb-3 14s ease-in-out infinite' },
        { width: 260, height: 260, gradient: 'radial-gradient(circle, rgba(125, 140, 255, 0.12), transparent)', blur: 60, style: { bottom: '20%', right: '-5%' }, animation: 'float-orb-4 12s ease-in-out infinite' },
    ],
    contact: [
        { width: 450, height: 450, gradient: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent)', blur: 100, style: { top: '20%', right: '-10%' }, animation: 'float-orb-2 16s ease-in-out infinite' },
        { width: 300, height: 300, gradient: 'radial-gradient(circle, rgba(88, 166, 255, 0.1), transparent)', blur: 80, style: { bottom: '10%', left: '10%' }, animation: 'float-orb-1 14s ease-in-out infinite' },
    ]
};

const SectionOrbs = ({ sectionId }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    const rafRef = useRef(null);
    const targetPos = useRef({ x: 0, y: 0 });

    const orbs = sectionOrbsData[sectionId] || [];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        targetPos.current = {
            x: (e.clientX - centerX) / 30,
            y: (e.clientY - centerY) / 30
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const animate = () => {
            setMousePosition(prev => ({
                x: prev.x + (targetPos.current.x - prev.x) * 0.05,
                y: prev.y + (targetPos.current.y - prev.y) * 0.05
            }));
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isVisible]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !isVisible) return;

        container.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => container.removeEventListener('mousemove', handleMouseMove);
    }, [isVisible, handleMouseMove]);

    return (
        <div 
            ref={containerRef}
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 1,
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: 'transform 0.3s ease-out'
            }}
        >
            {orbs.map((orb, index) => (
                <div
                    key={index}
                    style={{
                        ...createOrbStyle(orb),
                        animation: orb.animation
                    }}
                />
            ))}
        </div>
    );
};

export default SectionOrbs;