import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from './ContactForm';
import ContactCard from './ContactCard';
import SocialContact from './SocialContact';
import './ContactSection.css';

const ContactSection = () => {
    const { t } = useTranslation();
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    const contactMethods = [
        {
            id: 'email',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
            ),
            title: t('contact.email.title'),
            value: 'jhosepjamil@gmail.com',
            description: t('contact.email.description'),
            action: {
                label: t('contact.email.action'),
                href: 'mailto:jhosepjamil@gmail.com'
            },
            color: '#ea4335'
        },
        {
            id: 'phone',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
            ),
            title: t('contact.phone.title'),
            value: '+51 978 777 386',
            description: t('contact.phone.description'),
            action: {
                label: t('contact.phone.action'),
                href: 'tel:+51978777386'
            },
            color: '#34a853'
        },
        {
            id: 'location',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
            ),
            title: t('contact.location.title'),
            value: 'Lima, Perú',
            description: t('contact.location.description'),
            action: {
                label: t('contact.location.action'),
                href: 'https://maps.google.com/?q=Lima,Peru'
            },
            color: '#4285f4'
        }
    ];

    return (
        <section id="contact" className="contact-section">
            {/* Animated Background */}
            <div className="contact-bg">
                <div className="contact-grid"></div>
                <div className="contact-orb contact-orb-1"></div>
                <div className="contact-orb contact-orb-2"></div>
                <div className="contact-orb contact-orb-3"></div>
                <div className="contact-particles">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="contact-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 10}s`
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="contact-container">
                {/* Header */}
                <div className="contact-header">
                    <div className="contact-badge">
                        <span className="contact-badge-dot"></span>
                        <span className="contact-badge-text">{t('contact.badge')}</span>
                    </div>
                    <h2 className="contact-title">
                        <span className="contact-title-main">{t('contact.title')}</span>
                        <span className="contact-title-gradient">{t('contact.titleHighlight')}</span>
                    </h2>
                    <p className="contact-subtitle">
                        {t('contact.subtitle')}
                    </p>
                </div>

                {/* Main Content */}
                <div className="contact-content">
                    {/* Left Side - Contact Cards */}
                    <div className="contact-left">
                        <div className="contact-cards">
                            {contactMethods.map((method, index) => (
                                <ContactCard
                                    key={method.id}
                                    method={method}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Social Links */}
                        <SocialContact />

                        {/* Availability Badge */}
                        <div className="contact-availability">
                            <div className="availability-content">
                                <div className="availability-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                </div>
                                <div className="availability-text">
                                    <span className="availability-label">{t('contact.availability.label')}</span>
                                    <span className="availability-value">{t('contact.availability.value')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="contact-right">
                        <ContactForm
                            isSubmitting={isFormSubmitting}
                            setIsSubmitting={setIsFormSubmitting}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;