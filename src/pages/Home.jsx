import { useEffect, useRef } from 'react';
import SocialButton from '../components/common/social-btn/SocialButton';
import DownloadButton from '../components/common/download-btn/DownloadButton';
import '../styles/Home.css';

const Home = () => {
    const splineRef = useRef(null);

    useEffect(() => {

    }, []);

    return (
        <div className="home-container">
            {/* Animated background particles */}
            <div className="particles">
                {[...Array(50)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${5 + Math.random() * 10}s`
                    }}></div>
                ))}
            </div>

            <div className="hero-section">
                <div className="hero-content">
                    <div className="status-badge">
                        <span className="status-dot"></span>
                        <span className="status-text">DISPONIBLE</span>
                    </div>

                    <h1 className="hero-title">
                        <span className="title-line">Mi nombre es</span>
                        <span className="title-name">Jhosep Argomedo</span>
                    </h1>

                    <div className="hero-subtitle">
                        <p className="subtitle-line">Estudiante de Ingeniería de Software - UPC</p>
                        <p className="subtitle-line">Desarrollador Web</p>
                    </div>

                    <div className="hero-actions">
                        <DownloadButton label="CV" />
                        <SocialButton
                            icon="github"
                            url="https://github.com/JhosepAC"
                            ariaLabel="GitHub"
                        />
                        <SocialButton
                            icon="linkedin"
                            url="https://linkedin.com/in/jhosep-ac"
                            ariaLabel="LinkedIn"
                        />
                    </div>

                    {/* Decorative elements */}
                    <div className="glow-orb glow-orb-1"></div>
                    <div className="glow-orb glow-orb-2"></div>
                </div>

                <div className="hero-visual">
                    <div className="spline-container" ref={splineRef}>
                        <spline-viewer url="https://prod.spline.design/j2WcXrE2Kwhzaclj/scene.splinecode"></spline-viewer>
                    </div>
                    <div className="visual-glow"></div>
                </div>
            </div>
        </div>
    );
};

export default Home;