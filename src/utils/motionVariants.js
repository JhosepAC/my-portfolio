export const EASE = [0.22, 1, 0.36, 1];
export const EASE_SPRING = { type: 'spring', stiffness: 380, damping: 32, mass: 0.7 };
export const VIEWPORT_ONCE = { once: true, amount: 0.15 };
export const MOTION = { enter: 0.34, exit: 0.16, feedback: 0.15, stagger: 0.055 };

// Bounded staggering keeps long lists responsive, including after filtering.
export function reveal(reduced, { axis = 'y', distance = 16, delay = 0, amount = 0.15 } = {}) {
    return {
        initial: reduced ? false : { opacity: 0, [axis]: distance },
        whileInView: { opacity: 1, [axis]: 0 },
        viewport: { once: true, amount },
        transition: { duration: reduced ? 0 : MOTION.enter, ease: EASE, delay: reduced ? 0 : Math.min(delay, 0.18) },
    };
}
const directional = (axis, distance) => ({
    hidden: { opacity: 0, [axis]: distance },
    visible: { opacity: 1, [axis]: 0, transition: { duration: MOTION.enter, ease: EASE } },
});
export const fadeUp = directional('y', 16);
export const fadeDown = directional('y', -16);
export const fadeLeft = directional('x', -16);
export const fadeRight = directional('x', 16);
export const fadeScale = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: MOTION.enter, ease: EASE } },
};
export const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: MOTION.stagger } },
};
