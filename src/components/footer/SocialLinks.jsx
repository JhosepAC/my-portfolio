import React, {useState} from 'react';
import {SOCIAL_ICONS, SOCIAL_LINKS} from '../../utils/constants';
import './SocialLinks.css';

const SocialLinks = () => {
    const [hoveredId, setHoveredId] = useState(null);

    return (<div className="social-links">
            {SOCIAL_LINKS.map((social, index) => (<a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.name}
                    onMouseEnter={() => setHoveredId(social.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                        '--social-color': social.color, animationDelay: `${index * 0.1}s`
                    }}
                >
                    <span className="social-link-icon">
                        <svg
                            viewBox="0 0 24 24"
                            fill={social.id === 'email' ? 'none' : 'currentColor'}
                            stroke={social.id === 'email' ? 'currentColor' : 'none'}
                            strokeWidth={social.id === 'email' ? '2' : '0'}
                            width="20"
                            height="20"
                        >
                            <path d={SOCIAL_ICONS[social.id]}/>
                            {social.id === 'email' && <polyline points="22,6 12,13 2,6"/>}
                        </svg>
                    </span>
                    {hoveredId === social.id && (<span className="social-link-tooltip">{social.name}</span>)}
                </a>))}
        </div>);
};

export default SocialLinks;