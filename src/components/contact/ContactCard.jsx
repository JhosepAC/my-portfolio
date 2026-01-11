import {memo, useCallback, useState} from 'react';
import './ContactCard.css';
import { CONTACT_ICONS } from "../../utils/Icons.jsx";

const ActionButton = ({onClick, href, title, icon, className = ""}) => {
    const commonProps = {
        className: `action-btn-mini ${className}`, title: title,
    };

    if (href) {
        return (<a href={href} {...commonProps} target="_blank" rel="noopener noreferrer">
                {icon}
            </a>);
    }

    return (<button onClick={onClick} {...commonProps} type="button">
            {icon}
        </button>);
};

const ContactCard = ({method, index}) => {
    const [isCopied, setIsCopied] = useState(false);
    const {id, color, icon, title, value, action} = method;

    const handleCopy = useCallback(async (e) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(value);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch {
        }
    }, [value]);

    const canCopy = id === 'email' || id === 'phone';

    return (<div
            className="contact-card-compact"
            style={{
                '--card-color': color, animationDelay: `${index * 0.1}s`
            }}
        >
            <div className="card-icon-mini">
                {icon}
            </div>

            <div className="card-info-mini">
                <span className="card-label-mini">{title}</span>
                <a
                    href={action.href}
                    className="card-value-mini"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {value}
                </a>
            </div>

            <div className="card-actions-mini">
                {canCopy && (<ActionButton
                        onClick={handleCopy}
                        className={isCopied ? 'copied' : ''}
                        title="Copy to clipboard"
                        icon={isCopied ? CONTACT_ICONS.CHECK : CONTACT_ICONS.COPY}
                    />)}

                <ActionButton
                    href={action.href}
                    title="Open link"
                    icon={CONTACT_ICONS.EXTERNAL_LINK}
                />
            </div>
        </div>);
};

export default memo(ContactCard);