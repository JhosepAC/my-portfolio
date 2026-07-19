import {memo, useMemo, useState, useEffect, useRef, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import ExperienceCard from './ExperienceCard';
import {EXPERIENCE_DATA} from "../../utils/constants.js";
import SectionOrbs from '../common/orbs/SectionOrbs';
import SectionHeader from '../common/section-header/SectionHeader';
import './ExperienceSection.css';

const ExperienceSection = () => {
    const {t} = useTranslation();
    const [expandedId, setExpandedId] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const experienceItems = useMemo(() => EXPERIENCE_DATA.map(item => ({
        ...item,
        description: t(`experience.items.${item.id}.description`),
    })), [t]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {threshold: 0.1}
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleToggle = useCallback((id) => {
        setExpandedId(prev => prev === id ? null : id);
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className={`experience-section ${isVisible ? 'experience-section--visible' : ''}`}
        >
            <SectionOrbs sectionId="experience"/>
            <div className="experience-container">
                <SectionHeader
                    align="center"
                    title={t('experience.title')}
                    titleHighlight={t('experience.titleHighlight')}
                    subtitle={t('experience.subtitle')}
                />

                <div className="experience-list">
                    {experienceItems.map((item, index) => (
                        <ExperienceCard
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

export default memo(ExperienceSection);
