import {memo, useState, lazy, Suspense} from 'react';
import {motion} from 'motion/react';
import {useTranslation} from 'react-i18next';
import {EDUCATION_ICONS, TIMELINE_ICONS} from '../../utils/Icons';
import StatusBadge from './StatusBadge';
import {EASE} from '../../utils/motionVariants';
import './TimelineItem.css';

const CertificateModal = lazy(() => import("./CertificateModal.jsx"));

const TimelineItem = ({item, index, isExpanded, onToggle}) => {
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mainIcon = EDUCATION_ICONS[item.iconType.toUpperCase()] || EDUCATION_ICONS.COURSE;

    const toggleExpand = (e) => {
        e.stopPropagation();
        onToggle(item.id);
    };

    return (<motion.div
        className={`timeline-item ${item.type === 'university' ? 'timeline-item-important' : ''} ${isExpanded ? 'expanded' : ''}`}
        initial={{opacity: 0, y: 28}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.2}}
        transition={{duration: 0.5, ease: EASE, delay: index * 0.12}}
    >
        <div className="timeline-year"><span>{item.year}</span></div>

        <div className="timeline-dot">
            <div className="dot-inner"></div>
            <div className="dot-pulse"></div>
        </div>

        <div className="timeline-card">
            <div className="card-header">
                <div className="card-icon">{mainIcon}</div>

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
                                        setIsModalOpen(true);
                                    }}
                                    className="certificate-button"
                                    whileHover={{x: -2, y: -2}}
                                    whileTap={{scale: 0.95}}
                                >
                                    {TIMELINE_ICONS.CERT_FILE}
                                    <span>{t('education.viewCertificate')}</span>
                                </motion.button>

                                <div className="certificate-preview">
                                    <iframe
                                        src={`${item.certificate}#page=1&view=FitH&toolbar=0&navpanes=0`}
                                        title={item.title}
                                        loading="lazy"
                                    />
                                </div>

                                <Suspense fallback={null}>
                                    <CertificateModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        certificateUrl={item.certificate}
                                        title={item.title || item.degree}
                                    />
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
