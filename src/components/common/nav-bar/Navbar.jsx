import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X } from 'lucide-react';
import { useScroll } from '../../../hooks/useScroll';
import logo from '../../../assets/logo/jhosepac-logo.svg';
import { NAV_LINKS } from "../../../utils/constants.js";
import './Navbar.css';
import { useActiveSection } from '../../../hooks/useActiveSection';

const Navbar = ({ theme, toggleTheme }) => {
    const scrolled = useScroll(20);
    const { i18n, t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const sectionIds = NAV_LINKS.map(link => link.id);
    const activeSection = useActiveSection(sectionIds);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const toggleLanguage = () => {
        const currentLang = i18n.language.split('-')[0];
        const newLang = currentLang === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navbarMenuRef = useRef(null);
    const linkRefs = useRef({});
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    const updateIndicator = useCallback((targetId) => {
        const linkEl = linkRefs.current[targetId];
        const menuEl = navbarMenuRef.current;
        if (linkEl && menuEl) {
            const menuRect = menuEl.getBoundingClientRect();
            const linkRect = linkEl.getBoundingClientRect();
            setIndicatorStyle({
                left: linkRect.left - menuRect.left,
                width: linkRect.width,
            });
        }
    }, []);

    useEffect(() => {
        if (activeSection) {
            updateIndicator(activeSection);
        }
    }, [activeSection, updateIndicator]);

    useEffect(() => {
        const handleResize = () => {
            if (activeSection) {
                updateIndicator(activeSection);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeSection, updateIndicator]);

    const handleMouseEnter = (id) => {
        updateIndicator(id);
    };

    const handleMouseLeave = () => {
        if (activeSection) {
            updateIndicator(activeSection);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src={logo} alt="Jhosep Logo" className="logo-image" />
                </div>

                {isMenuOpen && <div className="menu-overlay" onClick={closeMenu} />}

                <ul
                    className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}
                    ref={navbarMenuRef}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="navbar-indicator" style={indicatorStyle} />
                    {NAV_LINKS.map(({ id, key }) => (
                        <li key={id} className="navbar-item">
                            <a
                                ref={(el) => linkRefs.current[id] = el}
                                href={`#${id}`}
                                className={`navbar-link ${activeSection === id ? 'active' : ''}`}
                                onClick={closeMenu}
                                onMouseEnter={() => handleMouseEnter(id)}
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

                    {/*
                    <button onClick={toggleTheme} className="icon-button" aria-label="Theme">
                        {theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}
                    </button>
                    */}

                    <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;