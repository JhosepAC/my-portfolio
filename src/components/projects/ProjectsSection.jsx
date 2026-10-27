import { useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import { PROJECTS_DATA } from '../../data/projectsData.jsx';
import SectionHeader from '../common/section-header/SectionHeader';
import './ProjectsSection.css';

const categories = ['all', ...new Set(PROJECTS_DATA.map(project => project.category))];
const technologies = [...new Set(PROJECTS_DATA.flatMap(project => project.technologies.map(tech => tech.name)))];

export default function ProjectsSection() {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');
    const isTechActive = !categories.includes(activeFilter);
    const filteredProjects = useMemo(() => PROJECTS_DATA.filter(project =>
        activeFilter === 'all' || project.category === activeFilter || project.technologies.some(tech => tech.name === activeFilter)
    ), [activeFilter]);

    return <section id="projects" className="projects-section">
        <div className="projects-container">
            <SectionHeader align="left" title={t('projects.title')} subtitle={t('projects.subtitle')} />
            <div className="project-catalog-tools">
                <div className="filter-bar" role="group" aria-label={t('caseStudy.filter')}>
                    {categories.map(category => <button key={category} className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                        onClick={() => setActiveFilter(category)} aria-pressed={activeFilter === category}>
                        {category === 'all' ? t('projects.allFilter') : t(`projects.filterCat.${category}`)}
                    </button>)}
                    <label className="project-tech-filter">
                        <span className="project-sr-only">{t('caseStudy.technology')}</span>
                        <select value={isTechActive ? activeFilter : ''} onChange={event => setActiveFilter(event.target.value || 'all')}>
                            <option value="">{t('projects.techFilter')}</option>
                            {technologies.map(tech => <option key={tech} value={tech}>{tech}</option>)}
                        </select>
                    </label>
                </div>
                <p className="project-count" role="status">{t('caseStudy.count', { count: filteredProjects.length })}</p>
            </div>
            <div className="projects-grid" role="list">
                <AnimatePresence mode="popLayout" initial={false}>
                    {filteredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
                </AnimatePresence>
            </div>
            {!filteredProjects.length && <div className="no-results"><p>{t('projects.noResults')}</p><button className="filter-btn" onClick={() => setActiveFilter('all')}>{t('caseStudy.reset')}</button></div>}
        </div>
    </section>;
}
