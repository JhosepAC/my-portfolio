import {memo, useCallback, useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {useTranslation} from 'react-i18next';
import {EXPERIENCE_ICONS, TIMELINE_ICONS} from '../../utils/Icons';
import useIsMobile from '../../hooks/useIsMobile';
import {EASE} from '../../utils/motionVariants';
import './ExperienceCard.css';

const ExperienceCard = ({item, index, isExpanded, onToggle, hasOpenedAny}) => {
    const {t} = useTranslation();
    const [showHint, setShowHint] = useState(false);
    const isMobile = useIsMobile();

    const mainIcon = item.logo
        ? <img src={item.logo} alt={item.company} className="experience-icon-img" loading="lazy" />
        : (EXPERIENCE_ICONS[item.iconType.toUpperCase()] || EXPERIENCE_ICONS.WORK);

    const handleToggle = useCallback((e) => {
        if (e) e.stopPropagation();
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
        if (!isMobile || index !== 0 || isExpanded || hasOpenedAny) {
            setShowHint(false);
            return;
        }
        const interval = setInterval(() => {
            setShowHint(true);
            setTimeout(() => setShowHint(false), 1200);
        }, 2000);
        return () => clearInterval(interval);
    }, [isMobile, index, isExpanded, hasOpenedAny]);

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
                    {showHint && !isExpanded && isMobile && index === 0 && !hasOpenedAny && (
                        <motion.div
                            className="expand-hint expand-hint--touch"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            transition={{ duration: 0.22, ease: EASE }}
                        >
                            <span className="hint-touch-icon" aria-hidden="true">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 11V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7" />
                                    <path d="M9 11V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v5" />
                                    <path d="M15 11V7a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v5" />
                                    <path d="M5 13V9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-2" />
                                </svg>
                            </span>
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
                            {!item.endDate && (
                                <div className="experience-badges">
                                    <span className="experience-current-badge">
                                        <span className="current-dot" />
                                        {t('experience.current')}
                                    </span>
                                </div>
                            )}
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
                    </div>

                    <button
                        className="experience-expand-btn"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        aria-expanded={isExpanded}
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
