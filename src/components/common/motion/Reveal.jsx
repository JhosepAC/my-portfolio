import React from 'react';
import {motion} from 'motion/react';
import {EASE} from '../../../utils/motionVariants';

const Reveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    distance = 24,
    once = true,
    amount = 0.2,
    className,
    style,
}) => {
    const offsets = {
        up: {y: distance},
        down: {y: -distance},
        left: {x: distance},
        right: {x: -distance},
        scale: {scale: 0.9},
        none: {},
    };

    return (
        <motion.div
            className={className}
            style={style}
            initial={{opacity: 0, x: 0, y: 0, scale: 1, ...offsets[direction]}}
            whileInView={{opacity: 1, x: 0, y: 0, scale: 1}}
            viewport={{once, amount}}
            transition={{duration, ease: EASE, delay}}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;
