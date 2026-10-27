import {memo, useCallback, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {useTranslation} from 'react-i18next';
import FormInput from './FormInput.jsx';
import FormTextarea from './FormTextarea';
import {CONTACT_CONFIG} from "../../utils/constants.js";
import {FORM_ICONS} from "../../utils/Icons.jsx";
import {EASE} from '../../utils/motionVariants';
import './ContactForm.css';

const ContactForm = ({isSubmitting, setIsSubmitting}) => {
    const {t} = useTranslation();
    const formRef = useRef(null);
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
        return newErrors;
    }, [formData, t]);

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        if (submitStatus === 'success') setSubmitStatus(null);

        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ''}));
        }
    }, [errors, submitStatus]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        const validationErrors = validateForm();
        const firstInvalid = Object.keys(validationErrors)[0];
        if (firstInvalid) {
            requestAnimationFrame(() => formRef.current?.elements.namedItem(firstInvalid)?.focus());
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(CONTACT_CONFIG.FORMSPREE_ENDPOINT, {
                method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'}, body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({name: '', email: '', subject: '', message: ''});
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (<motion.div
        className="contact-form-wrapper"
        initial={{opacity: 0, x: 12}}
        whileInView={{opacity: 1, x: 0}}
        viewport={{once: true, amount: 0.2}}
        transition={{duration: 0.34, ease: EASE}}
    >
        <div className="contact-form-header">
            <h3 className="contact-form-title" id="contact-form-title">{t('contact.form.title')}</h3>
            <p className="contact-form-description">{t('contact.form.description')}</p>
        </div>

        <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate aria-labelledby="contact-form-title" aria-busy={isSubmitting}>
            <span className="contact-sr-only" role="status" aria-live="polite" aria-atomic="true">
                {Object.values(errors).some(Boolean) ? t('contact.form.validationSummary') : submitStatus ? t(`contact.form.${submitStatus}`) : ''}
            </span>
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

            <AnimatePresence mode="wait">
                {submitStatus === 'success' && (<motion.div
                    className="form-message form-message-success"
                    initial={{opacity: 0, y: -4}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -4, transition: {duration: 0.14}}}
                    transition={{duration: 0.25, ease: EASE}}
                >
                    {FORM_ICONS.SUCCESS}
                    <span>{t('contact.form.success')}</span>
                </motion.div>)}

                {submitStatus === 'error' && (<motion.div
                    className="form-message form-message-error"
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    transition={{duration: 0.25, ease: EASE}}
                >
                    {FORM_ICONS.ERROR}
                    <span>{t('contact.form.error')}</span>
                </motion.div>)}
            </AnimatePresence>

            <motion.button
                type="submit"
                className="form-submit-btn"
                disabled={isSubmitting}
                whileHover={{y: -1}}
                whileTap={{scale: 0.985}}
            >
                {isSubmitting ? (<>
                    <span className="submit-spinner"></span>
                    <span>{t('contact.form.sending')}</span>
                </>) : (<>
                    <span>{t('contact.form.submit')}</span>
                    {FORM_ICONS.SEND}
                </>)}
            </motion.button>
        </form>
    </motion.div>);
};

export default memo(ContactForm);
