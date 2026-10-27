import { useImperativeHandle, useRef } from 'react';
import { useInView, useIsPresent, useReducedMotion } from 'motion/react';
import { EASE, MOTION } from '../utils/motionVariants';

// Explicit presence state restores an item interrupted halfway through its exit.
export default function useListEntrance(forwardedRef, index = 0, distance = 12) {
    const localRef = useRef(null);
    const inView = useInView(localRef, { once: true, amount: 0.15 });
    const present = useIsPresent();
    const reduced = useReducedMotion();
    useImperativeHandle(forwardedRef, () => localRef.current);
    return {
        ref: localRef,
        initial: reduced ? false : { opacity: 0, y: distance },
        animate: reduced || (inView && present) ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
        transition: { duration: reduced ? 0 : MOTION.enter, ease: EASE, delay: reduced ? 0 : Math.min(index, 3) * 0.045 },
    };
}
