import {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {EDUCATION_ICONS, TIMELINE_ICONS} from '../../utils/Icons';
import StatusBadge from './StatusBadge';
import './TimelineItem.css';

const TimelineItem = ({item, index}) => {
    const {t} = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    const mainIcon = EDUCATION_ICONS[item.iconType.toUpperCase()] || EDUCATION_ICONS.COURSE;

    const toggleExpand = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (<div
        className={`timeline-item ${item.type === 'university' ? 'timeline-item-important' : ''} ${isExpanded ? 'expanded' : ''}`}
        style={{
            '--item-color': item.color, animationDelay: `${index * 0.15}s`
        }}
    >
        <div className="timeline-year"><span>{item.year}</span></div>

        <div className="timeline-dot">
            <div className="dot-inner"></div>
            <div className="dot-pulse"></div>
        </div>

        <div className="timeline-card">
            <div className="card-header">
                <div className="card-icon">{mainIcon}</div>

                <div className="card-info">
                    <div className="card-top">
                        <h3 className="card-title">{item.title}</h3>
                        <StatusBadge status={item.status}/>
                    </div>

                    <div className="card-institution">
                        <span className="institution-name">{item.institution}</span>
                        {item.location && (<>
                            <span className="institution-separator">•</span>
                            <span className="institution-location">
                                        {TIMELINE_ICONS.LOCATION} {item.location}
                                    </span>
                        </>)}
                    </div>

                    <div className="card-meta">
                            <span className="card-date">
                                {TIMELINE_ICONS.DATE} {item.date} {item.endDate && `- ${item.endDate}`}
                            </span>
                    </div>
                </div>

                <button
                    className="expand-button"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    onClick={toggleExpand}
                >
                    {TIMELINE_ICONS.CHEVRON}
                </button>
            </div>

            <div className="card-expanded">
                <div className="expanded-content">
                    <p className="expanded-description">{item.description}</p>

                    <div className="expanded-skills">
                        <span className="skills-label">{t('education.skills')}:</span>
                        <div className="skills-list">
                            {item.skills.map((skill, idx) => (<span key={idx} className="skill-tag">{skill}</span>))}
                        </div>
                    </div>

                    {item.certificate && (<a
                        href={item.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="certificate-button"
                    >
                        {TIMELINE_ICONS.CERT_FILE}
                        <span>{t('education.viewCertificate')}</span>
                    </a>)}
                </div>
            </div>
        </div>
    </div>);
};

export default memo(TimelineItem);