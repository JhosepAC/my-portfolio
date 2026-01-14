import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {SOCIAL_LINKS} from '../utils/constants';
import SocialButton from '../components/common/social-btn/SocialButton';
import DownloadButton from '../components/common/download-btn/DownloadButton';
import SkillsSection from "../components/skills/SkillsSection.jsx";
import '../styles/Home.css';
import Footer from "../components/footer/Footer.jsx";
import ContactSection from "../components/contact/ContactSection.jsx";
import EducationSection from "../components/education/EducationSection.jsx";

/**
 * Home Page Component
 * Main landing page containing the Hero section and Skills.
 */
const Home = () => {
    const splineRef = useRef(null);
    const {t} = useTranslation();

    // Reset scroll on mount
    useEffect(() => {
        window.scrollTo(0, 0);
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
            {/*  Animated background particles */}
            <div className="particles" aria-hidden="true">
                {[...Array(30)].map((_, i) => (<div
                    key={`particle-${i}`}
                    className="particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${10 + Math.random() * 10}s`
                    }}
                />))}
            </div>

            <section id="home" className="hero-section">
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
                        <DownloadButton label="CV"/>

                        {/* Dynamic Social Buttons using constants */}
                        {SOCIAL_LINKS.filter(link => ['github', 'linkedin'].includes(link.id)).map((link) => (
                            <SocialButton
                                key={link.id}
                                icon={link.id}
                                url={link.url}
                                ariaLabel={link.name}
                            />))}
                    </div>

                    {/* Decorative elements */}
                    <div className="glow-orb glow-orb-1" aria-hidden="true"/>
                    <div className="glow-orb glow-orb-2" aria-hidden="true"/>
                </div>

                {/* 3D Visual Section */}
                <div className="hero-visual">
                    <div className="spline-container" ref={splineRef}>
                        <spline-viewer
                            url="https://prod.spline.design/7ZNE2gWre9KI23Tp/scene.splinecode"
                            events-target="global"
                            interactivity="none"
                            loading-anim-type="spinner-small-dark"
                        />
                    </div>
                    <div className="visual-glow" aria-hidden="true"/>
                </div>
            </section>

            <SkillsSection/>

            <EducationSection/>

            <ContactSection/>
        </div>

        <Footer/>
    </>);
};

export default Home;