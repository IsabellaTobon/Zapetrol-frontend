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
        label: 'Al menos 6 caracteres',
        test: (password) => password.length >= 6,
        weight: 3 // Peso mayor por ser el requisito mínimo
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
        label: 'Contiene símbolos (opcional)',
        test: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        weight: 1 // Peso menor por ser opcional
    }
];

const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, level: 'none', text: '' };

    const passedChecks = strengthChecks.filter(check => check.test(password));
    const score = passedChecks.reduce((sum, check) => sum + check.weight, 0);
    const maxScore = strengthChecks.reduce((sum, check) => sum + check.weight, 0);
    const percentage = (score / maxScore) * 100;

    let level: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
    let text = 'Contraseña muy débil';

    if (score >= 7) { // 7-8 puntos
        level = 'strong';
        text = 'Contraseña muy segura';
    } else if (score >= 5) { // 5-6 puntos
        level = 'good';
        text = 'Contraseña segura';
    } else if (score >= 3) { // 3-4 puntos
        level = 'fair';
        text = 'Contraseña aceptable';
    } // else weak (0-2 puntos)

    return { score: percentage, level, text };
};

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
    password,
    show = true
}) => {
    const strength = getPasswordStrength(password);

    if (!show || !password) return null;

    return (
        <div className="password-strength">
            <div className="strength-bar">
                <div
                    className={`strength-fill strength-${strength.level}`}
                    style={{ width: `${strength.score}%` }}
                />
            </div>

            <div className="strength-description">
                <span className={`strength-text strength-${strength.level}`}>
                    {strength.text}
                </span>
            </div>
        </div>
    );
};
