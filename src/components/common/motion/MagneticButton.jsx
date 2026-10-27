import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import useMediaQuery from '../../../hooks/useMediaQuery';

export default function MagneticButton({ children, strength = 0.3, className, style, ...props }) {
    const bounds = useRef(null);
    const pointer = useMediaQuery('(hover: hover) and (pointer: fine)');
    const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
    const enabled = pointer && !reduced;
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 300, damping: 26, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 300, damping: 26, mass: 0.4 });
    const reset = () => { x.set(0); y.set(0); };
    useEffect(() => { if (!enabled) { x.jump(0); y.jump(0); } }, [enabled, x, y]);
    return <motion.div className={className}
        style={{ x: enabled ? sx : 0, y: enabled ? sy : 0, display: 'inline-flex', ...style }}
        onPointerEnter={event => { if (enabled && event.pointerType !== 'touch') bounds.current = event.currentTarget.getBoundingClientRect(); }}
        onPointerMove={event => {
            if (!enabled || event.pointerType === 'touch' || !bounds.current) return;
            const rect = bounds.current;
            x.set(Math.max(-8, Math.min(8, (event.clientX - rect.left - rect.width / 2) * strength)));
            y.set(Math.max(-6, Math.min(6, (event.clientY - rect.top - rect.height / 2) * strength)));
        }}
        onPointerLeave={reset} onPointerCancel={reset} onFocusCapture={reset}
        whileTap={enabled ? { scale: 0.98 } : undefined} {...props}>{children}</motion.div>;
}
