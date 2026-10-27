import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowUp, ArrowUpRight, Check, Copy, Download } from 'lucide-react';
import { CONTACT_DATA, NAV_LINKS, SOCIAL_ICONS, SOCIAL_LINKS, getLocalizedCv } from '../../utils/constants';
import { reveal } from '../../utils/motionVariants';
import logo from '../../assets/logo/logo-dark.svg';
import './Footer.css';

const email = CONTACT_DATA.find(item => item.id === 'email');
const phone = CONTACT_DATA.find(item => item.id === 'phone');
const profiles = SOCIAL_LINKS.filter(item => item.id !== 'email');

export default function Footer() {
    const { t, i18n } = useTranslation();
    const reduceMotion = useReducedMotion();
    const cv = getLocalizedCv(i18n.language);
    const [copyStatus, setCopyStatus] = useState('');
    const copyTimer = useRef(null);
    useEffect(() => () => clearTimeout(copyTimer.current), []);

    const copyEmail = async () => {
        clearTimeout(copyTimer.current);
        try {
            await navigator.clipboard.writeText(email.value);
            setCopyStatus('copied');
        } catch {
            setCopyStatus('copyFailed');
        }
        copyTimer.current = setTimeout(() => setCopyStatus(''), 3000);
    };

    return <footer className="footer">
        <div className="footer-container">
            <div className="footer-main">
                <motion.div className="footer-signature" {...reveal(reduceMotion, { distance: 12 })}>
                    <a href="#home" className="footer-brand-link">
                        <img src={logo} width="32" height="32" alt="" loading="lazy" />
                        <span>Jhosep Argomedo</span>
                    </a>
                    <p className="footer-role">{t('footer.role')}</p>
                    <p className="footer-location">{t('footer.location')}</p>
                    <p className="footer-availability">{t('footer.available')}</p>
                </motion.div>

                <motion.div className="footer-direct" {...reveal(reduceMotion, { distance: 12, delay: 0.055 })}>
                    <h2 className="footer-heading">{t('footer.directContact')}</h2>
                    <div className="footer-email-row">
                        <a className="footer-email" href={email.href}>{email.value}</a>
                        <button type="button" className="footer-copy" onClick={copyEmail}
                            aria-label={t('footer.copyEmail')} title={t('footer.copyEmail')}>
                            {copyStatus === 'copied' ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                        </button>
                    </div>
                    <a className="footer-phone" href={phone.href}>{phone.value}</a>
                    <p className="footer-copy-status" role="status">{copyStatus ? t('footer.' + copyStatus) : ''}</p>
                </motion.div>

                <motion.div className="footer-resources" {...reveal(reduceMotion, { distance: 12, delay: 0.11 })}>
                    <h2 className="footer-heading">{t('footer.resume')}</h2>
                    <a className="footer-cv" href={cv.path} download={cv.name}>
                        <span>{t('footer.downloadCv')} <span className="footer-cv-format">PDF / {i18n.language.startsWith('es') ? 'ES' : 'EN'}</span></span>
                        <Download size={19} aria-hidden="true" />
                    </a>
                    <div className="footer-text-resources">
                        <a href="/cv.md" target="_blank" rel="noopener noreferrer">CV Markdown <ArrowUpRight size={14} aria-hidden="true" /></a>
                        <a href="/llms.txt" target="_blank" rel="noopener noreferrer">llms.txt <ArrowUpRight size={14} aria-hidden="true" /></a>
                    </div>
                </motion.div>
            </div>

            <motion.div className="footer-navigation-row" {...reveal(reduceMotion, { distance: 8 })}>
                <nav className="footer-navigation" aria-label={t('footer.navigationLabel')}>
                    {NAV_LINKS.map(link => <a key={link.id} href={link.href}>{t(link.key)}</a>)}
                </nav>
                <button type="button" className="footer-back-top" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })}>
                    {t('footer.backToTop')} <ArrowUp size={16} aria-hidden="true" />
                </button>
            </motion.div>
            <motion.div className="footer-bottom" {...reveal(reduceMotion, { distance: 0 })}>
                <p className="footer-copyright">© {new Date().getFullYear()} Jhosep Argomedo</p>
                <nav className="footer-profiles" aria-label={t('footer.profilesLabel')}>
                    {profiles.map(profile => <a key={profile.id} href={profile.url} target="_blank" rel="noopener noreferrer"
                        aria-label={profile.handle ? `${profile.name}: ${profile.handle}` : profile.name}
                        title={profile.handle ? `${profile.name}: ${profile.handle}` : profile.name}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
                            <path d={SOCIAL_ICONS[profile.id]} />
                        </svg>
                    </a>)}
                </nav>
            </motion.div>
        </div>
    </footer>;
}
