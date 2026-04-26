import React from 'react';

export function HabitCalendar({ checkIns }: { checkIns: Date[] }) {
    return (
        <div className="grid grid-cols-7 gap-1 p-4 bg-zinc-900 rounded-xl border border-white/5" role="grid" aria-label="Habit check-in calendar">
            {/* Calendar logic simplified for demo */}
            <div className="text-center text-xs text-zinc-500">Mo</div>
            <div className="text-center text-xs text-zinc-500">Tu</div>
            <div className="text-center text-xs text-zinc-500">We</div>
            <div className="text-center text-xs text-zinc-500">Th</div>
            <div className="text-center text-xs text-zinc-500">Fr</div>
            <div className="text-center text-xs text-zinc-500">Sa</div>
            <div className="text-center text-xs text-zinc-500">Su</div>
            {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-sm bg-zinc-800 hover:bg-zinc-700 transition-colors" role="gridcell" aria-selected="false" />
            ))}
        </div>
    );
}
