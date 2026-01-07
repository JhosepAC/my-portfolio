import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="src/assets/logo/elephant-logo.svg" alt="Logo" className="logo-image" />
                </div>

                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <a href="#home" className="navbar-link">Home</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#skills" className="navbar-link">Skills</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#projects" className="navbar-link">Projects</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#education" className="navbar-link">Education</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#contact" className="navbar-link">Contact me</a>
                    </li>
                </ul>

                <div className="navbar-actions">
                    <button className="icon-button" aria-label="Change language">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                    </button>
                    <button className="icon-button" aria-label="Toggle theme">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;