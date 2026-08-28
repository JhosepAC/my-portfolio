import {memo, useMemo, useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import TimelineItem from './TimelineItem';
import {EDUCATION_DATA} from "../../utils/constants.js";
import {EDUCATION_ICONS} from "../../utils/Icons.jsx";
import SectionHeader from '../common/section-header/SectionHeader';
import './EducationSection.css';

const EducationSection = () => {
    const {t} = useTranslation();
    const [expandedId, setExpandedId] = useState(null);
    const [hasOpenedAny, setHasOpenedAny] = useState(false);

    const educationItems = useMemo(() => EDUCATION_DATA.map(item => {
        const translatedSkills = t(`education.items.${item.id}.skills`, {returnObjects: true});

        return {
            ...item,
            description: t(`education.items.${item.id}.description`),
            skills: Array.isArray(translatedSkills) ? translatedSkills : []
        };
    }), [t]);

    const handleToggle = useCallback((id) => {
        setExpandedId(prev => {
            const next = prev === id ? null : id;
            if (next !== null) setHasOpenedAny(true);
            return next;
        });
    }, []);

    return (
        <section id="education" className="education-section">
            <div className="education-container">
                <SectionHeader
                    align="center"
                    kicker="/education — 03"
                    title={t('education.title')}
                    titleHighlight={t('education.titleHighlight')}
                    subtitle={t('education.subtitle')}
                    badge={{icon: EDUCATION_ICONS.BADGE, text: t('education.badge')}}
                    highlightFirst
                    stacked
                />

                <div className="education-timeline">
                    <div className="timeline-line"></div>
                    {educationItems.map((item, index) => (
                        <TimelineItem
                            key={item.id}
                            item={item}
                            index={index}
                            isExpanded={expandedId === item.id}
                            onToggle={handleToggle}
                            hasOpenedAny={hasOpenedAny}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(EducationSection);
