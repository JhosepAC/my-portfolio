import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { m, useReducedMotion } from 'motion/react';
import { reveal } from '../../utils/motionVariants';
import './ProjectsArchive.css';

/**
 * Closing invitation to the full catalog. The whole panel is the link:
 * the project strip previews what waits on /proyectos without repeating
 * the card layout used above it.
 */
export default function ProjectsArchive({ projects }) {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();

    return <m.div {...reveal(reduceMotion, { distance: 20 })}>
        <Link to="/proyectos" className="projects-archive">
            <h3 className="projects-archive-title">{t('projects.archive.title')}</h3>
            <p className="projects-archive-text">{t('projects.archive.text', { count: projects.length })}</p>
            <span className="projects-archive-action">
                {t('projects.archive.action')}
                <ArrowUpRight size={20} aria-hidden="true" />
            </span>
            <span className="projects-archive-strip" aria-hidden="true">
                {projects.map(project => <span className="projects-archive-thumb" key={project.slug}>
                    <img src={project.imageSmall || project.image} alt="" width={project.imageWidth}
                        height={project.imageHeight} loading="lazy" decoding="async" />
                </span>)}
            </span>
        </Link>
    </m.div>;
}
