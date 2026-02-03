import React from 'react';
import './Button.css';

const Button = ({ children, onClick, disabled = false, loading = false, variant = 'primary' }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`btn btn-${variant} btn-block`}
        >
            {loading ? 'Carregando...' : children}
        </button>
    );
};

export default Button;