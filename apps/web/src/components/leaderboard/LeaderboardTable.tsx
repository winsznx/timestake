import React from 'react';
import { UserRow } from './UserRow';

export function LeaderboardTable({ entries }: { entries: any[] }) {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/50" role="region" aria-label="Leaderboard Table">
            <table className="w-full text-left text-sm" role="table">
                <thead className="bg-zinc-800/50 text-zinc-400">
                    <tr role="row">
                        <th className="px-4 py-3 font-medium" role="columnheader">Rank</th>
                        <th className="px-4 py-3 font-medium" role="columnheader">User</th>
                        <th className="px-4 py-3 font-medium text-right" role="columnheader">Score</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {entries.map((entry, idx) => (
                        <UserRow key={idx} rank={idx + 1} user={entry.user} score={entry.score} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
