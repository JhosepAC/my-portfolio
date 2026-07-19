import {memo, useMemo, useState, useEffect, useRef, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import TimelineItem from './TimelineItem';
import {EDUCATION_DATA} from "../../utils/constants.js";
import {EDUCATION_ICONS} from "../../utils/Icons.jsx";
import SectionOrbs from '../common/orbs/SectionOrbs';
import SectionHeader from '../common/section-header/SectionHeader';
import './EducationSection.css';

const EducationSection = () => {
    const {t} = useTranslation();
    const [expandedId, setExpandedId] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const educationItems = useMemo(() => EDUCATION_DATA.map(item => {
        const translatedSkills = t(`education.items.${item.id}.skills`, {returnObjects: true});

        return {
            ...item,
            description: t(`education.items.${item.id}.description`),
            skills: Array.isArray(translatedSkills) ? translatedSkills : []
        };
    }), [t]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleToggle = useCallback((id) => {
        setExpandedId(prev => prev === id ? null : id);
    }, []);

    return (
        <section
            id="education"
            ref={sectionRef}
            className={`education-section ${isVisible ? 'education-section--visible' : ''}`}
        >
            <SectionOrbs sectionId="education" />
            <div className="education-container">
                <SectionHeader
                    align="center"
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
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(EducationSection);
