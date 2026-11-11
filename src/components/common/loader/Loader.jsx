import React from 'react';
import {m} from 'motion/react';
import './Loader.css';
import { useTranslation } from 'react-i18next';

const Loader = () => {
    const { t } = useTranslation();

    return (
        <m.div
            className="loader-overlay"
            initial={{opacity: 1}}
            exit={{opacity: 0, transition: {duration: 0.18, ease: 'easeOut'}}}
        >
            <div className="loader-content">
                <div className="loader-ring">
                    <span></span>
                </div>
                <p className="loader-text">{t('loader.message')}</p>
            </div>
        </m.div>
    );
};

export default Loader;