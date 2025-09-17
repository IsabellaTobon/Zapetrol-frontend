/**
 * Componente checkbox personalizado con mejor diseño
 */

import React, { useId } from 'react';
import './Checkbox.css';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'primary' | 'success';
}

export const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked,
    onChange,
    disabled = false,
    size = 'md',
    variant = 'primary'
}) => {
    const checkboxId = useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    return (
        <div className={`checkbox-container ${size} ${disabled ? 'disabled' : ''}`}>
            <input
                type="checkbox"
                id={checkboxId}
                checked={checked}
                onChange={handleChange}
                disabled={disabled}
                className="checkbox-input"
            />
            <label htmlFor={checkboxId} className={`checkbox-label ${variant}`}>
                <div className="checkbox-box">
                    {checked && (
                        <svg
                            className="checkbox-icon"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <polyline points="20,6 9,17 4,12" />
                        </svg>
                    )}
                </div>
                <span className="checkbox-text">{label}</span>
            </label>
        </div>
    );
};
