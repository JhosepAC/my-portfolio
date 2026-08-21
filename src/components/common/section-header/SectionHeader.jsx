import { motion } from 'motion/react';
import { EASE } from '../../../utils/motionVariants';
import './SectionHeader.css';

const STEP = 0.12;

const SectionHeader = ({title, titleHighlight, subtitle, align = 'center', badge, stacked, highlightFirst, kicker}) => {
    const classes = [
        'section-header',
        `section-header--${align}`,
        stacked && 'section-header--stacked',
        highlightFirst && 'section-header--highlight-first'
    ].filter(Boolean).join(' ');

    const viewport = {once: true, amount: 0.4};

    return (
        <header className={classes}>
            {kicker && (
                <motion.span
                    className="section-kicker"
                    initial={{opacity: 0, y: 12}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={viewport}
                    transition={{duration: 0.5, ease: EASE}}
                >
                    {kicker}
                </motion.span>
            )}
            {badge && (
                <motion.div
                    className="section-badge"
                    initial={{opacity: 0, y: 18}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={viewport}
                    transition={{duration: 0.5, ease: EASE}}
                >
                    {badge.icon}
                    <span className="section-badge-text">{badge.text}</span>
                </motion.div>
            )}
            <motion.h2
                className="section-title"
                initial={{opacity: 0, y: 22}}
                whileInView={{opacity: 1, y: 0}}
                viewport={viewport}
                transition={{duration: 0.5, ease: EASE, delay: badge ? STEP : 0}}
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
                    initial={{opacity: 0, y: 18}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={viewport}
                    transition={{duration: 0.5, ease: EASE, delay: (badge ? STEP : 0) + STEP}}
                >
                    {subtitle}
                </motion.p>
            )}
        </header>
    );
};

export default SectionHeader;