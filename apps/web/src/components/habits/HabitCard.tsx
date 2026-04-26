import React, { forwardRef } from 'react';
import { Card } from '@/components/ui/Card';

interface HabitCardProps {
    title: string;
    description: string;
    streak: number;
    onClick?: () => void;
}

export const HabitCard = forwardRef<HTMLDivElement, HabitCardProps>(({ title, description, streak, onClick }, ref) => {
    return (
        <Card ref={ref} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={onClick} role="button" tabIndex={0} aria-label={`Habit: ${title}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-sm text-zinc-400">{description}</p>
                </div>
                <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold" aria-live="polite">
                    🔥 {streak}
                </div>
            </div>
        </Card>
    );
});

HabitCard.displayName = 'HabitCard';
