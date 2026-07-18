import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Rocket, ChevronDown} from 'lucide-react';
import {SOCIAL_LINKS} from '../utils/constants';
import Terminal from '../components/common/Terminal';
import SocialButton from '../components/common/social-btn/SocialButton';
import DownloadButton from '../components/common/download-btn/DownloadButton';
import SkillsSection from "../components/skills/SkillsSection.jsx";
import SectionOrbs from "../components/common/orbs/SectionOrbs.jsx";
import '../styles/Home.css';
import Footer from "../components/footer/Footer.jsx";
import ContactSection from "../components/contact/ContactSection.jsx";
import EducationSection from "../components/education/EducationSection.jsx";
import ProjectsSection from "../components/projects/ProjectsSection.jsx";

/**
 * Home Page Component
 * Main landing page containing the Hero section and Skills.
 */
const Home = () => {
    const {t, i18n} = useTranslation();

    // Reset scroll on mount
    useEffect(() => {
        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
        }, 50);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Smooth scroll handler
        const handleSmoothScroll = (e) => {
            const href = e.currentTarget.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth', block: 'start'
                    });
                }
            }
        };

        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', handleSmoothScroll);
        });

        return () => {
            links.forEach(link => {
                link.removeEventListener('click', handleSmoothScroll);
            });
        };
    }, []);

    return (<>
        <div className="home-container">
            <section id="home" className="hero-section">
                <SectionOrbs sectionId="home" />
                <div className="hero-content">
                    {/* Availability Badge */}
                    <div className="status-badge">
                        <span className="status-dot"/>
                        <span className="status-text">{t('hero.status')}</span>
                    </div>

                    <header>
                        <h1 className="hero-title">
                            <span className="title-line">{t('hero.greeting')}</span>
                            <span className="title-name">Jhosep Argomedo</span>
                        </h1>

                        <div className="hero-subtitle">
                            <p className="subtitle-line">{t('hero.subtitle1')}</p>
                            <p className="subtitle-line">{t('hero.subtitle2')}</p>
                        </div>
                    </header>

                    <div className="hero-actions">
                        <a href="#projects" className="btn-primary">
                            <Rocket size={18} className="btn-primary-icon" />
                            {t('nav.projects')}
                        </a>

                        <div className="hero-actions-secondary">
                            <DownloadButton label="CV"/>

                            {SOCIAL_LINKS.filter(link => ['github', 'linkedin'].includes(link.id)).map((link) => (
                                <SocialButton
                                    key={link.id}
                                    icon={link.id}
                                    url={link.url}
                                    ariaLabel={link.name}
                                />))}
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <Terminal key={i18n.language} />
                </div>
                <a href="#skills" className="scroll-indicator" aria-label="Scroll down">
                    <ChevronDown size={24} />
                </a>
            </section>

            <SkillsSection/>

            <ProjectsSection/>

            <EducationSection/>

            <ContactSection/>
        </div>

        <Footer/>
    </>);
};

export default Home;