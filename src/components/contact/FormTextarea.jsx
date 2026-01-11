import { useState } from 'react';
import './FormTextarea.css';

const FormTextarea = ({
                          name,
                          label,
                          value,
                          onChange,
                          error,
                          required = false,
                          rows = 4,
                          icon
                      }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`form-textarea-wrapper ${error ? 'has-error' : ''}`}>
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="form-required">*</span>}
            </label>

            <div className={`form-textarea-container ${isFocused ? 'focused' : ''} ${value ? 'filled' : ''}`}>
                {icon && (
                    <div className="form-textarea-icon">
                        {icon}
                    </div>
                )}

                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="form-textarea"
                    required={required}
                    rows={rows}
                />

                <div className="form-textarea-border"></div>
            </div>

            {error && (
                <div className="form-error">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default FormTextarea;