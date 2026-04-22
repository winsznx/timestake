import React from 'react';

/**
 * Props for the Input component.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Optional label displayed above the input */
    label?: string;
    /** Optional error message displayed below the input */
    error?: string;
    /** Optional helper text displayed below the input when there is no error */
    helperText?: string;
}

/**
 * A standard Input component with label, error handling, and helper text.
 */
export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium mb-2 text-black">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all ${error ? 'border-red-500' : ''
                    } ${className}`}
                {...props}
            />
            {error ? (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            ) : helperText ? (
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{helperText}</p>
            ) : null}
        </div>
    );
};
