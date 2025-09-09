/**
 * Componente para mostrar la fortaleza de la contraseña
 */

import React from 'react';
import './PasswordStrength.css';

interface PasswordStrengthProps {
    password: string;
    show?: boolean;
}

interface StrengthCheck {
    label: string;
    test: (password: string) => boolean;
    weight: number;
}

const strengthChecks: StrengthCheck[] = [
    {
        label: 'Al menos 8 caracteres',
        test: (password) => password.length >= 8,
        weight: 2
    },
    {
        label: 'Contiene mayúsculas',
        test: (password) => /[A-Z]/.test(password),
        weight: 1
    },
    {
        label: 'Contiene minúsculas',
        test: (password) => /[a-z]/.test(password),
        weight: 1
    },
    {
        label: 'Contiene números',
        test: (password) => /\d/.test(password),
        weight: 2
    },
    {
        label: 'Contiene símbolos',
        test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
        weight: 2
    }
];

const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, level: 'none', text: '' };

    const passedChecks = strengthChecks.filter(check => check.test(password));
    const score = passedChecks.reduce((sum, check) => sum + check.weight, 0);
    const maxScore = strengthChecks.reduce((sum, check) => sum + check.weight, 0);
    const percentage = (score / maxScore) * 100;

    let level: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
    let text = 'Muy débil';

    if (percentage >= 80) {
        level = 'strong';
        text = 'Fuerte';
    } else if (percentage >= 60) {
        level = 'good';
        text = 'Buena';
    } else if (percentage >= 40) {
        level = 'fair';
        text = 'Regular';
    }

    return { score: percentage, level, text, checks: passedChecks };
};

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
    password,
    show = true
}) => {
    const strength = getPasswordStrength(password);

    if (!show || !password) return null;

    return (
        <div className="password-strength">
            <div className="strength-header">
                <span className="strength-label">Fortaleza de la contraseña:</span>
                <span className={`strength-text strength-${strength.level}`}>
                    {strength.text}
                </span>
            </div>

            <div className="strength-bar">
                <div
                    className={`strength-fill strength-${strength.level}`}
                    style={{ width: `${strength.score}%` }}
                />
            </div>

            <div className="strength-requirements">
                {strengthChecks.map((check, index) => {
                    const isPassed = check.test(password);
                    return (
                        <div
                            key={index}
                            className={`requirement ${isPassed ? 'passed' : 'pending'}`}
                        >
                            <div className="requirement-icon">
                                {isPassed ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <polyline points="20,6 9,17 4,12" />
                                    </svg>
                                ) : (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                )}
                            </div>
                            <span className="requirement-text">{check.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
