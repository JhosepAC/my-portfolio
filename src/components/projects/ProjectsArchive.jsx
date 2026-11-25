import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { m, useReducedMotion } from 'motion/react';
import { reveal } from '../../utils/motionVariants';
import { projectPath } from '../../utils/projectUrls';
import './ProjectsArchive.css';

/**
 * Closing invitation to the full catalog. The strip is a continuous marquee:
 * each frame links to its own case study, while the button still opens the
 * catalog. The duplicated group makes the loop seamless; it is hidden from
 * assistive tech and removed from the tab order.
 */
export default function ProjectsArchive({ projects }) {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();

    return <m.div {...reveal(reduceMotion, { distance: 20 })}>
        <div className="projects-archive">
            <h3 className="projects-archive-title">{t('projects.archive.title')}</h3>
            <div className="projects-archive-copy">
                <p className="projects-archive-text">{t('projects.archive.text', { count: projects.length })}</p>
                <p className="projects-archive-hint">{t('projects.archive.hint')}</p>
            </div>
            <Link to="/proyectos" className="projects-archive-action">
                {t('projects.archive.action')}
                <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
            <div className="projects-archive-marquee">
                <div className="projects-archive-track">
                    {[0, 1].map(copy => <div className="projects-archive-group" key={copy}
                        aria-hidden={copy === 1 || undefined}>
                        {projects.map(project => <Link key={`${copy}-${project.slug}`}
                            to={projectPath(project.slug)}
                            className="projects-archive-thumb"
                            tabIndex={copy === 1 ? -1 : undefined}
                            aria-label={`${t('caseStudy.explore')}: ${project.name}`}>
                            <img src={project.imageSmall || project.image} alt="" width={project.imageWidth}
                                height={project.imageHeight} loading="eager" decoding="async" />
                            <span className="projects-archive-thumb-label" aria-hidden="true">
                                {project.name}
                                <ArrowUpRight size={14} aria-hidden="true" />
                            </span>
                        </Link>)}
                    </div>)}
                </div>
            </div>
        </div>
    </m.div>;
}
