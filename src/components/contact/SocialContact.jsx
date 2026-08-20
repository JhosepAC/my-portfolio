import {memo} from 'react';
import {motion} from 'motion/react';
import {useTranslation} from 'react-i18next';
import {SOCIAL_ICONS, SOCIAL_LINKS} from "../../utils/constants.js";
import {EASE} from '../../utils/motionVariants';
import './SocialContact.css';

const SocialContact = () => {
    const {t} = useTranslation();
    const filteredLinks = SOCIAL_LINKS.filter(link => link.id !== 'email');

    return (<motion.div
        className="social-contact"
        initial={{opacity: 0, x: -24}}
        whileInView={{opacity: 1, x: 0}}
        viewport={{once: true, amount: 0.3}}
        transition={{duration: 0.5, ease: EASE, delay: 0.2}}
    >
        <h3 className="social-contact-title">{t('contact.social.title')}</h3>
        <div className="social-contact-links">
            {filteredLinks.map((social) => (<a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-contact-link"
                aria-label={social.name}
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
    </motion.div>);
};

export default memo(SocialContact);