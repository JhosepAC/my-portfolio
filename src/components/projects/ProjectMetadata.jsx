import { useTranslation } from 'react-i18next';

export default function ProjectMetadata({ metadata }) {
    const { t } = useTranslation();
    const items = Object.entries(metadata || {}).filter(([key, value]) => key !== 'type' && value);
    if (!items.length) return null;
    return <dl className="case-metadata">{items.map(([key, value]) => (
        <div key={key}><dt>{t(`caseStudy.labels.${key}`)}</dt><dd>{key === 'collaboration' ? t(`caseStudy.values.${value}`) : value}</dd></div>
    ))}</dl>;
}
