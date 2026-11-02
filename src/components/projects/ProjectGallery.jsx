import { useTranslation } from 'react-i18next';
import CaseImage from './CaseImage';
import ProjectSection from './ProjectSection';

export default function ProjectGallery({ images = [], intro, variant }) {
    const { t } = useTranslation();
    const available = images.filter(image => image.src);
    if (!available.length) return null;
    return <ProjectSection id="gallery" title={t('caseStudy.gallery')} className={`case-gallery ${available.length === 1 ? 'case-gallery--single' : ''} ${variant ? `case-gallery--${variant}` : ''}`}>
        {intro && <p className="case-gallery-intro">{intro}</p>}
        <div className="case-gallery-images">{available.map(image => (
            <CaseImage key={image.src} {...image} alt={t(image.altKey)} caption={image.captionKey ? t(image.captionKey) : undefined} />
        ))}</div>
    </ProjectSection>;
}
