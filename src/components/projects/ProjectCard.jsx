import { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import ProjectStatus from './ProjectStatus';
import TechStack from './TechStack';
import ProjectActions from './ProjectActions';
import { EASE } from '../../utils/motionVariants';
import './ProjectCard.css';

const ProjectCard = ({ project, index }) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            className={`project-card ${isExpanded ? 'expanded' : ''}`}
            role="listitem"
            layout
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            dragElastic={0.15}
            dragMomentum={false}
            whileDrag={{ scale: 1.04, zIndex: 30 }}
            whileHover={{ x: -4, y: -4 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: EASE, delay: index * 0.08 }}
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
                    <ProjectActions github={project.github} live={project.live} projectTitle={project.title} />
                    <motion.button
                        className="view-more-btn"
                        onClick={() => setIsExpanded(prev => !prev)}
                        aria-expanded={isExpanded}
                        whileHover={{x: -2, y: -2}}
                        whileTap={{scale: 0.95}}
                    >
                        {isExpanded ? t('projects.showLess') : t('projects.showMore')}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;