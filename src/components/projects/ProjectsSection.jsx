import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import ProjectsArchive from './ProjectsArchive';
import { PROJECTS_DATA } from '../../data/projectsData.jsx';
import SectionHeader from '../common/section-header/SectionHeader';
import './ProjectsSection.css';

// Flip `featured` on a project to change the home selection. The catalog never does.
const FEATURED_PROJECTS = PROJECTS_DATA.filter(project => project.featured).slice(0, 5);

export default function ProjectsSection() {
    const { t } = useTranslation();

    return <section id="projects" className="projects-section">
        <div className="projects-container">
            <SectionHeader align="left" title={t('projects.title')} subtitle={t('projects.subtitle')} />
            <div className="projects-grid" role="list">
                {FEATURED_PROJECTS.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
            </div>
            <ProjectsArchive projects={PROJECTS_DATA} />
        </div>
    </section>;
}
