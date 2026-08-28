import React, {useState, useMemo} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {useTranslation} from 'react-i18next';
import {SKILLS_DATA} from '../../utils/constants.js';
import SkillCard from './SkillCard';
import FilterButton from './FilterButton';
import SectionHeader from '../common/section-header/SectionHeader';
import {EASE} from '../../utils/motionVariants';
import './SkillsSection.css';

const INITIAL_VISIBLE = 16;

const SkillsSection = () => {
    const {t} = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');
    const [showAll, setShowAll] = useState(false);

    const filters = useMemo(() => [
        {id: 'all', label: t('skills.filters.all')},
        {id: 'languages', label: t('skills.filters.languages')},
        {id: 'frameworks', label: t('skills.filters.frameworks')},
        {id: 'databases', label: t('skills.filters.databases')},
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

        // En "todos" excluir 'others' y 'softskills' y ordenar: frameworks → lenguajes → base de datos → herramientas
        const orderedKeys = ['frameworks', 'languages', 'databases', 'tools'];
        const allSkillsForAll = orderedKeys.flatMap((key) => allData[key] || []);

        const currentSet = activeFilter === 'all'
            ? allSkillsForAll
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
                <SectionHeader
                    align="left"
                    kicker="/skills — 01"
                    title={t('skills.title')}
                    subtitle={t('skills.subtitle')}
                />

                <motion.nav
                    className="filters-container"
                    aria-label="Skills filtering"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.4}}
                    transition={{duration: 0.5, ease: EASE}}
                >
                    {filters.map((filter) => (
                        <FilterButton
                            key={filter.id}
                            label={filter.label}
                            isActive={activeFilter === filter.id}
                            onClick={() => handleFilterChange(filter.id)}
                        />
                    ))}
                </motion.nav>

                <motion.div layout className="skills-grid" transition={{type: 'spring', stiffness: 220, damping: 30}}>
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill, index) => (
                            <SkillCard
                                key={skill.id || skill.name}
                                skill={skill}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {activeFilter === 'all' && filteredSkills.length >= INITIAL_VISIBLE && (
                    <motion.div
                        className="skills-show-more"
                        initial={{opacity: 0, y: 16}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.4}}
                        transition={{duration: 0.5, ease: EASE}}
                    >
                        <motion.button
                            className="skills-show-more-btn"
                            onClick={() => setShowAll(!showAll)}
                            whileHover={{x: -2, y: -2}}
                            whileTap={{scale: 0.95}}
                        >
                            {showAll ? t('skills.showLess') : t('skills.showMore')}
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default SkillsSection;