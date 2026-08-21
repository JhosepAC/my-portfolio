import {memo, useMemo, useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import ExperienceCard from './ExperienceCard';
import {EXPERIENCE_DATA} from "../../utils/constants.js";
import SectionHeader from '../common/section-header/SectionHeader';
import './ExperienceSection.css';

const ExperienceSection = () => {
    const {t} = useTranslation();
    const [expandedId, setExpandedId] = useState(null);

    const experienceItems = useMemo(() => EXPERIENCE_DATA.map(item => ({
        ...item,
        description: t(`experience.items.${item.id}.description`),
    })), [t]);

    const handleToggle = useCallback((id) => {
        setExpandedId(prev => prev === id ? null : id);
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

                <div className="experience-list">
                    {experienceItems.map((item, index) => (
                        <ExperienceCard
                            key={item.id}
                            item={item}
                            index={index}
                            isExpanded={expandedId === item.id}
                            onToggle={handleToggle}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(ExperienceSection);
