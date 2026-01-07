import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Home = () => {
    const containerStyle = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: '#0a0a0c',
        color: '#f8fafc'
    };

    const badgeStyle = {
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.3rem',
        color: '#c1101a',
        marginBottom: '1rem',
        opacity: 0.8
    };

    const titleStyle = {
        fontSize: 'clamp(2.5rem, 10vw, 5rem)',
        fontWeight: '800',
        margin: '0',
        letterSpacing: '-0.03em',
        lineHeight: '1'
    };

    const socialContainerStyle = {
        marginTop: '2.5rem',
        display: 'flex',
        gap: '2.5rem',
    };

    const iconStyle = {
        fontSize: '1.8rem',
        color: '#f8fafc',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    };

    return (
        <main style={containerStyle} className="fade-in">
            <span style={badgeStyle}>Próximamente</span>
            <h1 style={titleStyle}>Jhosep Argomedo</h1>

            <div style={socialContainerStyle}>
                <a
                    href="https://github.com/JhosepAC"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                >
                    <FontAwesomeIcon
                        icon={faGithub}
                        style={iconStyle}
                        className="social-icon social-icon-github"
                    />
                </a>
                <a
                    href="https://instagram.com/jh_slin"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                >
                    <FontAwesomeIcon
                        icon={faInstagram}
                        style={iconStyle}
                        className="social-icon social-icon-instagram"
                    />
                </a>
            </div>
        </main>
    );
};

export default Home;