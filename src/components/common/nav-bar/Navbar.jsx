import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { i18n } = useTranslation(); // for language change
    const { t } = useTranslation(); // for translations

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="src/assets/logo/elephant-logo.svg" alt="Logo" className="logo-image" />
                </div>

                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <a href="#home" className="navbar-link">{t('nav.home')}</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#skills" className="navbar-link">{t('nav.skills')}</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#projects" className="navbar-link">{t('nav.projects')}</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#education" className="navbar-link">{t('nav.education')}</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#contact" className="navbar-link">{t('nav.contact-me')}</a>
                    </li>
                </ul>

                <div className="navbar-actions">
                    <button onClick={toggleLanguage} className="lang-button">
                        <Globe size={20} />
                        <span>{i18n.language.toUpperCase()}</span>
                    </button>
                    <button className="icon-button" aria-label="Toggle theme">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;