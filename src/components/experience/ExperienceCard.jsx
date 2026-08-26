import {memo, useCallback, useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {useTranslation} from 'react-i18next';
import {EXPERIENCE_ICONS, TIMELINE_ICONS} from '../../utils/Icons';
import useIsMobile from '../../hooks/useIsMobile';
import {EASE} from '../../utils/motionVariants';
import './ExperienceCard.css';

const typeBadgeClass = {
    fulltime: 'type-fulltime',
    freelance: 'type-freelance',
    internship: 'type-internship',
    parttime: 'type-parttime'
};

const ExperienceCard = ({item, index, isExpanded, onToggle}) => {
    const {t} = useTranslation();
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const isMobile = useIsMobile();

    const mainIcon = item.logo
        ? <img src={item.logo} alt={item.company} className="experience-icon-img" loading="lazy" />
        : (EXPERIENCE_ICONS[item.iconType.toUpperCase()] || EXPERIENCE_ICONS.WORK);

    const handleToggle = useCallback((e) => {
        if (e) e.stopPropagation();
        setHasInteracted(true);
        setShowHint(false);
        onToggle(item.id);
    }, [item.id, onToggle]);

    const handleCardClick = (e) => {
        const target = e.target;
        if (target.closest && target.closest('a, button, [role="button"]')) {
            if (target.closest('.experience-expand-btn')) return;
            if (target.closest('.tech-tag')) return;
        }
        handleToggle(e);
    };

    useEffect(() => {
        if (!isMobile || isExpanded || hasInteracted) {
            setShowHint(false);
            return;
        }
        const timer = setTimeout(() => setShowHint(true), 2000);
        return () => clearTimeout(timer);
    }, [isMobile, isExpanded, hasInteracted]);

    useEffect(() => {
        if (showHint) {
            const hide = setTimeout(() => setShowHint(false), 4500);
            return () => clearTimeout(hide);
        }
    }, [showHint]);

    const description = t(`experience.items.${item.id}.description`);
    const achievements = t(`experience.items.${item.id}.achievements`, {returnObjects: true});

    return (
        <motion.div
            className={`experience-item ${isExpanded ? 'expanded' : ''}`}
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.15}}
            transition={{duration: 0.5, ease: EASE, delay: index * 0.12}}
        >
            <div className="experience-card" onClick={handleCardClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(e); } }} aria-expanded={isExpanded}>
                <AnimatePresence>
                    {showHint && !isExpanded && isMobile && (
                        <motion.div
                            className="expand-hint"
                            initial={{ opacity: 0, y: 6, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.96 }}
                            transition={{ duration: 0.28, ease: EASE }}
                        >
                            <span className="hint-icon" aria-hidden="true">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 5v14M5 12h14" />
                                    <circle cx="12" cy="12" r="9" opacity="0.15" />
                                </svg>
                            </span>
                            <span className="hint-text">Toca para expandir</span>
                            <span className="hint-chevron">{TIMELINE_ICONS.CHEVRON}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="experience-card-header">
                    <div className={`experience-icon ${item.logo ? 'has-logo' : ''}`}>
                        {mainIcon}
                    </div>

                    <div className="experience-info">
                        <div className="experience-top">
                            <h3 className="experience-role">{item.role}</h3>
                            <div className="experience-badges">
                                {!item.endDate && (
                                    <span className="experience-current-badge">
                                        <span className="current-dot" />
                                        {t('experience.current')}
                                    </span>
                                )}
                                <span className={`experience-type-badge ${typeBadgeClass[item.type] || ''}`}>
                                    {t(`experience.type.${item.type}`)}
                                </span>
                            </div>
                        </div>

                        <div className="experience-company">
                            <span className="company-name">{item.company}</span>
                            {item.location && (
                                <>
                                    <span className="company-separator">•</span>
                                    <span className="company-location">
                                        {TIMELINE_ICONS.LOCATION} {item.location}
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="experience-dates">
                            {TIMELINE_ICONS.DATE} {item.startDate} {item.endDate ? `- ${item.endDate}` : `- ${t('experience.current')}`}
                        </div>
                    </div>

                    <button
                        className="experience-expand-btn"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        onClick={handleToggle}
                    >
                        {TIMELINE_ICONS.CHEVRON}
                    </button>
                </div>

                <div className="experience-card-body">
                    <div className="experience-body-wrapper">
                        <div className="experience-body-content">
                            <p className="experience-description">{description}</p>

                            {achievements && achievements.length > 0 && (
                                <div className="experience-achievements">
                                    <ul className="achievements-list">
                                        {achievements.map((achievement, idx) => (
                                            <li key={idx} className="achievement-item">{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {item.technologies && item.technologies.length > 0 && (
                                <div className="experience-tech">
                                    <span className="tech-label">{t('experience.technologies')}:</span>
                                    <div className="tech-list">
                                        {item.technologies.map((tech, idx) => (
                                            <span key={idx} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default memo(ExperienceCard);
