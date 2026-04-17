import { useState, useEffect, useRef } from 'react';

const SplineVisual = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || navigator.hardwareConcurrency < 4);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) {
            setShouldLoad(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }

        return () => observer.disconnect();
    }, [isMobile]);

    useEffect(() => {
        if (!shouldLoad) return;

        if (isMobile) {
            setIsLoaded(true);
            return;
        }

        const timer = setTimeout(() => {
            const existingScript = document.querySelector('script[src*="spline-viewer"]');
            
            if (existingScript) {
                setIsLoaded(true);
                return;
            }

            const script = document.createElement('script');
            script.type = 'module';
            script.src = 'https://unpkg.com/@splinetool/viewer@1.12.32/build/spline-viewer.js';
            script.async = true;

            script.onload = () => setIsLoaded(true);
            script.onerror = () => setIsLoaded(true);
            document.head.appendChild(script);
        }, 500);

        return () => clearTimeout(timer);
    }, [shouldLoad, isMobile]);

    if (isMobile) {
        return (
            <div className="spline-wrapper" style={{ 
                minHeight: '500px', 
                width: '100%',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, transparent 70%)',
                    animation: 'float-orb-1 6s ease-in-out infinite'
                }} />
                <div style={{
                    position: 'absolute',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%)',
                    animation: 'float-orb-2 8s ease-in-out infinite'
                }} />
                <div style={{
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '14px',
                    zIndex: 1
                }}>
                    <div style={{ 
                        fontSize: '48px', 
                        marginBottom: '16px',
                        opacity: 0.8
                    }}>⚡</div>
                    <div>3D Interactive</div>
                </div>
            </div>
        );
    }

    return (
        <div ref={wrapperRef} className="spline-wrapper" style={{ minHeight: '500px', width: '100%' }}>
            {!isLoaded ? (
                <div className="visual-placeholder" style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(255,255,255,0.1)',
                        borderTop: '3px solid #4ade80',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                </div>
            ) : (
                <spline-viewer
                    url="https://prod.spline.design/SAQVcca2kphKx7kb/scene.splinecode"
                    events-target="global"
                    interactivity="none"
                    loading-anim-type="spinner-small-dark"
                />
            )}
        </div>
    );
};

export default SplineVisual;