import React, {useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {SKILLS_DATA} from '../../utils/constants.js';
import SkillCard from './SkillCard';
import FilterButton from './FilterButton';
import './SkillsSection.css';

const INITIAL_VISIBLE = 16;

const SkillsSection = () => {
    const {t} = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');
    const [showAll, setShowAll] = useState(false);

    const filters = useMemo(() => [
        {id: 'all', label: t('skills.filters.all')},
        {id: 'languages', label: t('skills.filters.languages')},
        {id: 'databases', label: t('skills.filters.databases')},
        {id: 'frameworks', label: t('skills.filters.frameworks')},
        {id: 'tools', label: t('skills.filters.tools')},
        {id: 'others', label: t('skills.filters.others')},
        {id: 'softskills', label: t('skills.filters.softskills')},
    ], [t]);

    const filteredSkills = useMemo(() => {
        const softskills = SKILLS_DATA.softskills?.map(skill => ({
            ...skill,
            name: t(`skills.softskillsList.${skill.id}`)
        })) || [];

        const allData = {...SKILLS_DATA, softskills};
        const allSkills = Object.values(allData).flat();

        const currentSet = activeFilter === 'all'
            ? allSkills
            : allData[activeFilter] || [];

        return (activeFilter === 'all' && !showAll)
            ? currentSet.slice(0, INITIAL_VISIBLE)
            : currentSet;
    }, [activeFilter, showAll, t]);

    const handleFilterChange = (filterId) => {
        setActiveFilter(filterId);
        setShowAll(false);
    };

    return (
        <section id="skills" className="skills-section">
            <div className="skills-container">
                <header className="section-header">
                    <h2 className="section-title">
                        <span className="title-accent">{t('skills.title')}</span>
                    </h2>
                </header>

                <nav className="filters-container" aria-label="Skills filtering">
                    {filters.map((filter) => (
                        <FilterButton
                            key={filter.id}
                            label={filter.label}
                            isActive={activeFilter === filter.id}
                            onClick={() => handleFilterChange(filter.id)}
                        />
                    ))}
                </nav>

                <div className="skills-grid">
                    {filteredSkills.map((skill, index) => (
                        <SkillCard
                            key={`${activeFilter}-${skill.name}-${index}`}
                            skill={skill}
                            index={index}
                        />
                    ))}
                </div>

                {activeFilter === 'all' && filteredSkills.length >= INITIAL_VISIBLE && (
                    <div className="skills-show-more">
                        <button
                            className="skills-show-more-btn"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? t('skills.showLess') : t('skills.showMore')}
                        </button>
                    </div>
                )}
            </div>

            <div className="skills-bg-orb skills-bg-orb-1" aria-hidden="true"/>
            <div className="skills-bg-orb skills-bg-orb-2" aria-hidden="true"/>
        </section>
    );
};

export default SkillsSection;