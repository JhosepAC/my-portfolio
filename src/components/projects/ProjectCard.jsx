import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectStatus from './ProjectStatus';
import TechStack from './TechStack';
import ProjectActions from './ProjectActions';
import './ProjectCard.css';

const ProjectCard = ({ project, index }) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <article
            className={`project-card ${isExpanded ? 'expanded' : ''}`}
            role="listitem"
            style={{ '--card-index': index }}
        >
            <div className="card-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <ProjectStatus status={project.statusKey} text={project.statusText} />
            </div>

            <div className="card-body">
                <h3 className="card-title">{project.title}</h3>

                <p className={`card-description ${isExpanded ? 'expanded' : ''}`}>
                    {project.description}
                </p>

                <div className="card-tech">
                    <TechStack technologies={project.technologies} />
                </div>

                <div className="card-footer">
                    <ProjectActions github={project.github} live={project.live} />
                    <button
                        className="view-more-btn"
                        onClick={() => setIsExpanded(prev => !prev)}
                        aria-expanded={isExpanded}
                    >
                        {isExpanded ? t('projects.showLess') : t('projects.showMore')}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
