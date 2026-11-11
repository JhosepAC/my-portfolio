import React, {useState, useMemo, useRef, useLayoutEffect} from 'react';
import {AnimatePresence, m, useReducedMotion} from 'motion/react';
import {useTranslation} from 'react-i18next';
import {SKILLS_DATA} from '../../utils/constants.js';
import SkillCard from './SkillCard';
import FilterButton from './FilterButton';
import SectionHeader from '../common/section-header/SectionHeader';
import {EASE} from '../../utils/motionVariants';
import './SkillsSection.css';

const INITIAL_VISIBLE = 16;

// Swap a category as one surface instead of moving individual cards across it.
function SkillResults({skills, onHeight, reduced}) {
    const gridRef = useRef(null);

    useLayoutEffect(() => {
        const grid = gridRef.current;
        const measure = () => onHeight(grid.offsetHeight);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(grid);
        return () => observer.disconnect();
    }, [onHeight]);

    return <m.div className="skills-grid" ref={gridRef}
        initial={reduced ? false : {opacity: 0, y: 6}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: reduced ? 0 : -4, transition: {duration: reduced ? 0 : 0.1, ease: 'easeIn'}}}
        transition={{duration: reduced ? 0 : 0.22, ease: EASE}}>
        {skills.map(skill => <SkillCard key={skill.id || skill.name} skill={skill} />)}
    </m.div>;
}

const SkillsSection = () => {
    const {t} = useTranslation();
    const reduceMotion = useReducedMotion();
    const [activeFilter, setActiveFilter] = useState('all');
    const [showAll, setShowAll] = useState(false);
    const [gridHeight, setGridHeight] = useState(null);

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

                <m.nav
                    className="filters-container"
                    aria-label="Skills filtering"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.4}}
                    transition={{duration: reduceMotion ? 0 : 0.3, ease: EASE}}
                >
                    {filters.map((filter) => (
                        <FilterButton
                            key={filter.id}
                            label={filter.label}
                            isActive={activeFilter === filter.id}
                            onClick={() => handleFilterChange(filter.id)}
                        />
                    ))}
                </m.nav>

                <m.div className="skills-grid-frame" initial={false}
                    animate={{height: gridHeight ?? 'auto'}}
                    transition={{duration: reduceMotion ? 0 : 0.22, ease: EASE}}>
                    <AnimatePresence initial={false} mode={reduceMotion ? 'sync' : 'wait'}>
                        <SkillResults key={`${activeFilter}:${showAll}`} skills={filteredSkills}
                            onHeight={setGridHeight} reduced={reduceMotion} />
                    </AnimatePresence>
                </m.div>

                {activeFilter === 'all' && filteredSkills.length >= INITIAL_VISIBLE && (
                    <m.div
                        className="skills-show-more"
                        initial={{opacity: 0, y: 16}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.4}}
                        transition={{duration: reduceMotion ? 0 : 0.3, ease: EASE}}
                    >
                        <m.button
                            className="skills-show-more-btn"
                            onClick={() => setShowAll(!showAll)}
                            whileHover={reduceMotion ? undefined : {y: -2}}
                            whileTap={reduceMotion ? undefined : {scale: 0.98}}
                        >
                            {showAll ? t('skills.showLess') : t('skills.showMore')}
                        </m.button>
                    </m.div>
                )}
            </div>
        </section>
    );
};

export default SkillsSection;
