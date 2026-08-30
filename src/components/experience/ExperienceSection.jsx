import {memo, useMemo, useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import ExperienceCard from './ExperienceCard';
import {EXPERIENCE_DATA} from "../../utils/constants.js";
import SectionHeader from '../common/section-header/SectionHeader';
import './ExperienceSection.css';

const ExperienceSection = () => {
    const {t} = useTranslation();
    const [expandedId, setExpandedId] = useState(null);
    const [hasOpenedAny, setHasOpenedAny] = useState(false);

    const experienceItems = useMemo(() => EXPERIENCE_DATA.map(item => ({
        ...item,
        description: t(`experience.items.${item.id}.description`),
    })), [t]);

    const handleToggle = useCallback((id) => {
        setExpandedId(prev => {
            const next = prev === id ? null : id;
            if (next !== null) setHasOpenedAny(true);
            return next;
        });
    }, []);

    return (
        <section id="experience" className="experience-section">
            <div className="experience-container">
                <SectionHeader
                    align="center"
                    kicker="/experience — 04"
                    title={t('experience.title')}
                    titleHighlight={t('experience.titleHighlight')}
                    subtitle={t('experience.subtitle')}
                />

                <div className="experience-timeline">
                    <div className="experience-timeline-track" aria-hidden="true" />
                    {experienceItems.map((item, index) => {
                        const isExpanded = expandedId === item.id;
                        const isCurrent = !item.endDate;
                        return (
                            <div
                                key={item.id}
                                className={`experience-timeline-row ${isExpanded ? 'expanded' : ''} ${isCurrent ? 'is-current' : ''}`}
                            >
                                <div className="experience-timeline-rail">
                                    <div className="experience-timeline-date">
                                        <span className="timeline-date-range">
                                            {item.startDate}
                                            <span className="timeline-date-sep"> — </span>
                                            {item.endDate ? item.endDate : t('experience.current')}
                                        </span>
                                    </div>
                                    <div className="experience-timeline-node">
                                        <span className="experience-timeline-dot" />
                                        <span className="experience-timeline-dot-pulse" />
                                        <span className="experience-timeline-connector" aria-hidden="true" />
                                    </div>
                                </div>

                                <div className="experience-timeline-card-wrap">
                                    <ExperienceCard
                                        item={item}
                                        index={index}
                                        isExpanded={isExpanded}
                                        onToggle={handleToggle}
                                        hasOpenedAny={hasOpenedAny}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default memo(ExperienceSection);
