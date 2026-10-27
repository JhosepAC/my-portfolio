import { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function ImageDialog({ image, onClose }) {
    const ref = useRef(null);
    const { t } = useTranslation();
    useEffect(() => {
        const dialog = ref.current;
        const opener = document.activeElement;
        const overflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';
        return () => {
            dialog.close();
            document.body.style.overflow = overflow;
            if (opener?.isConnected) opener.focus({ preventScroll: true });
        };
    }, []);
    return (
        <dialog ref={ref} className="case-dialog" aria-label={image.alt}
            onCancel={event => { event.preventDefault(); onClose(); }}
            onKeyDown={event => {
                if (event.key !== 'Tab') return;
                const controls = [...ref.current.querySelectorAll('button, a[href], [tabindex="0"]')];
                const first = controls[0];
                const last = controls[controls.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault(); last?.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault(); first?.focus();
                }
            }}
            onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
            <div className="case-dialog-content">
                <div className="case-dialog-header">
                    <p>{image.alt}</p>
                    <button autoFocus onClick={onClose} aria-label={t('caseStudy.close')}><X size={22} /></button>
                </div>
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
            </div>
        </dialog>
    );
}

export default function CaseImage({ src, small, alt, width = 800, height = 450, priority = false, caption }) {
    const { t } = useTranslation();
    const [failed, setFailed] = useState(false);
    const [expanded, setExpanded] = useState(false);
    return (
        <figure className="case-figure">
            {src && !failed ? (
                <button className="case-image-button" onClick={() => setExpanded(true)} aria-label={`${t('caseStudy.enlarge')}: ${alt}`} aria-haspopup="dialog">
                    <img src={src} srcSet={small ? `${small} 480w, ${src} ${width}w` : undefined}
                        sizes="(max-width: 900px) calc(100vw - 48px), 50vw" alt={alt} width={width} height={height}
                        loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}
                        decoding="async" onError={() => setFailed(true)} />
                    <span className="case-image-expand" aria-hidden="true"><Maximize2 size={18} /></span>
                </button>
            ) : <div className="case-image-missing" role="img" aria-label={alt}>{t('caseStudy.imageMissing')}</div>}
            {caption && <figcaption>{caption}</figcaption>}
            {expanded && <ImageDialog image={{ src, alt, width, height }} onClose={() => setExpanded(false)} />}
        </figure>
    );
}
