import React from 'react';
import './Loader.css';
import { useTranslation } from 'react-i18next';

const Loader = () => {
    const { t } = useTranslation();

    return (
        <div className="loader-overlay">
            <div className="loader-content">
                <div className="loader-ring">
                    <span></span>
                </div>
                <p className="loader-text">{t('loader.message')}</p>
            </div>
        </div>
    );
};

export default Loader;