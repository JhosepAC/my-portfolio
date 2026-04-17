import { useState, useEffect, useCallback } from 'react';

const GlobalGrid = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

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
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleScroll, handleMouseLeave]);

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
            `}</style>

            {/* Base Grid with stronger visibility */}
            <div 
                aria-hidden="true" 
                className="global-grid"
                style={{
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 1,
                    backgroundImage: `
                        linear-gradient(rgba(88, 166, 255, 0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(88, 166, 255, 0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                    transform: `translate(${gridOffsetX}px, ${gridOffsetY}px)`,
                    animation: 'grid-pulse 3s ease-in-out infinite, grid-wave 8s linear infinite',
                    transition: 'transform 0.1s ease-out'
                }}
            />

            {/* Cursor Circle - Border only */}
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 2,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid rgba(88, 166, 255, 0.6)',
                    boxShadow: '0 0 10px rgba(88, 166, 255, 0.3), inset 0 0 10px rgba(88, 166, 255, 0.1)',
                    transform: `translate(${glowX - 20}px, ${glowY - 20}px)`,
                    transition: 'transform 0.08s ease-out',
                    opacity: isHovering ? 1 : 0
                }}
            />

            {/* Moving Highlight Dot */}
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 3,
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'rgba(88, 166, 255, 1)',
                    boxShadow: '0 0 15px rgba(88, 166, 255, 1), 0 0 30px rgba(88, 166, 255, 0.6)',
                    transform: `translate(${glowX - 3}px, ${glowY - 3}px)`,
                    transition: 'transform 0.05s ease-out',
                    opacity: isHovering ? 1 : 0
                }}
            />
        </>
    );
};

export default GlobalGrid;
