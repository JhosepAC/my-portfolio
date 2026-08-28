import React from 'react';
import {motion} from 'motion/react';
import {useTranslation} from 'react-i18next';
import {Icon} from '@iconify/react';
import {ASSETS, NAV_LINKS} from '../../utils/constants';
import { downloadFile } from '../../utils/helpers';
import {EASE} from '../../utils/motionVariants';
import FooterLink from './FooterLink';
import SocialLinks from './SocialLinks';
import ContactInfo from './ContactInfo';
import logo from '../../assets/logo/logo-dark.svg';
import './Footer.css';

const Footer = () => {
    const {t, i18n} = useTranslation();
    const currentYear = new Date().getFullYear();

    const handleDownloadCV = (e) => {
        e.preventDefault();
        const isEs = i18n.language?.startsWith('es');
        const path = isEs ? ASSETS.CV_PATH_ES : ASSETS.CV_PATH_EN;
        const name = isEs ? ASSETS.CV_NAME_ES : ASSETS.CV_NAME_EN;
        downloadFile(path, name);
    };

    const cvSuffix = i18n.language?.startsWith('es') ? 'es' : 'en';
    const quickLinks = [
        {
            id: 'resume',
            label: `CV^${cvSuffix}`,
            onClick: handleDownloadCV,
            href: '#'
        },
    ];

    const viewport = {once: true, amount: 0.2};

    return (<footer className="footer">
            <div className="footer-container">
                <motion.div
                    className="footer-content"
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={viewport}
                    transition={{duration: 0.6, ease: EASE}}
                >
                    <motion.div
                        className="footer-brand"
                        initial={{opacity: 0, x: -30}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={viewport}
                        transition={{duration: 0.6, ease: EASE, delay: 0.1}}
                    >
                        <div className="footer-logo">
                            <img src={logo} alt="Jhosep Logo" className="logo-image"/>
                            <span className="footer-logo-text">Jhosep Argomedo</span>
                        </div>
                        <p className="footer-tagline">{t('footer.tagline')}</p>
                        <div className="footer-status">
                            <span className="footer-status-dot"></span>
                            <span className="footer-status-text">{t('footer.available')}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="footer-section"
                        initial={{opacity: 0, y: 24}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={viewport}
                        transition={{duration: 0.6, ease: EASE, delay: 0.15}}
                    >
                        <h3 className="footer-section-title">{t('footer.navigation')}</h3>
                        <nav className="footer-nav">
                            {NAV_LINKS.map((link) => (<FooterLink
                                    key={link.id}
                                    href={link.href}
                                    label={t(link.key)}
                                />))}
                        </nav>
                    </motion.div>

                    <motion.div
                        className="footer-section"
                        initial={{opacity: 0, y: 24}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={viewport}
                        transition={{duration: 0.6, ease: EASE, delay: 0.25}}
                    >
                        <h3 className="footer-section-title">{t('footer.quickLinks')}</h3>
                        <nav className="footer-nav">
                            {quickLinks.map((link) => (<FooterLink
                                    key={link.id}
                                    href={link.href}
                                    label={link.label}
                                    onClick={link.onClick}
                                />))}
                        </nav>
                    </motion.div>

                    <motion.div
                        className="footer-section"
                        initial={{opacity: 0, y: 24}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={viewport}
                        transition={{duration: 0.6, ease: EASE, delay: 0.35}}
                    >
                        <h3 className="footer-section-title">{t('footer.contact')}</h3>
                        <ContactInfo/>
                    </motion.div>
                </motion.div>

                <div className="footer-divider">
                    <div className="footer-divider-line"></div>
                </div>

                <motion.div
                    className="footer-bottom"
                    initial={{opacity: 0, y: 24}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={viewport}
                    transition={{duration: 0.6, ease: EASE, delay: 0.4}}
                >
                    <div className="footer-bottom-content">
                        <p className="footer-copyright">
                            © {currentYear} Jhosep Argomedo. {t('footer.rights')}
                        </p>
                        <SocialLinks/>
                    </div>
                </motion.div>

                <motion.button
                    className="scroll-to-top"
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    aria-label="Scroll to top"
                    whileHover={{x: -2, y: -2}}
                    whileTap={{scale: 0.9}}
                >
                    <Icon icon="mdi:chevron-up" width="24"/>
                </motion.button>
            </div>
        </footer>);
};

export default Footer;