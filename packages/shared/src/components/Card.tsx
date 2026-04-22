import React from 'react';

/**
 * Props for the Card component.
 */
interface CardProps {
    /** The main content of the card */
    children: React.ReactNode;
    /** Additional CSS classes for the card container */
    className?: string;
    /** Optional title displayed at the top of the card */
    title?: string;
    /** Optional content displayed at the bottom of the card */
    footer?: React.ReactNode;
}

/**
 * A standard Card component with a title, content, and optional footer.
 */
export const Card: React.FC<CardProps> = ({ children, className = '', title, footer }) => {
    return (
        <div className={`bg-white border-2 border-black rounded-lg p-6 shadow-lg flex flex-col ${className}`}>
            {title && <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">{title}</h3>}
            <div className="flex-grow">
                {children}
            </div>
            {footer && (
                <div className="mt-6 pt-4 border-t-2 border-black">
                    {footer}
                </div>
            )}
        </div>
    );
};
