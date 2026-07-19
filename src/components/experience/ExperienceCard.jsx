import {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {EXPERIENCE_ICONS, TIMELINE_ICONS} from '../../utils/Icons';
import './ExperienceCard.css';

const typeBadgeClass = {
    fulltime: 'type-fulltime',
    freelance: 'type-freelance',
    internship: 'type-internship',
    parttime: 'type-parttime'
};

const ExperienceCard = ({item, index, isExpanded, onToggle, isVisible}) => {
    const {t} = useTranslation();

    const mainIcon = EXPERIENCE_ICONS[item.iconType.toUpperCase()] || EXPERIENCE_ICONS.WORK;

    const handleToggle = useCallback((e) => {
        e.stopPropagation();
        onToggle(item.id);
    }, [item.id, onToggle]);

    const description = t(`experience.items.${item.id}.description`);
    const achievements = t(`experience.items.${item.id}.achievements`, {returnObjects: true});

    return (
        <div
            className={`experience-item ${isExpanded ? 'expanded' : ''} ${isVisible ? 'animate' : ''}`}
            style={{'--item-color': item.color, '--animation-delay': `${index * 0.15}s`}}
        >
            <div className="experience-card">
                <div className="experience-card-header">
                    <div className="experience-icon">
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
                            <span className="company-name" style={{color: item.color}}>{item.company}</span>
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
        </div>
    );
};

export default memo(ExperienceCard);
