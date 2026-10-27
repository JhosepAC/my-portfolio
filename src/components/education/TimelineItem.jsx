import {memo, useState, lazy, Suspense, useEffect, useRef} from 'react';
import {motion, AnimatePresence, useInView, useReducedMotion} from 'motion/react';
import {useTranslation} from 'react-i18next';
import {EDUCATION_ICONS, TIMELINE_ICONS} from '../../utils/Icons';
import StatusBadge from './StatusBadge';
import useIsMobile from '../../hooks/useIsMobile';
import {EASE, reveal} from '../../utils/motionVariants';
import './TimelineItem.css';

const CertificateModal = lazy(() => import("./CertificateModal.jsx"));
const CertificateImageViewer = lazy(() => import("./CertificateImageViewer.jsx"));

const TimelineItem = ({item, index, isExpanded, onToggle, hasOpenedAny}) => {
    const {t} = useTranslation();
    const reduced = useReducedMotion();
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: true, amount: 0.15 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [hintPulse, setHintPulse] = useState(false);
    const isMobile = useIsMobile();

    const mainIcon = item.logo
        ? <img src={item.logo} alt={item.institution} className="card-icon-img" loading="lazy" />
        : (EDUCATION_ICONS[item.iconType.toUpperCase()] || EDUCATION_ICONS.COURSE);

    const toggleExpand = (e) => {
        if (e) e.stopPropagation();
        onToggle(item.id);
    };

    const handleCardClick = (e) => {
        const target = e.target;
        if (target.closest && target.closest('a, button, [role="button"]')) {
            if (target.closest('.expand-button')) return;
            if (!target.closest('.timeline-card')) return;
            if (target.closest('.certificate-wrapper')) return;
        }
        toggleExpand(e);
    };

    // Hint solo en primera card, esquina inferior derecha, cada 2s, hasta que se abra alguna card.
    // `hintActive` se deriva del estado en el render; el efecto solo programa el pulso.
    const hintActive = !reduced && isMobile && index === 0 && !isExpanded && !hasOpenedAny;
    useEffect(() => {
        if (!hintActive) {
            return;
        }
        if (!inView) return;
        const show = setTimeout(() => setHintPulse(true), 1200);
        const hide = setTimeout(() => setHintPulse(false), 2400);
        return () => { clearTimeout(show); clearTimeout(hide); };
    }, [hintActive, inView]);

    return (<motion.div
        className={`timeline-item ${item.type === 'university' ? 'timeline-item-important' : ''} ${isExpanded ? 'expanded' : ''}`}
        ref={cardRef} data-in-view={inView}
        {...reveal(reduced, { distance: 16, delay: Math.min(index, 2) * 0.045 })}
    >
        <div className="timeline-year"><span>{item.year}</span></div>

        <div className="timeline-dot">
            <div className="dot-inner"></div>
            <div className="dot-pulse"></div>
        </div>

        <div className="timeline-card" onClick={handleCardClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); handleCardClick(e); } }} aria-expanded={isExpanded}>
            <AnimatePresence>
                {hintActive && hintPulse && (
                    <motion.div
                        className="expand-hint expand-hint--touch"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.18, ease: EASE }}
                    >
                        <span className="hint-touch-icon" aria-hidden="true">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 11V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7" />
                                <path d="M9 11V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v5" />
                                <path d="M15 11V7a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v5" />
                                <path d="M5 13V9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-2" />
                            </svg>
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="card-header">
                <div className={`card-icon ${item.logo ? 'has-logo' : ''}`}>{mainIcon}</div>

                <div className="card-info">
                    <div className="card-top">
                        <h3 className="card-title">{item.title}</h3>
                        <StatusBadge status={item.status}/>
                    </div>

                    <div className="card-institution">
                        <span className="institution-name">{item.institution}</span>
                        {item.location && (<>
                            <span className="institution-separator">•</span>
                            <span className="institution-location">
                                        {TIMELINE_ICONS.LOCATION} {item.location}
                                    </span>
                        </>)}
                    </div>

                    <div className="card-meta">
                            <span className="card-date">
                                {TIMELINE_ICONS.DATE} {item.date} {item.endDate && `- ${item.endDate}`}
                            </span>
                    </div>
                </div>

                <button
                    className="expand-button"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    aria-expanded={isExpanded}
                    onClick={toggleExpand}
                >
                    {TIMELINE_ICONS.CHEVRON}
                </button>
            </div>

            <div className="card-expanded">
                <div className="expanded-wrapper">
                    <div className="expanded-content">
                        <p className="expanded-description">{item.description}</p>

                        <div className="expanded-skills">
                            <span className="skills-label">{t('education.skills')}:</span>
                            <div className="skills-list">
                                {item.skills.map((skill, idx) => (<span key={idx} className="skill-tag">{skill}</span>))}
                            </div>
                        </div>

                        {item.status === 'completed' && item.certificate && (
                            <div className="certificate-wrapper">
                                <motion.button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (isMobile && item.certificateImage) {
                                            setIsImageOpen(true);
                                        } else {
                                            setIsModalOpen(true);
                                        }
                                    }}
                                    className="certificate-button"
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {TIMELINE_ICONS.CERT_FILE}
                                    <span>{t('education.viewCertificate')}</span>
                                </motion.button>

                                <Suspense fallback={null}>
                                    <CertificateModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        certificateUrl={item.certificate}
                                        title={item.title || item.degree}
                                    />
                                    {item.certificateImage && (
                                        <CertificateImageViewer
                                            isOpen={isImageOpen}
                                            onClose={() => setIsImageOpen(false)}
                                            imageSrc={item.certificateImage}
                                            title={item.title || item.degree}
                                            onOpenModal={() => setIsModalOpen(true)}
                                        />
                                    )}
                                </Suspense>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    </motion.div>);
};

export default memo(TimelineItem);
