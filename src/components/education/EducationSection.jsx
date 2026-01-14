import {memo, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import TimelineItem from './TimelineItem';
import {EDUCATION_DATA} from "../../utils/constants.js";
import {EDUCATION_ICONS} from "../../utils/Icons.jsx";
import './EducationSection.css';

const EducationSection = () => {
    const {t} = useTranslation();

    const educationItems = useMemo(() => EDUCATION_DATA.map(item => {
        const translatedSkills = t(`education.items.${item.id}.skills`, {returnObjects: true});

        return {
            ...item,
            description: t(`education.items.${item.id}.description`),
            skills: Array.isArray(translatedSkills) ? translatedSkills : []
        };
    }), [t]);

    const backgroundParticles = useMemo(() => ([...Array(20)].map((_, i) => (<div
        key={i}
        className="education-particle"
        style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
        }}
    />))), []);

    return (<section id="education" className="education-section">
        <div className="education-bg">
            <div className="education-grid"></div>
            <div className="education-orb education-orb-1"></div>
            <div className="education-orb education-orb-2"></div>
            <div className="education-particles">
                {backgroundParticles}
            </div>
        </div>

        <div className="education-container">
            <div className="education-header">
                <div className="education-badge">
                    {EDUCATION_ICONS.BADGE}
                    <span className="education-badge-text">{t('education.badge')}</span>
                </div>

                <h2 className="education-title">
                    <span className="education-title-main">{t('education.title')}</span>
                    <span className="education-title-gradient">{t('education.titleHighlight')}</span>
                </h2>

                <p className="education-subtitle">
                    {t('education.subtitle')}
                </p>
            </div>

            <div className="education-timeline">
                <div className="timeline-line"></div>
                {educationItems.map((item, index) => (<TimelineItem
                    key={item.id}
                    item={item}
                    index={index}
                />))}
            </div>
        </div>
    </section>);
};

export default memo(EducationSection);