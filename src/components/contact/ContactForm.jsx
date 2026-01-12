import {memo, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import FormInput from './FormInput.jsx';
import FormTextarea from './FormTextarea';
import {CONTACT_CONFIG} from "../../utils/constants.js";
import {FORM_ICONS} from "../../utils/Icons.jsx";
import './ContactForm.css';

const ContactForm = ({isSubmitting, setIsSubmitting}) => {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        name: '', email: '', subject: '', message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = useCallback(() => {
        const newErrors = {};
        const {name, email, subject, message} = formData;

        if (!name.trim()) {
            newErrors.name = t('contact.form.errors.nameRequired');
        } else if (name.trim().length < 2) {
            newErrors.name = t('contact.form.errors.nameMin');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = t('contact.form.errors.emailRequired');
        } else if (!emailRegex.test(email)) {
            newErrors.email = t('contact.form.errors.emailInvalid');
        }

        if (!subject.trim()) {
            newErrors.subject = t('contact.form.errors.subjectRequired');
        }

        if (!message.trim()) {
            newErrors.message = t('contact.form.errors.messageRequired');
        } else if (message.trim().length < 10) {
            newErrors.message = t('contact.form.errors.messageMin');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData, t]);

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));

        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ''}));
        }
    }, [errors]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(CONTACT_CONFIG.FORMSPREE_ENDPOINT, {
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({name: '', email: '', subject: '', message: ''});
                setTimeout(() => setSubmitStatus(null), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (<div className="contact-form-wrapper">
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
                    icon={FORM_ICONS.USER}
                />

                <FormInput
                    name="email"
                    type="email"
                    label={t('contact.form.email')}
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    icon={FORM_ICONS.EMAIL}
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
                icon={FORM_ICONS.SUBJECT}
            />

            <FormTextarea
                name="message"
                label={t('contact.form.message')}
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
                rows={6}
                icon={FORM_ICONS.MESSAGE}
            />

            {submitStatus === 'success' && (<div className="form-message form-message-success">
                {FORM_ICONS.SUCCESS}
                <span>{t('contact.form.success')}</span>
            </div>)}

            {submitStatus === 'error' && (<div className="form-message form-message-error">
                {FORM_ICONS.ERROR}
                <span>{t('contact.form.error')}</span>
            </div>)}

            <button
                type="submit"
                className="form-submit-btn"
                disabled={isSubmitting}
            >
                {isSubmitting ? (<>
                    <span className="submit-spinner"></span>
                    <span>{t('contact.form.sending')}</span>
                </>) : (<>
                    <span>{t('contact.form.submit')}</span>
                    {FORM_ICONS.SEND}
                </>)}
            </button>
        </form>
    </div>);
};

export default memo(ContactForm);