import React, {useRef} from 'react';
import {motion, useMotionValue, useSpring, useReducedMotion} from 'motion/react';

const MagneticButton = ({children, strength = 0.3, className, style, ...props}) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, {stiffness: 150, damping: 15, mass: 0.1});
    const sy = useSpring(y, {stiffness: 150, damping: 15, mass: 0.1});
    const reduceMotion = useReducedMotion();

    const handleMouseMove = (e) => {
        if (reduceMotion || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{x: sx, y: sy, display: 'inline-flex', ...style}}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            whileTap={{scale: 0.96}}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;