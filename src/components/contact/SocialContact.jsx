import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {SOCIAL_ICONS, SOCIAL_LINKS} from "../../utils/constants.js";
import './SocialContact.css';

const SocialContact = () => {
    const {t} = useTranslation();
    const filteredLinks = SOCIAL_LINKS.filter(link => link.id !== 'email');

    return (<div className="social-contact">
        <h4 className="social-contact-title">{t('contact.social.title')}</h4>
        <div className="social-contact-links">
            {filteredLinks.map((social, index) => (<a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-contact-link"
                aria-label={social.name}
                style={{
                    '--social-color': social.color, animationDelay: `${index * 0.1}s`
                }}
            >
                        <span className="social-contact-icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="20"
                                height="20"
                            >
                                <path d={SOCIAL_ICONS[social.id]}/>
                            </svg>
                        </span>
                <span className="social-contact-label">{social.name}</span>
            </a>))}
        </div>
    </div>);
};

export default memo(SocialContact);