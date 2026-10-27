import {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {motion} from 'motion/react';
import PropTypes from 'prop-types';
import './ContactCard.css';
import {CONTACT_ICONS} from "../../utils/Icons.jsx";
import {EASE} from '../../utils/motionVariants';

const ActionButton = memo(({onClick, href, title, icon, className = ""}) => {
    const commonProps = {
        className: `action-btn-mini ${className}`, title, 'aria-label': title
    };

    if (href) {
        const isExternal = href.startsWith('http');
        return (<a href={href} {...commonProps} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
                {icon}
            </a>);
    }

    return (<button onClick={onClick} {...commonProps} type="button">
            {icon}
        </button>);
});

ActionButton.displayName = 'ActionButton';

const ContactCard = ({method, index}) => {
    const {t} = useTranslation();
    const [isCopied, setIsCopied] = useState(false);
    const [copyError, setCopyError] = useState(false);
    const copyTimer = useRef(null);
    useEffect(() => () => clearTimeout(copyTimer.current), []);

    const {id, icon, title, value, action} = method;

    const handleCopy = useCallback(async (e) => {
        e.preventDefault();
        if (!value) return;
        clearTimeout(copyTimer.current);
        setIsCopied(false);
        setCopyError(false);

        try {
            await navigator.clipboard.writeText(value);
            setIsCopied(true);
        } catch {
            setCopyError(true);
        }
        copyTimer.current = setTimeout(() => { setIsCopied(false); setCopyError(false); }, 2000);
    }, [value]);

    const canCopy = id === 'email' || id === 'phone';

    return (<motion.div
            className="contact-card-compact"
            initial={{opacity: 0, x: -12}}
            whileInView={{opacity: 1, x: 0}}
            whileHover={{y: -2}}
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.3, ease: EASE, delay: Math.min(index, 2) * 0.055}}
        >
            <div className="card-icon-mini" aria-hidden="true">
                {icon}
            </div>

            <div className="card-info-mini">
                <span className="card-label-mini">{title}</span>
                <a
                    href={action?.href}
                    className="card-value-mini"
                    target={action?.href?.startsWith('http') ? '_blank' : undefined}
                    rel={action?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                    {value}
                </a>
            </div>

            <div className="card-actions-mini">
                {canCopy && (<ActionButton
                        onClick={handleCopy}
                        className={isCopied ? 'copied' : ''}
                        title={t('contact.copyValue', {value})}
                        icon={isCopied ? CONTACT_ICONS.CHECK : CONTACT_ICONS.COPY}
                    />)}

                <ActionButton
                    href={action?.href}
                    title={action?.label || title}
                    icon={CONTACT_ICONS.EXTERNAL_LINK}
                />
            </div>
            <span className="contact-sr-only" role="status" aria-live="polite">
                {isCopied ? t('contact.copied') : copyError ? t('contact.copyFailed') : ''}
            </span>
        </motion.div>);
};

ContactCard.propTypes = {
    method: PropTypes.shape({
        id: PropTypes.string.isRequired,
        icon: PropTypes.node,
        title: PropTypes.string,
        value: PropTypes.string,
        action: PropTypes.shape({
            href: PropTypes.string
        })
    }).isRequired, index: PropTypes.number.isRequired
};

export default memo(ContactCard);
