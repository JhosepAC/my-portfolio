import React from 'react';
import { FileText } from 'lucide-react';
import { ASSETS } from '../../../utils/constants';
import { downloadFile } from '../../../utils/helpers';
import './DownloadButton.css';

const DownloadButton = ({
                            label = "CV",
                            fileUrl = ASSETS.CV_PATH,
                            fileName = ASSETS.CV_NAME
                        }) => {

    const handleDownload = () => downloadFile(fileUrl, fileName);

    return (
        <button
            type="button"
            className="btn-cv"
            onClick={handleDownload}
            aria-label={`Descargar ${label}`}
        >
            <FileText size={18} className="btn-icon" />
            <span>{label}</span>
        </button>
    );
};

export default DownloadButton;