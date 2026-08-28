import { useState, useEffect, useCallback } from 'react';
import { useThemeContext } from '../../../context/ThemeContext';
import Grainient from '../../Grainient';

const GlobalGrid = () => {
    const { theme } = useThemeContext();
    const isDark = theme === 'dark';
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const handleMouseMove = useCallback((e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
    }, []);

    const handleScroll = useCallback(() => {
        setScrollY(window.scrollY);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const coarsePointer = window.matchMedia('(pointer: coarse)');
        const noHover = window.matchMedia('(hover: none)');

        const checkIsMobile = () =>
            mediaQuery.matches || coarsePointer.matches || noHover.matches;

        setIsMobile(checkIsMobile());

        const handleMediaChange = () => setIsMobile(checkIsMobile());

        // Compatibilidad con navegadores: addEventListener vs addListener
        [mediaQuery, coarsePointer, noHover].forEach((mq) => {
            if (mq.addEventListener) mq.addEventListener('change', handleMediaChange);
            else mq.addListener(handleMediaChange);
        });

        return () => {
            [mediaQuery, coarsePointer, noHover].forEach((mq) => {
                if (mq.removeEventListener) mq.removeEventListener('change', handleMediaChange);
                else mq.removeListener(handleMediaChange);
            });
        };
    }, []);

    useEffect(() => {
        if (isMobile) return;

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleScroll, handleMouseLeave, isMobile]);

    const gridOffsetX = (mousePos.x / window.innerWidth - 0.5) * 20;
    const gridOffsetY = ((mousePos.y + scrollY) / window.innerHeight - 0.5) * 20;

    const glowX = mousePos.x;
    const glowY = mousePos.y;

    return (
        <>
            <style>{`
                @keyframes grid-pulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 1; }
                }

                @keyframes grid-wave {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 160px 160px; }
                }

                @keyframes grid-scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
                @media (max-width: 768px), (pointer: coarse), (hover: none) {
                    .cursor-circle, .cursor-dot {
                        display: none !important;
                    }
                }
            `}</style>

            {isDark ? (
                <div
                    aria-hidden="true"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        pointerEvents: 'none',
                        zIndex: 0,
                        overflow: 'hidden',
                        opacity: 1,
                    }}
                >
                    <Grainient
                        color1="#454545"
                        color2="#0a0a0b"
                        color3="#444444"
                        timeSpeed={1.4}
                        colorBalance={-0.01}
                        warpStrength={2.2}
                        warpFrequency={4.2}
                        warpSpeed={2}
                        warpAmplitude={50}
                        blendAngle={0}
                        blendSoftness={0.05}
                        rotationAmount={500}
                        noiseScale={2}
                        grainAmount={0.1}
                        grainScale={2}
                        grainAnimated={false}
                        contrast={1.5}
                        gamma={1}
                        saturation={1}
                        centerX={0}
                        centerY={0}
                        zoom={0.9}
                    />
                </div>
            ) : (
                <div
                    aria-hidden="true"
                    className="global-grid"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        pointerEvents: 'none',
                        zIndex: 1,
                        backgroundImage: `linear-gradient(rgba(20, 20, 20, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 20, 20, 0.12) 1px, transparent 1px)`,
                        backgroundSize: '80px 80px',
                        transform: `translate(${gridOffsetX}px, ${gridOffsetY}px)`,
                        animation: 'grid-pulse 3s ease-in-out infinite, grid-wave 8s linear infinite',
                        transition: 'transform 0.1s ease-out'
                    }}
                />
            )}

            {/* Cursor Circle - Border only - oculto en mobile */}
            {!isMobile && (
                <>
                    <div
                        aria-hidden="true"
                        className="cursor-circle"
                        style={{
                            position: 'fixed',
                            pointerEvents: 'none',
                            zIndex: 99999,
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: isDark ? '1px solid rgba(232, 232, 232, 0.35)' : '1px solid rgba(20, 20, 20, 0.6)',
                            transform: `translate(${glowX - 20}px, ${glowY - 20}px)`,
                            transition: 'transform 0.08s ease-out',
                            opacity: isHovering ? 1 : 0
                        }}
                    />

                    {/* Moving Highlight Dot - oculto en mobile */}
                    <div
                        aria-hidden="true"
                        className="cursor-dot"
                        style={{
                            position: 'fixed',
                            pointerEvents: 'none',
                            zIndex: 99999,
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: isDark ? 'rgba(232, 232, 232, 0.85)' : 'rgba(20, 20, 20, 1)',
                            transform: `translate(${glowX - 3}px, ${glowY - 3}px)`,
                            transition: 'transform 0.05s ease-out',
                            opacity: isHovering ? 1 : 0
                        }}
                    />
                </>
            )}
        </>
    );
};

export default GlobalGrid;
