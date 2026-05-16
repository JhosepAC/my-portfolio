import { useState, useMemo, useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { PROJECTS_DATA } from '../../data/projectsData.jsx';
import SectionOrbs from '../common/orbs/SectionOrbs';
import './ProjectsSection.css';
import { useTranslation } from 'react-i18next';

const ProjectsSection = () => {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const translatedProjects = useMemo(() => {
        return PROJECTS_DATA.map(project => ({
            ...project,
            description: t(`projects.items.${project.labelTranslate}.description`),
            statusText: t(`projects.items.${project.labelTranslate}.status`)
        }));
    }, [t]);

    const categories = useMemo(() => {
        const catSet = new Set(PROJECTS_DATA.map(p => p.category));
        return ['all', ...Array.from(catSet)];
    }, []);

    const techOptions = useMemo(() => {
        const techSet = new Set();
        PROJECTS_DATA.forEach(p => p.technologies.forEach(t => techSet.add(t.name)));
        return Array.from(techSet);
    }, []);

    const isTechActive = !categories.includes(activeFilter) && activeFilter !== 'all';

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') return translatedProjects;
        if (categories.includes(activeFilter)) {
            return translatedProjects.filter(p => p.category === activeFilter);
        }
        return translatedProjects.filter(p =>
            p.technologies.some(t => t.name === activeFilter)
        );
    }, [activeFilter, translatedProjects, categories]);

    const handleCategoryClick = (cat) => {
        setActiveFilter(cat);
        setIsDropdownOpen(false);
    };

    const handleTechSelect = (tech) => {
        setActiveFilter(tech);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <section id="projects" className="projects-section">
            <SectionOrbs sectionId="projects" />
            <div className="projects-container">
                <header className="projects-header">
                    <div className="header-decorator">
                        <div className="decorator-line" />
                        <span className="decorator-dot" />
                    </div>
                    <div className="header-content">
                        <h2 className="section-title">{t('projects.title')}</h2>
                        <p className="section-subtitle">{t('projects.subtitle')}</p>
                    </div>
                </header>

                <div className="filter-bar" role="group" aria-label="Filter projects">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(cat)}
                            aria-pressed={activeFilter === cat}
                        >
                            {cat === 'all' ? t('projects.allFilter') : t(`projects.filterCat.${cat}`)}
                        </button>
                    ))}

                    <div className="filter-dropdown" ref={dropdownRef}>
                        <button
                            className={`filter-btn dropdown-toggle ${isTechActive ? 'active' : ''}`}
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                            aria-haspopup="true"
                            aria-expanded={isDropdownOpen}
                        >
                            {isTechActive ? activeFilter : t('projects.techFilter')}
                            <svg className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="dropdown-menu" role="menu">
                                {techOptions.map(tech => (
                                    <button
                                        key={tech}
                                        className={`dropdown-item ${activeFilter === tech ? 'active' : ''}`}
                                        onClick={() => handleTechSelect(tech)}
                                        role="menuitem"
                                    >
                                        {tech}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="projects-grid" role="list">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}

                    <article className="project-card placeholder" role="listitem">
                        <div className="placeholder-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                <path d="M2 17l10 5 10-5"/>
                                <path d="M2 12l10 5 10-5"/>
                            </svg>
                        </div>
                        <h3 className="placeholder-title">{t('projects.placeholder.title')}</h3>
                        <p className="placeholder-text">{t('projects.placeholder.text')}</p>
                        <span className="placeholder-badge">{t('projects.placeholder.badge')}</span>
                    </article>
                </div>

                {filteredProjects.length === 0 && (
                    <div className="no-results">
                        <p>{t('projects.noResults')}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsSection;
