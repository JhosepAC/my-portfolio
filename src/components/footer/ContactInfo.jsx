import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Icon} from '@iconify/react';
import {CONTACT_DATA} from '../../utils/constants';
import './ContactInfo.css';

const ContactInfo = () => {
    const {t} = useTranslation();
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (<div className="contact-info">
            {CONTACT_DATA.map((item) => (<div key={item.id} className="contact-item">
                    <div className="contact-item-icon">
                        <Icon icon={item.icon} width="20"/>
                    </div>
                    <div className="contact-item-content">
                        <span className="contact-item-label">{t(`footer.contactLabels.${item.id}`)}</span>
                        {item.href ? (<a href={item.href} className="contact-item-value">{item.value}</a>) : (
                            <span className="contact-item-value">{item.value}</span>)}
                    </div>
                    <button
                        className="contact-item-copy"
                        onClick={() => handleCopy(item.value, item.id)}
                        title={t('footer.copy')}
                    >
                        <Icon icon={copiedId === item.id ? "mdi:check" : "mdi:content-copy"}/>
                    </button>
                </div>))}
        </div>);
};

export default ContactInfo;