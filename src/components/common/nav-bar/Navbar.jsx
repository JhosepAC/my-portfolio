import {useTranslation} from 'react-i18next';
import {Globe, Moon, Sun} from 'lucide-react';
import {useScroll} from '../../../hooks/useScroll';
import logo from '../../../assets/logo/elephant-logo.svg';
import './Navbar.css';
import {NAV_LINKS} from "../../../utils/constants.js";

const Navbar = ({theme, toggleTheme}) => {
    const scrolled = useScroll(20);
    const {i18n, t} = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src={logo} alt="Jhosep Logo" className="logo-image"/>
                </div>

                <ul className="navbar-menu">
                    {NAV_LINKS.map(({id, key}) => (
                        <li key={id} className="navbar-item">
                            <a href={`#${id}`} className="navbar-link">
                                {t(key)}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="navbar-actions">
                    <button
                        onClick={toggleLanguage}
                        className="lang-button"
                        aria-label={t('nav.change-language')}
                    >
                        <Globe size={18}/>
                        <span className="lang-text">{i18n.language.toUpperCase()}</span>
                    </button>

                    <button
                        onClick={toggleTheme}
                        className="icon-button"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;