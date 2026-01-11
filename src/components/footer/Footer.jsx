import { useTranslation } from 'react-i18next';
import FooterLink from './FooterLink';
import SocialLinks from './SocialLinks';
import ContactInfo from './ContactInfo';
import './Footer.css';
import logo from '../../assets/logo/elephant-logo.svg';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const navigationLinks = [
        { id: 'home', label: t('nav.home'), href: '#home' },
        { id: 'skills', label: t('nav.skills'), href: '#skills' },
        { id: 'projects', label: t('nav.projects'), href: '#projects' },
        { id: 'education', label: t('nav.education'), href: '#education' },
        { id: 'contact', label: t('nav.contact-me'), href: '#contact' }
    ];

    const quickLinks = [
        { id: 'resume', label: t('footer.resume'), href: '/cv' },
    ];

    return (
        <footer className="footer">
            {/* Animated background elements */}
            <div className="footer-bg">
                <div className="footer-grid"></div>
                <div className="footer-orb footer-orb-1"></div>
                <div className="footer-orb footer-orb-2"></div>
                <div className="footer-orb footer-orb-3"></div>
            </div>

            <div className="footer-container">
                {/* Main Footer Content */}
                <div className="footer-content">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img src={logo} alt="Jhosep Logo" className="logo-image"/>
                            <span className="footer-logo-text">Jhosep Argomedo</span>
                        </div>
                        <p className="footer-tagline">
                            {t('footer.tagline')}
                        </p>
                        <div className="footer-status">
                            <span className="footer-status-dot"></span>
                            <span className="footer-status-text">{t('footer.available')}</span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="footer-section">
                        <h3 className="footer-section-title">{t('footer.navigation')}</h3>
                        <nav className="footer-nav">
                            {navigationLinks.map((link, index) => (
                                <FooterLink
                                    key={link.id}
                                    href={link.href}
                                    label={link.label}
                                    delay={index * 0.05}
                                />
                            ))}
                        </nav>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3 className="footer-section-title">{t('footer.quickLinks')}</h3>
                        <nav className="footer-nav">
                            {quickLinks.map((link, index) => (
                                <FooterLink
                                    key={link.id}
                                    href={link.href}
                                    label={link.label}
                                    delay={index * 0.05}
                                />
                            ))}
                        </nav>
                    </div>

                    {/* Contact Section */}
                    <div className="footer-section">
                        <h3 className="footer-section-title">{t('footer.contact')}</h3>
                        <ContactInfo />
                    </div>
                </div>

                {/* Divider with gradient */}
                <div className="footer-divider">
                    <div className="footer-divider-line"></div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p className="footer-copyright">
                            © {currentYear} Jhosep Argomedo. {t('footer.rights')}
                        </p>
                        <SocialLinks />
                        <div className="footer-meta">
              <span className="footer-meta-item">
                {t('footer.madeWith')}
                  <span className="footer-heart">❤️</span>
                  {t('footer.in')} Perú
              </span>
                        </div>
                    </div>
                </div>

                {/* Scroll to top button */}
                <button
                    className="scroll-to-top"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Scroll to top"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 15l-6-6-6 6"/>
                    </svg>
                </button>
            </div>
        </footer>
    );
};

export default Footer;