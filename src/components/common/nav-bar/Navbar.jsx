import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useScroll } from '../../../hooks/useScroll';
import { EASE } from '../../../utils/motionVariants';
import { useAppReady } from '../../../context/AppReadyContext';
import logo from '../../../assets/logo/logo-light.svg';
import { NAV_LINKS } from "../../../utils/constants.js";
import './Navbar.css';
import { useActiveSection } from '../../../hooks/useActiveSection';

const Navbar = ({ theme, toggleTheme }) => {
    const scrolled = useScroll(20);
    const ready = useAppReady();
    const { i18n, t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const sectionIds = NAV_LINKS.map(link => link.id);
    const activeSection = useActiveSection(sectionIds);
    const [hoveredId, setHoveredId] = useState(null);

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

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="navbar-container">
                <motion.div
                    className="navbar-logo"
                    initial={{opacity: 0, x: -30}}
                    animate={ready ? {opacity: 1, x: 0} : {}}
                    transition={{duration: 0.6, ease: EASE}}
                >
                    <img src={logo} alt="Jhosep Logo" className="logo-image" />
                </motion.div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="menu-overlay"
                            onClick={closeMenu}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.25, ease: EASE}}
                        />
                    )}
                </AnimatePresence>

                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`} onMouseLeave={() => setHoveredId(null)}>
                    {NAV_LINKS.map(({ id, key }, index) => {
                        const isActive = activeSection === id;
                        const isHovered = hoveredId === id;
                        const showIndicator = hoveredId ? isHovered : isActive;
                        return (
                        <motion.li
                            key={id}
                            className="navbar-item"
                            initial={{opacity: 0, y: -20}}
                            animate={ready ? {opacity: 1, y: 0} : {}}
                            transition={{duration: 0.5, ease: EASE, delay: 0.1 + index * 0.08}}
                            onMouseEnter={() => setHoveredId(id)}
                        >
                            <a
                                href={`#${id}`}
                                className={`navbar-link ${isActive ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                {t(key)}
                                {showIndicator && (
                                    <motion.span
                                        className="navbar-indicator"
                                        layoutId="nav-indicator"
                                        transition={{type: 'spring', stiffness: 400, damping: 30}}
                                    />
                                )}
                            </a>
                        </motion.li>
                        );
                    })}

                    <li className="mobile-actions">
                        <button onClick={toggleLanguage} className="lang-button">
                            <Globe size={18}/>
                            <span>{i18n.language.toUpperCase()}</span>
                        </button>
                    </li>
                </ul>

                <div className="navbar-actions">
                    <motion.button
                        onClick={toggleLanguage}
                        className="lang-button desktop-only"
                        aria-label="Language"
                        initial={{opacity: 0, x: 30}}
                        animate={ready ? {opacity: 1, x: 0} : {}}
                        transition={{duration: 0.6, ease: EASE, delay: 0.4}}
                    >
                        <Globe size={18}/>
                        <span className="lang-text">{i18n.language.toUpperCase()}</span>
                    </motion.button>

                    {/*
                    <button onClick={toggleTheme} className="icon-button" aria-label="Theme">
                        {theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}
                    </button>
                    */}

                    <motion.button
                        className="menu-toggle"
                        onClick={toggleMenu}
                        aria-label="Menu"
                        initial={{opacity: 0}}
                        animate={ready ? {opacity: 1} : {}}
                        transition={{duration: 0.6, ease: EASE, delay: 0.5}}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;