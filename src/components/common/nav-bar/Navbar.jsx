import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useScroll } from '../../../hooks/useScroll';
import { EASE } from '../../../utils/motionVariants';
import { useAppReady } from '../../../context/AppReadyContext';
import { useThemeContext } from '../../../context/ThemeContext';
import { NAV_LINKS } from "../../../utils/constants.js";
import './Navbar.css';
import { useActiveSection } from '../../../hooks/useActiveSection';

const TerminalLogo = () => {
    const [showUnderscore, setShowUnderscore] = useState(true);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let flickerInterval = null;
        let cycleInterval = null;
        let firstTimeout = null;

        const startFlickerBurst = () => {
            let elapsed = 0;
            // Cada 0.5s alterna entre logo-light.svg (con _) y logo-light-effect.svg (sin _)
            if (flickerInterval) clearInterval(flickerInterval);
            flickerInterval = setInterval(() => {
                setShowUnderscore((prev) => !prev);
                elapsed += 500;
                if (elapsed >= 3000) {
                    clearInterval(flickerInterval);
                    flickerInterval = null;
                    // Al terminar la ráfaga vuelve a estado estable logo-light.svg
                    setShowUnderscore(true);
                }
            }, 500);
        };

        // Primera ráfaga visible pronto (1.8s) para que el efecto se perciba, luego cada 8s
        firstTimeout = setTimeout(() => {
            startFlickerBurst();
            cycleInterval = setInterval(startFlickerBurst, 8000);
        }, 1800);

        return () => {
            clearTimeout(firstTimeout);
            clearInterval(cycleInterval);
            if (flickerInterval) clearInterval(flickerInterval);
        };
    }, []);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="logo-svg"
            aria-hidden="true"
            focusable="false"
            width="45"
            height="45"
        >
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12">
                {/* Mismo path que logo-light.svg y logo-light-effect.svg */}
                <path d="M 8 18 L 48 50 L 8 82" />
                {/* Underscore terminal: solo en logo-light.svg — ráfaga 500ms x 3s cada 8s */}
                <motion.path
                    d="M 58 82 L 92 82"
                    initial={false}
                    animate={{ opacity: showUnderscore ? 1 : 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                />
            </g>
        </svg>
    );
};

const Navbar = () => {
    const scrolled = useScroll(20);
    const ready = useAppReady();
    const { theme, toggleTheme } = useThemeContext();
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
                    aria-label="Jhosep Logo"
                    role="img"
                >
                    <TerminalLogo />
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
                        <div className="mobile-actions-group">
                            <button onClick={toggleLanguage} className="lang-button">
                                <Globe size={18}/>
                                <span>{i18n.language.toUpperCase()}</span>
                            </button>
                            <button onClick={toggleTheme} className="theme-button" aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}>
                                {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
                            </button>
                        </div>
                    </li>
                </ul>

                <div className="navbar-actions">
                    <motion.button
                        onClick={toggleTheme}
                        className="theme-button desktop-only"
                        aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
                        initial={{opacity: 0, x: 30}}
                        animate={ready ? {opacity: 1, x: 0} : {}}
                        transition={{duration: 0.6, ease: EASE, delay: 0.35}}
                    >
                        {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
                    </motion.button>
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