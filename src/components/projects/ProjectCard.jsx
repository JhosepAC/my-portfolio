import { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'motion/react';
import useListEntrance from '../../hooks/useListEntrance';
import { EASE_SPRING } from '../../utils/motionVariants';
import ProjectStatus from './ProjectStatus';
import TechStack from './TechStack';
import ProjectActions from './ProjectActions';
import { projectPath } from '../../utils/projectUrls';
import './ProjectCard.css';

const ProjectCard = forwardRef(function ProjectCard({ project, index = 0 }, ref) {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const entrance = useListEntrance(ref, index, 14);
    const [imageFailed, setImageFailed] = useState(false);
    const visibleTechnologies = project.technologies.slice(0, 3);
    const additionalTechnologies = project.technologies.length - visibleTechnologies.length;
    return <motion.div className="project-card" role="listitem" layout={reduceMotion ? false : 'position'}
        {...entrance}
        exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.12 } }}
        transition={{ ...entrance.transition, layout: EASE_SPRING }}>
        <div className="card-image">
            {project.image && !imageFailed ? <img src={project.image}
                srcSet={project.imageWidth > 480 ? `${project.imageSmall} 480w, ${project.image} ${project.imageWidth}w` : undefined}
                sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1300px) 48vw, 620px"
                width={project.imageWidth} height={project.imageHeight}
                alt={t('caseStudy.previewAlt', { name: project.name })} loading="lazy" decoding="async" onError={() => setImageFailed(true)} />
                : <p>{t('caseStudy.imageMissing')}</p>}
        </div>
        <div className="card-body">
            <div className="card-context"><span>{t(`projects.filterCat.${project.category}`)}</span><ProjectStatus status={project.statusKey} text={t(`caseStudy.status.${project.statusKey}`)} /></div>
            <h3 className="card-title">{project.name}</h3>
            <p className="card-description">{t(`projects.items.${project.labelTranslate}.description`)}</p>
            <div className="card-tech">
                <TechStack technologies={visibleTechnologies} />
                {additionalTechnologies > 0 && <span className="card-tech-more" aria-label={t('caseStudy.moreTechnologies', { count: additionalTechnologies })}>+{additionalTechnologies}</span>}
            </div>
            <div className="card-footer">
                <Link to={projectPath(project.slug)} className="case-study-link" aria-label={`${t('caseStudy.explore')}: ${project.name}`}>
                    {t('caseStudy.explore')}<ArrowUpRight size={20} aria-hidden="true" />
                </Link>
                <ProjectActions github={project.github} live={project.live} projectTitle={project.name} />
            </div>
        </div>
    </motion.div>;
});
export default ProjectCard;
