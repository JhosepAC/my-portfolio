import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import './ContactForm.css';
import {CONTACT_CONFIG} from "../../utils/constants.js";

const ContactForm = ({ isSubmitting, setIsSubmitting }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = t('contact.form.errors.nameRequired');
        } else if (formData.name.trim().length < 2) {
            newErrors.name = t('contact.form.errors.nameMin');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = t('contact.form.errors.emailRequired');
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = t('contact.form.errors.emailInvalid');
        }

        if (!formData.subject.trim()) {
            newErrors.subject = t('contact.form.errors.subjectRequired');
        }

        if (!formData.message.trim()) {
            newErrors.message = t('contact.form.errors.messageRequired');
        } else if (formData.message.trim().length < 10) {
            newErrors.message = t('contact.form.errors.messageMin');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(CONTACT_CONFIG.FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });

                // Reset success message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus(null);
                }, 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-form-wrapper">
            <div className="contact-form-header">
                <h3 className="contact-form-title">{t('contact.form.title')}</h3>
                <p className="contact-form-description">{t('contact.form.description')}</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                    <FormInput
                        name="name"
                        type="text"
                        label={t('contact.form.name')}
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                        icon={(
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        )}
                    />

                    <FormInput
                        name="email"
                        type="email"
                        label={t('contact.form.email')}
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                        icon={(
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                        )}
                    />
                </div>

                <FormInput
                    name="subject"
                    type="text"
                    label={t('contact.form.subject')}
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    required
                    icon={(
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                    )}
                />

                <FormTextarea
                    name="message"
                    label={t('contact.form.message')}
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    required
                    rows={6}
                    icon={(
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            <line x1="9" y1="9" x2="15" y2="9"/>
                            <line x1="9" y1="13" x2="15" y2="13"/>
                        </svg>
                    )}
                />

                {/* Submit Status Messages */}
                {submitStatus === 'success' && (
                    <div className="form-message form-message-success">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{t('contact.form.success')}</span>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="form-message form-message-error">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                        <span>{t('contact.form.error')}</span>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="form-submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="submit-spinner"></span>
                            <span>{t('contact.form.sending')}</span>
                        </>
                    ) : (
                        <>
                            <span>{t('contact.form.submit')}</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;