import React from 'react';
import {motion} from 'motion/react';
import './Loader.css';
import { useTranslation } from 'react-i18next';

const Loader = () => {
    const { t } = useTranslation();

    return (
        <motion.div
            className="loader-overlay"
            initial={{opacity: 1}}
            exit={{opacity: 0, transition: {duration: 0.4, ease: 'easeOut'}}}
        >
            <div className="loader-content">
                <div className="loader-ring">
                    <span></span>
                </div>
                <p className="loader-text">{t('loader.message')}</p>
            </div>
        </motion.div>
    );
};

export default Loader;