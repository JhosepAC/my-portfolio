import {useState} from 'react';
import './FooterLink.css';

const FooterLink = ({href, label, onClick}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
            return;
        }

        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth', block: 'start'
                });
            }
        }
    };

    return (<a
            href={href}
            className="footer-link"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="footer-link-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </span>
            <span className="footer-link-text">{label?.includes('^') ? (() => { const [main, sup] = label.split('^'); return <>{main}<sup style={{fontSize:'0.6em', verticalAlign:'super', marginLeft:'1px'}}>{sup}</sup></>; })() : label}</span>
            {isHovered && <span className="footer-link-underline"></span>}
        </a>);
};

export default FooterLink;