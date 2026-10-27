import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE_SPRING, reveal } from '../../utils/motionVariants';
import { ChevronDown } from 'lucide-react';
import { EXPERIENCE_DATA } from '../../utils/constants.js';
import './ExperienceSection.css';

const experiences = [...EXPERIENCE_DATA].reverse();

function dateTime(value) {
    const [month, year] = value.split('/');
    return `${year}-${month}`;
}

function Period({ item }) {
    const { t } = useTranslation();
    return <span className="experience-period">
        <time dateTime={dateTime(item.startDate)}>{item.startDate}</time>
        <span aria-hidden="true">—</span>
        {item.endDate ? <time dateTime={dateTime(item.endDate)}>{item.endDate}</time> : <span>{t('experience.current')}</span>}
    </span>;
}

export default function ExperienceSection() {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const [selectedId, setSelectedId] = useState(experiences[0].id);
    const tabs = useRef([]);
    const selected = experiences.find(item => item.id === selectedId) ?? experiences[0];
    const focus = t(`experience.items.${selected.id}.focus`, { returnObjects: true });
    const achievements = t(`experience.items.${selected.id}.achievements`, { returnObjects: true });

    function onTabKeyDown(event, index) {
        let nextIndex;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % experiences.length;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + experiences.length) % experiences.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = experiences.length - 1;
        else return;
        event.preventDefault();
        setSelectedId(experiences[nextIndex].id);
        tabs.current[nextIndex]?.focus();
    }

    return <section id="experience" className="experience-section" aria-labelledby="experience-title">
        <div className="experience-container">
            <motion.header className="experience-intro" {...reveal(reduceMotion, { distance: 14 })}>
                <h2 id="experience-title">{t('experience.title')} {t('experience.titleHighlight')}</h2>
                <p>{t('experience.subtitle')}</p>
            </motion.header>

            <motion.div {...reveal(reduceMotion, { distance: 10, delay: 0.055 })} className="experience-employers" role="tablist" aria-label={t('experience.selectEmployer')}>
                {experiences.map((item, index) => <button
                    key={item.id}
                    ref={node => { tabs.current[index] = node; }}
                    type="button"
                    id={`experience-tab-${item.id}`}
                    className={`experience-employer ${selected.id === item.id ? 'is-selected' : ''}`}
                    role="tab"
                    aria-selected={selected.id === item.id}
                    aria-controls="experience-panel"
                    tabIndex={selected.id === item.id ? 0 : -1}
                    onClick={() => setSelectedId(item.id)}
                    onKeyDown={event => onTabKeyDown(event, index)}
                >
                    {selected.id === item.id && <motion.span className="experience-active-surface" aria-hidden="true" layoutId={reduceMotion ? undefined : "experience-selection"} transition={EASE_SPRING} />}
                    <span className="experience-employer-mark">
                        {item.logo && <img src={item.logo} alt="" loading="lazy" />}
                    </span>
                    <span className="experience-employer-copy">
                        <span className="experience-employer-name">{item.company}</span>
                        <span className="experience-employer-role">{t(`experience.items.${item.id}.role`)}</span>
                    </span>
                    <Period item={item} />
                </button>)}
            </motion.div>

            <motion.div {...reveal(reduceMotion, { distance: 12, delay: 0.1 })} id="experience-panel" className="experience-panel" role="tabpanel" aria-labelledby={`experience-tab-${selected.id}`} tabIndex={0}>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={selected.id} className="experience-panel-inner"
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -5, transition: { duration: 0.12 } }}
                        transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.23, 1, 0.32, 1] }}>
                        <div className="experience-panel-lead">
                            <h3>{t(`experience.items.${selected.id}.role`)}</h3>
                            <div className="experience-panel-identity">
                                <span>{selected.company}</span>
                            </div>
                            <div className="experience-panel-meta">
                                <Period item={selected} />
                                <span>{t('experience.remote')}</span>
                                <span>{t(`experience.type.${selected.type}`)}</span>
                            </div>
                            <p className="experience-panel-description">{t(`experience.items.${selected.id}.description`)}</p>
                        </div>

                        <div className="experience-panel-work">
                            <h4>{t('experience.workAreas')}</h4>
                            {Array.isArray(focus) && <div className="experience-focus-list">
                                {focus.map(area => <article className="experience-focus" key={area.title}>
                                    <h5>{area.title}</h5>
                                    <p>{area.description}</p>
                                </article>)}
                            </div>}
                            {Array.isArray(achievements) && <details className="experience-details">
                                <summary>{t('experience.allResponsibilities')}<ChevronDown size={18} aria-hidden="true" /></summary>
                                <ul>{achievements.map(achievement => <li key={achievement}>{achievement}</li>)}</ul>
                            </details>}
                        </div>

                        <div className="experience-stack">
                            <h4>{t('experience.technologies')}</h4>
                            <ul>{selected.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    </section>;
}
