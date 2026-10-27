import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PROJECTS_DATA, getProjectBySlug, groupTechnologies } from '../data/projectsData';
import { isExternalProjectUrl, projectPath } from '../utils/projectUrls';
import { usePageMetadata } from '../hooks/usePageMetadata';
import ProjectHero from '../components/projects/ProjectHero';
import ProjectMetadata from '../components/projects/ProjectMetadata';
import ProjectSection from '../components/projects/ProjectSection';
import ProjectGallery from '../components/projects/ProjectGallery';
import ProjectActions from '../components/projects/ProjectActions';
import CaseImage from '../components/projects/CaseImage';
import NotFound from './NotFound';
import '../styles/ProjectCaseStudy.css';

function CaseStudy({ project }) {
    const { t, i18n } = useTranslation();
    const content = t(`caseStudy.items.${project.slug}`, { returnObjects: true });
    const index = PROJECTS_DATA.findIndex(item => item.slug === project.slug);
    const previous = PROJECTS_DATA[(index - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];
    const next = PROJECTS_DATA[(index + 1) % PROJECTS_DATA.length];
    const sections = [
        ['problem', 'problem', content.problem], ['solution', 'solution', content.solution],
        ['features', 'highlights', content.highlights?.length], ['decisions', 'decisions', content.technicalDecisions?.length],
        ['stack', 'stack', project.technologies?.length], ['results', 'results', content.results]
    ].filter(([, , present]) => present);

    usePageMetadata({
        title: `${project.name} | Jhosep Argomedo`, description: content.summary,
        image: project.image, imageWidth: project.imageWidth, imageHeight: project.imageHeight,
        imageAlt: t('caseStudy.previewAlt', { name: project.name }), language: i18n.resolvedLanguage,
    });

    return <article className="case-page">
        <nav className="case-topline" aria-label={t('caseStudy.back')}>
            <Link to="/#projects" className="case-back"><ArrowLeft size={18} aria-hidden="true" />{t('caseStudy.back')}</Link>
            <span className="case-author">Jhosep Argomedo</span>
        </nav>
        <div className="case-layout">
            <div className="case-reading">
                <ProjectHero project={project} content={content} />
                <ProjectMetadata metadata={project.metadata} />
                {content.problem && <ProjectSection id="problem" title={t('caseStudy.problem')}><p>{content.problem}</p></ProjectSection>}
                {content.objectives?.length > 0 && <ProjectSection id="objectives" title={t('caseStudy.objectives')}>
                    <ul className="case-objectives">{content.objectives.map(item => <li key={item}>{item}</li>)}</ul>
                </ProjectSection>}
                {content.solution && <ProjectSection id="solution" title={t('caseStudy.solution')}><p>{content.solution}</p></ProjectSection>}
                {content.highlights?.length > 0 && <ProjectSection id="features" title={t('caseStudy.highlights')}>
                    <dl className="case-features">{content.highlights.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.text}</dd></div>)}</dl>
                </ProjectSection>}
                {content.technicalDecisions?.length > 0 && <ProjectSection id="decisions" title={t('caseStudy.decisions')}>
                    <div className="case-decisions">{content.technicalDecisions.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
                </ProjectSection>}
                {['architecture', 'challenges', 'learnings', 'future'].map(key => content[key] && <ProjectSection key={key} id={key} title={t(`caseStudy.${key}`)}>
                    {Array.isArray(content[key]) ? <ul className="case-objectives">{content[key].map(text => <li key={text}>{text}</li>)}</ul> : <p>{content[key]}</p>}
                </ProjectSection>)}
            </div>
            <aside className="case-visual" aria-label={t('caseStudy.preview')}>
                <div className="case-visual-sticky">
                    <CaseImage key={project.image} src={project.image} small={project.imageWidth > 480 ? project.imageSmall : undefined}
                        alt={t('caseStudy.previewAlt', { name: project.name })} width={project.imageWidth} height={project.imageHeight} priority />
                    <p className="case-visual-caption">{content.tagline}</p>
                    <nav className="case-contents" aria-label={t('caseStudy.contents')}>
                        {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{t(`caseStudy.${label}`)}</a>)}
                    </nav>
                </div>
            </aside>
        </div>
        {project.technologies?.length > 0 && <ProjectSection id="stack" title={t('caseStudy.stack')} className="case-stack-section">
            <dl className="case-stack">{groupTechnologies(project.technologies).map(group => (
                <div key={group.key}><dt>{t(`caseStudy.groups.${group.key}`)}</dt><dd>{group.items.map(tech => <span key={tech.name}>{tech.name}</span>)}</dd></div>
            ))}</dl>
        </ProjectSection>}
        <ProjectGallery images={project.gallery} />
        {content.results && <ProjectSection id="results" title={t('caseStudy.results')} className="case-results">
            <div><p>{content.results}</p>
                {isExternalProjectUrl(project.github) && <a className="case-source" href={`${project.github.replace(/\/$/, '')}#readme`} target="_blank" rel="noopener noreferrer">{t('caseStudy.source')}<ArrowUpRight size={16} aria-hidden="true" /></a>}
            </div>
            <ProjectActions github={project.github} live={project.live} projectTitle={project.name} />
        </ProjectSection>}
        <nav className="case-related" aria-labelledby="related-title">
            <h2 id="related-title">{t('caseStudy.moreProjects')}</h2>
            <div className="case-related-list">{[next, ...PROJECTS_DATA.filter(item => ![project.slug, previous.slug, next.slug].includes(item.slug)), previous].map(item => (
                <Link key={item.slug} to={projectPath(item.slug)} className="case-related-link">
                    <img src={item.imageSmall || item.image} alt={t('caseStudy.previewAlt', { name: item.name })} width={item.imageWidth} height={item.imageHeight} loading="lazy" decoding="async" />
                    <div><span>{item.slug === next.slug ? t('caseStudy.next') : item.slug === previous.slug ? t('caseStudy.previous') : t(`caseStudy.types.${item.metadata.type}`)}</span><strong>{item.name}</strong></div>
                    <ArrowRight size={24} aria-hidden="true" />
                </Link>
            ))}</div>
        </nav>
        <footer className="case-footer"><Link to="/#projects">{t('caseStudy.catalog')}</Link><Link to="/#contact">{t('caseStudy.contact')}<ArrowUpRight size={18} aria-hidden="true" /></Link></footer>
    </article>;
}

export default function ProjectCaseStudy() {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);
    return project ? <CaseStudy key={project.slug} project={project} /> : <NotFound />;
}
