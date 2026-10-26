import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePageMetadata } from '../hooks/usePageMetadata';
import '../styles/ProjectCaseStudy.css';

export default function NotFound() {
    const { t } = useTranslation();
    usePageMetadata({ title: `404 | Jhosep Argomedo`, description: t('caseStudy.noPageText'), noIndex: true });
    return <section className="case-page case-not-found">
        <p className="case-error-code">404</p>
        <h1 data-page-title>{t('caseStudy.noPage')}</h1>
        <p>{t('caseStudy.noPageText')}</p>
        <Link to="/#projects" className="case-back"><ArrowLeft size={18} aria-hidden="true" />{t('caseStudy.back')}</Link>
    </section>;
}
