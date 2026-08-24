import React from 'react';
import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ASSETS } from '../../../utils/constants';
import { downloadFile } from '../../../utils/helpers';
import './DownloadButton.css';

const DownloadButton = ({
                            label,
                            fileUrl,
                            fileName,
                            variant = "default"
                        }) => {
    const { i18n } = useTranslation();
    const isEs = i18n.language?.startsWith('es');
    const langSuffix = isEs ? 'es' : 'en';

    // Si no se pasa label o se pasa "CV", mostrar CV^es / CV^en según idioma
    const effectiveLabel = label ? (label === 'CV' ? `CV^${langSuffix}` : label) : `CV^${langSuffix}`;
    const effectiveFileUrl = fileUrl ?? (isEs ? ASSETS.CV_PATH_ES : ASSETS.CV_PATH_EN);
    const effectiveFileName = fileName ?? (isEs ? ASSETS.CV_NAME_ES : ASSETS.CV_NAME_EN);

    const handleDownload = () => downloadFile(effectiveFileUrl, effectiveFileName);
    const className = variant === "secondary" ? "btn-secondary" : "btn-cv";

    const renderLabel = () => {
        if (effectiveLabel.includes('^')) {
            const [main, sup] = effectiveLabel.split('^');
            return (
                <span>{main}<sup className="btn-sup">{sup}</sup></span>
            );
        }
        return <span>{effectiveLabel}</span>;
    };

    return (
        <button
            type="button"
            className={className}
            onClick={handleDownload}
            aria-label={`Descargar ${effectiveLabel}`}
        >
            <FileText size={18} className={variant === "secondary" ? "btn-secondary-icon" : "btn-icon"} />
            {renderLabel()}
        </button>
    );
};

export default DownloadButton;