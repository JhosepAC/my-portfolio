import React from 'react';
import { SOCIAL_ICONS } from '../../../utils/constants';
import './SocialButton.css';

/**
 * SocialButton component for external profile links
 * Uses centralized SVG paths for brand icons to avoid deprecation issues
 */
const SocialButton = ({ icon, url, ariaLabel }) => {
    const iconPath = SOCIAL_ICONS[icon];

    if (!iconPath) return null;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-button ${icon}`}
            aria-label={ariaLabel}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d={iconPath} />
            </svg>
        </a>
    );
};

export default SocialButton;