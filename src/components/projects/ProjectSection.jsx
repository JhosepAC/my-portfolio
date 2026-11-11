import { m, useReducedMotion } from 'motion/react';
import { reveal } from '../../utils/motionVariants';
export default function ProjectSection({ id, title, children, className = '' }) {
    const reduced = useReducedMotion();
    return <m.section {...reveal(reduced, { distance: 12 })} id={id} className={`case-section ${className}`} aria-labelledby={`${id}-title`}>
        <h2 id={`${id}-title`}>{title}</h2>
        {children}
    </m.section>;
}
