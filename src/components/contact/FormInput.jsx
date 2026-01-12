import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {FORM_ICONS} from "../../utils/Icons.jsx";
import './FormInput.css';

const FormInput = ({
                       name, type = 'text', label, value, onChange, error, required = false, icon
                   }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (<div className={`form-input-wrapper ${error ? 'has-error' : ''}`}>
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="form-required">*</span>}
            </label>

            <div className={`form-input-container ${isFocused ? 'focused' : ''} ${value ? 'filled' : ''}`}>
                {icon && (<div className="form-input-icon">
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
                    autoComplete={type === 'email' ? 'email' : name}
                />

                <div className="form-input-border"></div>
            </div>

            {error && (<div className="form-error">
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