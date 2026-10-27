import { useTranslation } from 'react-i18next';
import ProjectActions from './ProjectActions';
import ProjectStatus from './ProjectStatus';
import { isExternalProjectUrl } from '../../utils/projectUrls';

export default function ProjectHero({ project, content }) {
    const { t } = useTranslation();
    return (
        <header className="case-hero">
            <h1 data-page-title>{project.name}</h1>
            <p className="case-summary">{content.summary}</p>
            <div className="case-context">
                <span>{t(`caseStudy.types.${project.metadata.type}`)}</span>
                <ProjectStatus status={project.statusKey} text={t(`caseStudy.status.${project.statusKey}`)} />
            </div>
            <ProjectActions github={project.github} live={project.live} projectTitle={project.name} />
            {project.category === 'desktop' && !isExternalProjectUrl(project.live) && <p className="case-resource-note">{t('caseStudy.noLive')}</p>}
        </header>
    );
}
