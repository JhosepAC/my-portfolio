import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Vite ?url import for worker - min for production
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const CertificatePdfViewer = ({ file }) => {
    const containerRef = useRef(null);
    const [numPages, setNumPages] = useState(null);
    const [containerWidth, setContainerWidth] = useState(0);

    const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver((entries) => {
            const w = entries[0].contentRect.width;
            setContainerWidth(w);
        });
        ro.observe(el);
        setContainerWidth(el.clientWidth);
        return () => ro.disconnect();
    }, []);

    // width for Page: use container width minus small padding, cap at 900
    const pageWidth = containerWidth ? Math.min(containerWidth - 16, 860) : undefined;

    return (
        <div ref={containerRef} className="pdf-viewer-container">
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div className="pdf-loading">Cargando PDF...</div>}
                error={<div className="pdf-error">No se pudo cargar el PDF. <a href={file} target="_blank" rel="noopener noreferrer">Abrir en nueva pestaña</a></div>}
            >
                {Array.from(new Array(numPages || 0), (_, idx) => (
                    <Page
                        key={`page_${idx + 1}`}
                        pageNumber={idx + 1}
                        width={pageWidth}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="pdf-page"
                        loading={<div className="pdf-page-loading">Cargando página {idx + 1}...</div>}
                    />
                ))}
            </Document>
        </div>
    );
};

export default CertificatePdfViewer;
