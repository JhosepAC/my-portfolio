import { m, useReducedMotion } from 'motion/react';
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
                <m.span
                    className="section-kicker"
                    {...reveal(reduced, { distance: 12 })}
                >
                    {kicker}
                </m.span>
            )}
            {badge && (
                <m.div
                    className="section-badge"
                    {...reveal(reduced, { distance: 12 })}
                >
                    {badge.icon}
                    <span className="section-badge-text">{badge.text}</span>
                </m.div>
            )}
            <m.h2
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
            </m.h2>
            {subtitle && (
                <m.p
                    className="section-subtitle"
                    {...reveal(reduced, { distance: 12, delay: (badge ? STEP : 0) + STEP })}
                >
                    {subtitle}
                </m.p>
            )}
        </header>
    );
};

export default SectionHeader;
