import { motion, useReducedMotion } from 'motion/react';
import { reveal } from '../../../utils/motionVariants';
import './SectionHeader.css';

const STEP = 0.055;

const SectionHeader = ({title, titleHighlight, subtitle, align = 'center', badge, stacked, highlightFirst, kicker}) => {
    const reduced = useReducedMotion();
    const classes = [
        'section-header',
        `section-header--${align}`,
        stacked && 'section-header--stacked',
        highlightFirst && 'section-header--highlight-first'
    ].filter(Boolean).join(' ');


    return (
        <header className={classes}>
            {kicker && (
                <motion.span
                    className="section-kicker"
                    {...reveal(reduced, { distance: 12 })}
                >
                    {kicker}
                </motion.span>
            )}
            {badge && (
                <motion.div
                    className="section-badge"
                    {...reveal(reduced, { distance: 12 })}
                >
                    {badge.icon}
                    <span className="section-badge-text">{badge.text}</span>
                </motion.div>
            )}
            <motion.h2
                className="section-title"
                {...reveal(reduced, { distance: 12, delay: badge ? STEP : 0 })}
            >
                {highlightFirst ? (
                    <>
                        <span className="section-title-gradient">{titleHighlight}</span>
                        <span className="section-title-main"> {title}</span>
                    </>
                ) : (
                    <>
                        <span className="section-title-main">{title} </span>
                        {titleHighlight && (
                            <span className="section-title-gradient">{titleHighlight}</span>
                        )}
                    </>
                )}
            </motion.h2>
            {subtitle && (
                <motion.p
                    className="section-subtitle"
                    {...reveal(reduced, { distance: 12, delay: (badge ? STEP : 0) + STEP })}
                >
                    {subtitle}
                </motion.p>
            )}
        </header>
    );
};

export default SectionHeader;
