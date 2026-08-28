import { useEffect, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { X, Download, ExternalLink } from 'lucide-react';
import useIsMobile from '../../hooks/useIsMobile';
import './CertificateModal.css';

const CertificatePdfViewer = lazy(() => import('./CertificatePdfViewer.jsx'));

const CertificateModal = ({ isOpen, onClose, certificateUrl, title }) => {
    const isMobile = useIsMobile();
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    onClick={onClose}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.25, ease: 'easeOut'}}
                >
                    <motion.div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                        initial={{opacity: 0, scale: 0.9, y: 24}}
                        animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.95, y: 12}}
                        transition={{duration: 0.3, ease: 'easeOut'}}
                    >
                        <div className="modal-header">
                            <div className="header-info">
                                <h3>{title}</h3>
                            </div>
                            <div className="modal-actions">
                                <a
                                    href={certificateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Abrir en nueva pestaña"
                                    className="action-btn"
                                >
                                    <ExternalLink size={20} />
                                </a>
                                <a
                                    href={certificateUrl}
                                    download
                                    title="Descargar"
                                    className="action-btn"
                                >
                                    <Download size={20} />
                                </a>
                                <button onClick={onClose} className="close-btn" title="Cerrar">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            {isMobile ? (
                                <Suspense fallback={<div className="pdf-loading">Cargando PDF...</div>}>
                                    <CertificatePdfViewer file={certificateUrl} />
                                </Suspense>
                            ) : (
                                <iframe
                                    src={`${certificateUrl}#toolbar=0&navpanes=0`}
                                    title={title}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                />
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default CertificateModal;