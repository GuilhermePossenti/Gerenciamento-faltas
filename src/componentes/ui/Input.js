import React from 'react';
import './Input.css';

const Input = ({ label, type = 'text', name, placeholder, value, onChange, onBlur, error, success, disabled = false }) => {
    return (
        <div className="input-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                className={error ? 'input-error' : success ? 'input-success' : ''}
            />
            {error && <span className="input-feedback error">{error}</span>}
            {success && <span className="input-feedback success">{success}</span>}
        </div>
    );
};

export default Input;