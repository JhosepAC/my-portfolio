import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {FORM_ICONS} from "../../utils/Icons.jsx";
import './FormInput.css';

const AUTOCOMPLETE_MAP = {
    name: 'name',
    email: 'email',
    subject: 'off',
    message: 'off',
};

const FormInput = ({
                       name, type = 'text', label, value, onChange, error, required = false, icon
                   }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (<div className={`form-input-wrapper ${error ? 'has-error' : ''}`}>
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="form-required" aria-hidden="true">*</span>}
            </label>

            <div className={`form-input-container ${isFocused ? 'focused' : ''} ${value ? 'filled' : ''}`}>
                {icon && (<div className="form-input-icon" aria-hidden="true">
                        {icon}
                    </div>)}

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="form-input"
                    required={required}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${name}-error` : undefined}
                    spellCheck={type === 'email' ? false : undefined}
                    autoComplete={AUTOCOMPLETE_MAP[name] || 'off'}
                />

                <div className="form-input-border"></div>
            </div>

            {error && (<div className="form-error" id={`${name}-error`}>
                    {FORM_ICONS.ALERT}
                    <span>{error}</span>
                </div>)}
        </div>);
};

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    required: PropTypes.bool,
    icon: PropTypes.node
};

export default memo(FormInput);
