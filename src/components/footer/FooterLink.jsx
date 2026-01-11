import { useState } from 'react';
import './FooterLink.css';

const FooterLink = ({ href, label, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <a
            href={href}
            className="footer-link"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ animationDelay: `${delay}s` }}
        >
      <span className="footer-link-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </span>
            <span className="footer-link-text">{label}</span>
            {isHovered && <span className="footer-link-underline"></span>}
        </a>
    );
};

export default FooterLink;