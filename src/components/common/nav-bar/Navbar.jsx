import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useScroll } from '../../../hooks/useScroll';
import { EASE } from '../../../utils/motionVariants';
import { useAppReady } from '../../../context/AppReadyContext';
import { useThemeContext } from '../../../context/ThemeContext';
import { NAV_LINKS } from "../../../utils/constants.js";
import './Navbar.css';
import { useActiveSection } from '../../../hooks/useActiveSection';
import { Link, useLocation } from 'react-router-dom';
import useIsMobile from '../../../hooks/useIsMobile';

const TerminalLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="logo-svg" aria-hidden="true" focusable="false" width="45" height="45">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12">
            <path d="M 8 18 L 48 50 L 8 82" />
            <path d="M 58 82 L 92 82" className="logo-caret" />
        </g>
    </svg>
);

const Navbar = () => {
    const { pathname } = useLocation();
    const isCasePage = pathname !== '/';
    const isMobile = useIsMobile(900);
    const reduced = useReducedMotion();
    const menuButtonRef = useRef(null);
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

    const handleMenuKeyboard = event => {
        if (!isMobile || !isMenuOpen) return;
        if (event.key === 'Escape') {
            closeMenu();
            menuButtonRef.current?.focus();
        }
        if (event.key === 'Tab') {
            const controls = [...event.currentTarget.querySelectorAll('.navbar-menu a, .navbar-menu button, .menu-toggle')];
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first?.focus();
            }
        }
    };

    const toggleLanguage = () => {
        const currentLang = i18n.language.split('-')[0];
        const newLang = currentLang === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    useEffect(() => {
        if (!isMenuOpen || !isMobile) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previous; };
    }, [isMenuOpen, isMobile]);

    useEffect(() => () => document.documentElement.style.removeProperty('--banner-height'), []);

    // El banner es permanente y fijo arriba. Se mide su altura real
    // (puede envolverse a 2 líneas en móvil) y se expone como
    // `--banner-height` para desplazar el navbar fijo debajo de él.
    useEffect(() => {
        const bannerEl = document.querySelector('.availability-banner');
        if (!bannerEl) return;

        const updateHeight = () => {
            document.documentElement.style.setProperty(
                '--banner-height',
                `${bannerEl.offsetHeight}px`
            );
        };

        updateHeight();

        let observer = null;
        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(updateHeight);
            observer.observe(bannerEl);
        }
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
            observer?.disconnect();
        };
    }, [i18n.language]);

    const handleBannerContactClick = (e) => {
        if (isCasePage) return;
        e.preventDefault();
        const target = document.querySelector('#contact');
        if (target) {
            const navbarEl = document.querySelector('.navbar');
            const bannerEl = document.querySelector('.availability-banner');
            const offset = (navbarEl?.offsetHeight ?? 80) + (bannerEl?.offsetHeight ?? 0) + 12;
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
    };

    return (
        <>
            <div className={`availability-banner ${isCasePage ? 'availability-banner--case' : ''}`}>
                <div className="availability-banner-content">
                    <span className="availability-banner-text">{t('nav.availabilityBanner')}</span>
                    <Link to="/#contact" className="availability-banner-link" onClick={handleBannerContactClick}>
                        <span>{t('nav.availabilityAction')}</span>
                        <ArrowUpRight size={13} />
                    </Link>
                </div>
            </div>
            <motion.nav layout={!reduced && !isMobile} layoutRoot transition={{ layout: { duration: 0.28, ease: EASE } }} className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''} ${isCasePage ? 'navbar--case' : ''}`} aria-label={t('footer.navigation')} onKeyDown={handleMenuKeyboard}>

            <div className="navbar-container">
                <motion.div
                    className="navbar-logo"
                    initial={{opacity: 0, x: -12}}
                    animate={ready ? {opacity: 1, x: 0} : {}}
                    transition={{duration: 0.32, ease: EASE}}
                    aria-label="Jhosep Logo"
                    role="img"
                >
                    <Link to="/" aria-label={t('nav.home')} onClick={closeMenu} style={{ color: 'inherit' }}><TerminalLogo /></Link>
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

                <ul id="portfolio-navigation" className={`navbar-menu ${isMenuOpen ? 'active' : ''}`} inert={isMobile && !isMenuOpen ? true : undefined} onMouseLeave={() => setHoveredId(null)}>
                    {NAV_LINKS.map(({ id, key }, index) => {
                        const isActive = isCasePage ? id === 'projects' : activeSection === id;
                        const isHovered = hoveredId === id;
                        const showIndicator = hoveredId ? isHovered : isActive;
                        return (
                        <motion.li
                            key={id}
                            className="navbar-item"
                            initial={{opacity: 0, y: -10}}
                            animate={ready ? {opacity: 1, y: 0} : {}}
                            transition={{duration: 0.28, ease: EASE, delay: 0.03 + index * 0.045}}
                            onMouseEnter={() => setHoveredId(id)}
                        >
                            <Link
                                to={`/#${id}`}
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
                            </Link>
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
                        initial={{opacity: 0, x: 12}}
                        animate={ready ? {opacity: 1, x: 0} : {}}
                        transition={{duration: 0.32, ease: EASE, delay: 0.12}}
                    >
                        {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
                    </motion.button>
                    <motion.button
                        onClick={toggleLanguage}
                        className="lang-button desktop-only"
                        aria-label="Language"
                        initial={{opacity: 0, x: 12}}
                        animate={ready ? {opacity: 1, x: 0} : {}}
                        transition={{duration: 0.32, ease: EASE, delay: 0.15}}
                    >
                        <Globe size={18}/>
                        <span className="lang-text">{i18n.language.toUpperCase()}</span>
                    </motion.button>

                    <motion.button
                        className="menu-toggle"
                        ref={menuButtonRef}
                        onClick={toggleMenu}
                        aria-label="Menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="portfolio-navigation"
                        initial={{opacity: 0}}
                        animate={ready ? {opacity: 1} : {}}
                        transition={{duration: 0.32, ease: EASE, delay: 0.08}}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>
        </motion.nav>
        </>
    );
};

export default Navbar;
