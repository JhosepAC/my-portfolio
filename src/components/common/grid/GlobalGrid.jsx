import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { useThemeContext } from '../../../context/ThemeContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Grainient from '../../Grainient';

export default function GlobalGrid() {
    const { theme } = useThemeContext();
    const isDark = theme === 'dark';
    const desktop = useMediaQuery('(min-width: 769px) and (hover: hover) and (pointer: fine)');
    const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const cursorOpacity = useMotionValue(0);
    const spring = { stiffness: 320, damping: 34, mass: 0.45 };
    const x = useSpring(pointerX, spring);
    const y = useSpring(pointerY, spring);
    const circleX = useTransform(x, value => value - 20);
    const circleY = useTransform(y, value => value - 20);
    const dotX = useTransform(x, value => value - 3);
    const dotY = useTransform(y, value => value - 3);
    const { scrollY } = useScroll();
    const gridX = useTransform(x, value => desktop && !reduced ? (value / window.innerWidth - 0.5) * 20 : 0);
    const gridY = useTransform([y, scrollY], ([pointer, scroll]) => desktop && !reduced ? ((pointer + scroll) / window.innerHeight - 0.5) * 20 : 0);

    useEffect(() => {
        if (!desktop || reduced) return;
        const move = event => {
            if (event.pointerType === 'touch') return;
            pointerX.set(event.clientX);
            pointerY.set(event.clientY);
            cursorOpacity.set(1);
        };
        const leave = () => cursorOpacity.set(0);
        const onVisibility = () => { if (document.hidden) leave(); };
        window.addEventListener('pointermove', move, { passive: true });
        document.documentElement.addEventListener('pointerleave', leave);
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            window.removeEventListener('pointermove', move);
            document.documentElement.removeEventListener('pointerleave', leave);
            document.removeEventListener('visibilitychange', onVisibility);
            cursorOpacity.set(0);
        };
    }, [desktop, reduced, pointerX, pointerY, cursorOpacity]);

    return <>
        {isDark ? <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
            <Grainient color1="#0a0a0b" color2="#0a0a0b" color3="#444444"
                timeSpeed={reduced ? 0 : 1.4} animate={!reduced} maxFps={desktop ? 30 : 24} pixelRatio={desktop ? 1.25 : 1}
                colorBalance={-0.01} warpStrength={2.2} warpFrequency={4.2} warpSpeed={2} warpAmplitude={50}
                blendAngle={0} blendSoftness={0.05} rotationAmount={500} noiseScale={2}
                grainAmount={0.1} grainScale={2} grainAnimated={false} contrast={1.5} gamma={1}
                saturation={1} centerX={0} centerY={0} zoom={0.9} />
        </div> : <motion.div aria-hidden="true" className="global-grid" style={{
            position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
            backgroundImage: 'linear-gradient(rgba(20,20,20,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(20,20,20,0.12) 1px,transparent 1px)',
            backgroundSize: '80px 80px', x: gridX, y: gridY,
        }} />}
        {desktop && !reduced && <>
            <motion.div aria-hidden="true" className="cursor-circle" style={{
                position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999, width: 40, height: 40,
                borderRadius: '50%', border: isDark ? '1px solid rgba(232,232,232,0.35)' : '1px solid rgba(20,20,20,0.6)',
                x: circleX, y: circleY, opacity: cursorOpacity,
            }} />
            <motion.div aria-hidden="true" className="cursor-dot" style={{
                position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999, width: 6, height: 6,
                borderRadius: '50%', background: isDark ? 'rgba(232,232,232,0.85)' : 'rgba(20,20,20,1)',
                x: dotX, y: dotY, opacity: cursorOpacity,
            }} />
        </>}
    </>;
}
