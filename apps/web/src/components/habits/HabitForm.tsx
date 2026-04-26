import React, { forwardRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const HabitForm = forwardRef<HTMLFormElement, { onSubmit: (e: React.FormEvent) => void }>(({ onSubmit }, ref) => {
    return (
        <form ref={ref} onSubmit={onSubmit} className="space-y-4" aria-label="Create new habit form">
            <Input name="name" label="Habit Name" placeholder="e.g. Read for 30 minutes" required aria-required="true" />
            <Input name="description" label="Description" placeholder="Why is this important?" />
            <Button type="submit" className="w-full">Create Habit</Button>
        </form>
    );
});

HabitForm.displayName = 'HabitForm';
