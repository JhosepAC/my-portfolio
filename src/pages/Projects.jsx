import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { PROJECTS_DATA } from '../data/projectsData';
import '../styles/ProjectsPage.css';

/**
 * Catalog route. The full listing will live here; until then the page
 * states the situation plainly instead of rendering an empty screen.
 */
export default function Projects() {
    const { t, i18n } = useTranslation();

    usePageMetadata({
        title: `${t('projectsPage.title')} | Jhosep Argomedo`,
        description: t('projectsPage.subtitle'),
        language: i18n.resolvedLanguage,
    });

    return <section className="catalog-page">
        <nav className="catalog-topline" aria-label={t('projectsPage.back')}>
            <Link to="/#projects" className="catalog-back">
                <ArrowLeft size={18} aria-hidden="true" />
                {t('projectsPage.back')}
            </Link>
            <span className="catalog-count">{t('projectsPage.count', { count: PROJECTS_DATA.length })}</span>
        </nav>

        <header className="catalog-header">
            <h1 data-page-title>{t('projectsPage.title')}</h1>
            <p>{t('projectsPage.subtitle')}</p>
        </header>

        <div className="catalog-pending">
            <div className="catalog-pending-copy">
                <h2>{t('projectsPage.pendingTitle')}</h2>
                <p>{t('projectsPage.pendingText', { count: PROJECTS_DATA.length })}</p>
            </div>
            <Link to="/#projects" className="catalog-pending-action">
                {t('projectsPage.backToSelection')}
                <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
        </div>
    </section>;
}
