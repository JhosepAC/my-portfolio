import { motion } from 'motion/react';
import ProjectStatus from './ProjectStatus';
import TechStack from './TechStack';
import ProjectActions from './ProjectActions';
import useIsMobile from '../../hooks/useIsMobile';
import { EASE } from '../../utils/motionVariants';
import './ProjectCard.css';

const ProjectCard = ({ project, index }) => {
    const isTouch = useIsMobile(1024);

    return (
        <motion.div
            className="project-card"
            role="listitem"
            layout={!isTouch}
            drag={!isTouch}
            dragConstraints={isTouch ? undefined : { top: 0, left: 0, right: 0, bottom: 0 }}
            dragElastic={isTouch ? undefined : 0.15}
            dragMomentum={false}
            whileDrag={isTouch ? undefined : { scale: 1.04, zIndex: 30 }}
            whileHover={isTouch ? undefined : { x: -4, y: -4 }}
            style={{ touchAction: isTouch ? 'pan-y' : undefined }}
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

                <p className="card-description">
                    {project.description}
                </p>

                <div className="card-tech">
                    <TechStack technologies={project.technologies} />
                </div>

                <div className="card-footer">
                    <ProjectActions github={project.github} live={project.live} projectTitle={project.title} />
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;