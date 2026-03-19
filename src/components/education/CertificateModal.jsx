import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, ExternalLink } from 'lucide-react';
import './CertificateModal.css';

const CertificateModal = ({ isOpen, onClose, certificateUrl, title }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                    <iframe
                        src={`${certificateUrl}#toolbar=0&navpanes=0`}
                        title={title}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                    />
                </div>
            </div>
        </div>,
        document.body
    );
};

export default CertificateModal;