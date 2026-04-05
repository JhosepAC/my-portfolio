import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import ProjectStatus from './ProjectStatus';
import TechStack from './TechStack';
import ProjectActions from './ProjectActions';
import './ProjectCard.css'

const ProjectCard = ({ project, index, activeIndex, isAnimating }) => {
    const { t } = useTranslation();
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);
    const offset = index - activeIndex;
    const isActive = index === activeIndex;

    const cardStyles = {
        transform: `translateX(${offset * 100}%) scale(${isActive ? 1 : 0.85}) rotateY(${offset * 15}deg)`,
        opacity: Math.abs(offset) > 1 ? 0 : 1,
        zIndex: 10 - Math.abs(offset),
        filter: isActive ? 'none' : 'brightness(0.5) blur(2px)'
    };

    const handleViewMore = (e) => {
        e.stopPropagation();
        setIsMobileExpanded(!isMobileExpanded);
    };

    return (
        <article 
            className={`project-card ${isActive ? 'active' : ''} ${isAnimating ? 'animating' : ''} ${isMobileExpanded ? 'mobile-expanded' : ''}`} 
            style={cardStyles}
        >
            <ProjectStatus status={project.statusKey} text={project.statusText} />

            <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="image-overlay" />
            </div>

            <div className="project-info">
                <div className="info-header">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-number">
                        <span className="number-label">{t('projects.numberLabel')}</span>
                        <span className="number-value">#{String(project.id).padStart(2, '0')}</span>
                    </div>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech-stack">
                    <TechStack technologies={project.technologies} />
                </div>

                <ProjectActions className="project-actions-card" github={project.github} live={project.live} />

                <div className="mobile-view-more">
                    <button className="mobile-view-more-btn" onClick={handleViewMore}>
                        {isMobileExpanded ? t('projects.showLess') : t('projects.showMore')}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;