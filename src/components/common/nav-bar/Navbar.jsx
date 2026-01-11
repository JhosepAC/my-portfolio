import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Moon, Sun, Menu, X } from 'lucide-react';
import { useScroll } from '../../../hooks/useScroll';
import logo from '../../../assets/logo/elephant-logo.svg';
import { NAV_LINKS } from "../../../utils/constants.js";
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
    const scrolled = useScroll(20);
    const { i18n, t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src={logo} alt="Jhosep Logo" className="logo-image" />
                </div>

                {isMenuOpen && <div className="menu-overlay" onClick={closeMenu} />}

                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    {NAV_LINKS.map(({ id, key }) => (
                        <li key={id} className="navbar-item">
                            <a
                                href={`#${id}`}
                                className="navbar-link"
                                onClick={closeMenu}
                            >
                                {t(key)}
                            </a>
                        </li>
                    ))}

                    <li className="mobile-actions">
                        <button onClick={toggleLanguage} className="lang-button">
                            <Globe size={18}/>
                            <span>{i18n.language.toUpperCase()}</span>
                        </button>
                    </li>
                </ul>

                <div className="navbar-actions">
                    <button onClick={toggleLanguage} className="lang-button desktop-only" aria-label="Language">
                        <Globe size={18}/>
                        <span className="lang-text">{i18n.language.toUpperCase()}</span>
                    </button>

                    <button onClick={toggleTheme} className="icon-button" aria-label="Theme">
                        {theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}
                    </button>

                    <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;