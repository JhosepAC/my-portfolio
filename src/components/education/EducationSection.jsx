import {memo, useMemo, useState, useEffect, useRef, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import TimelineItem from './TimelineItem';
import {EDUCATION_DATA} from "../../utils/constants.js";
import {EDUCATION_ICONS} from "../../utils/Icons.jsx";
import SectionOrbs from '../common/orbs/SectionOrbs';
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
                <div className="education-header">
                    <div className="education-badge">
                        {EDUCATION_ICONS.BADGE}
                        <span className="education-badge-text">{t('education.badge')}</span>
                    </div>

                    <h2 className="education-title">
                        <span className="education-title-main">{t('education.title')}</span>
                        <span className="education-title-gradient">{t('education.titleHighlight')}</span>
                    </h2>

                    <p className="education-subtitle">
                        {t('education.subtitle')}
                    </p>
                </div>

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
