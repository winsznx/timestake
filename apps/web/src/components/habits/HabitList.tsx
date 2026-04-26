import React from 'react';
import { HabitCard } from './HabitCard';
import { Skeleton } from '@/components/ui/Skeleton';

interface HabitListProps {
    habits: any[];
    isLoading: boolean;
}

export function HabitList({ habits, isLoading }: HabitListProps) {
    if (isLoading) {
        return (
            <div className="space-y-4" aria-busy="true">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
        );
    }

    if (!habits?.length) {
        return <div className="text-center text-zinc-500 py-8" role="status">No habits found. Start your journey today!</div>;
    }

    return (
        <div className="space-y-4" role="list">
            {habits.map((habit, i) => (
                <div key={i} role="listitem">
                    <HabitCard title={habit.name} description={habit.description} streak={habit.streak} />
                </div>
            ))}
        </div>
    );
}
