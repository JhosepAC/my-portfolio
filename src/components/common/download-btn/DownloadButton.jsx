import React from 'react';
import { FileText } from 'lucide-react';
import { ASSETS } from '../../../utils/constants';
import { downloadFile } from '../../../utils/helpers';
import './DownloadButton.css';

const DownloadButton = ({
                            label = "CV",
                            fileUrl = ASSETS.CV_PATH,
                            fileName = ASSETS.CV_NAME,
                            variant = "default"
                        }) => {

    const handleDownload = () => downloadFile(fileUrl, fileName);
    const className = variant === "secondary" ? "btn-secondary" : "btn-cv";

    return (
        <button
            type="button"
            className={className}
            onClick={handleDownload}
            aria-label={`Descargar ${label}`}
        >
            <FileText size={18} className={variant === "secondary" ? "btn-secondary-icon" : "btn-icon"} />
            <span>{label}</span>
        </button>
    );
};

export default DownloadButton;