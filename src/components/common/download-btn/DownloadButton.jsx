import React from 'react';
import { FileText } from 'lucide-react';
import './DownloadButton.css';
import cvFile from '../../../assets/docs/JHOSEP_JAMIL-ARGOMEDO_CAMACHO-CV.pdf';

const DownloadButton = ({ label = "CV", fileName = "JHOSEP_ARGOMEDO-CV.pdf" }) => {

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = cvFile;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            className="btn-cv"
            onClick={handleDownload}
            aria-label={`Descargar ${label}`}
        >
            <FileText size={18} className="btn-icon" />
            {label}
        </button>
    );
};

export default DownloadButton;