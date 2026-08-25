import {memo, useState, lazy, Suspense} from 'react';
import {motion} from 'motion/react';
import {useTranslation} from 'react-i18next';
import {EDUCATION_ICONS, TIMELINE_ICONS} from '../../utils/Icons';
import StatusBadge from './StatusBadge';
import useIsMobile from '../../hooks/useIsMobile';
import {EASE} from '../../utils/motionVariants';
import './TimelineItem.css';

const CertificateModal = lazy(() => import("./CertificateModal.jsx"));
const CertificateImageViewer = lazy(() => import("./CertificateImageViewer.jsx"));

const TimelineItem = ({item, index, isExpanded, onToggle}) => {
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const isMobile = useIsMobile();

    const mainIcon = item.logo
        ? <img src={item.logo} alt={item.institution} className="card-icon-img" loading="lazy" />
        : (EDUCATION_ICONS[item.iconType.toUpperCase()] || EDUCATION_ICONS.COURSE);

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
