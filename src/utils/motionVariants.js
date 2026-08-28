export const EASE = [0.4, 0, 0.2, 1];

export const EASE_SPRING = {type: 'spring', stiffness: 400, damping: 30};

export const VIEWPORT_ONCE = {once: true, amount: 0.2};

export const fadeUp = {
    hidden: {opacity: 0, y: 24},
    visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: EASE}},
};

export const fadeDown = {
    hidden: {opacity: 0, y: -24},
    visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: EASE}},
};

export const fadeLeft = {
    hidden: {opacity: 0, x: -24},
    visible: {opacity: 1, x: 0, transition: {duration: 0.6, ease: EASE}},
};

export const fadeRight = {
    hidden: {opacity: 0, x: 24},
    visible: {opacity: 1, x: 0, transition: {duration: 0.6, ease: EASE}},
};

export const fadeScale = {
    hidden: {opacity: 0, scale: 0.9},
    visible: {opacity: 1, scale: 1, transition: {duration: 0.5, ease: EASE}},
};

export const staggerContainer = {
    hidden: {},
    visible: {transition: {staggerChildren: 0.08, delayChildren: 0.1}},
};
