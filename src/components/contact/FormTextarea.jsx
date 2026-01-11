import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {FORM_ICONS} from "../../utils/Icons.jsx";
import './FormTextarea.css';

const FormTextarea = ({
                          name, label, value, onChange, error, required = false, rows = 4, icon
                      }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (<div className={`form-textarea-wrapper ${error ? 'has-error' : ''}`}>
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="form-required">*</span>}
            </label>

            <div className={`form-textarea-container ${isFocused ? 'focused' : ''} ${value ? 'filled' : ''}`}>
                {icon && (<div className="form-textarea-icon">
                        {icon}
                    </div>)}

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

            {error && (<div className="form-error">
                    {FORM_ICONS.ALERT}
                    <span>{error}</span>
                </div>)}
        </div>);
};

FormTextarea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    required: PropTypes.bool,
    rows: PropTypes.number,
    icon: PropTypes.node
};

export default memo(FormTextarea);