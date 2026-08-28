import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './CertificateImageViewer.css';

const CertificateImageViewer = ({ isOpen, onClose, imageSrc, title, onOpenModal }) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="cert-image-overlay"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                    <motion.div
                        className="cert-image-content"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.97, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 8 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                    >
                        <div className="cert-image-header">
                            <h3>{title}</h3>
                            <button onClick={onClose} className="cert-image-close" aria-label="Cerrar">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="cert-image-body">
                            <img src={imageSrc} alt={title} className="cert-image-img" loading="lazy" />
                        </div>

                        <div className="cert-image-footer">
                            <button
                                className="cert-image-modal-btn"
                                onClick={() => {
                                    onClose();
                                    // slight delay to allow exit animation before opening modal
                                    setTimeout(() => onOpenModal(), 180);
                                }}
                            >
                                <ExternalLink size={16} />
                                <span>{t('education.openAsModal', 'Abrir como modal')}</span>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default CertificateImageViewer;
