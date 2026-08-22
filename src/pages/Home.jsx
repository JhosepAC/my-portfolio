import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {motion, useScroll, useTransform, useSpring, useReducedMotion} from 'motion/react';
import {Rocket, ChevronDown} from 'lucide-react';
import {SOCIAL_LINKS} from '../utils/constants';
import {EASE} from '../utils/motionVariants';
import {useAppReady} from '../context/AppReadyContext';
import Terminal from '../components/common/Terminal';
import SocialButton from '../components/common/social-btn/SocialButton';
import DownloadButton from '../components/common/download-btn/DownloadButton';
import MagneticButton from '../components/common/motion/MagneticButton';
import SkillsSection from "../components/skills/SkillsSection.jsx";
import '../styles/Home.css';
import Footer from "../components/footer/Footer.jsx";
import ContactSection from "../components/contact/ContactSection.jsx";
import EducationSection from "../components/education/EducationSection.jsx";
import ExperienceSection from "../components/experience/ExperienceSection.jsx";
import ProjectsSection from "../components/projects/ProjectsSection.jsx";

/**
 * Home Page Component
 * Main landing page containing the Hero section and Skills.
 */
const Home = () => {
    const {t, i18n} = useTranslation();
    const ready = useAppReady();
    const heroRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const {scrollYProgress} = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const titleY = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 60]),
        {stiffness: 120, damping: 20}
    );
    const visualY = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -50]),
        {stiffness: 120, damping: 20}
    );
    const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    useEffect(() => {
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
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
            <section id="home" className="hero-section" ref={heroRef}>
                <motion.div className="hero-content">
                    {/* Availability Badge */}
                    <motion.div
                        className="status-badge"
                        initial={{opacity: 0, y: 24}}
                        animate={ready ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.6, ease: EASE, delay: 0.1}}
                    >
                        <span className="status-dot"/>
                        <span className="status-text">{t('hero.status')}</span>
                    </motion.div>

                    <motion.div style={{y: titleY}}>
                        <motion.header
                            className="hero-title"
                            initial={{opacity: 0, y: 24}}
                            animate={ready ? {opacity: 1, y: 0} : {}}
                            transition={{duration: 0.6, ease: EASE, delay: 0.25}}
                        >
                            <span className="title-line">{t('hero.greeting')}</span>
                            <span className="title-name">Jhosep Argomedo</span>
                        </motion.header>
                    </motion.div>

                    <motion.div
                        className="hero-subtitle"
                        initial={{opacity: 0, y: 24}}
                        animate={ready ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.6, ease: EASE, delay: 0.45}}
                    >
                        <p className="subtitle-line">{t('hero.subtitle1')}</p>
                        <p className="subtitle-line">{t('hero.subtitle2')}</p>
                    </motion.div>

                    <motion.div
                        className="hero-actions"
                        initial={{opacity: 0, y: 24}}
                        animate={ready ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.6, ease: EASE, delay: 0.6}}
                    >
                        <MagneticButton>
                            <a href="#projects" className="btn-primary">
                                <Rocket size={18} className="btn-primary-icon" />
                                {t('nav.projects')}
                            </a>
                        </MagneticButton>

                        <div className="hero-actions-secondary">
                            <MagneticButton>
                                <DownloadButton label="CV"/>
                            </MagneticButton>

                            {SOCIAL_LINKS.filter(link => ['github', 'linkedin'].includes(link.id)).map((link) => (
                                <MagneticButton key={link.id}>
                                    <SocialButton
                                        icon={link.id}
                                        url={link.url}
                                        ariaLabel={link.name}
                                    />
                                </MagneticButton>))}
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    initial={{opacity: 0, x: 50}}
                    animate={ready ? {opacity: 1, x: 0} : {}}
                    transition={{duration: 0.8, ease: EASE, delay: 0.5}}
                >
                    <motion.div style={{y: visualY}}>
                        <Terminal key={i18n.language} />
                    </motion.div>
                </motion.div>

                <motion.a
                    href="#skills"
                    className="scroll-indicator"
                    aria-label="Scroll down"
                    style={{opacity: indicatorOpacity}}
                >
                    <span>Scroll</span>
                    <ChevronDown size={16} className="scroll-indicator-icon" aria-hidden="true" />
                </motion.a>
            </section>

            <SkillsSection/>

            <ProjectsSection/>

            <EducationSection/>

            <ExperienceSection/>

            <ContactSection/>
        </div>

        <Footer/>
    </>);
};

export default Home;