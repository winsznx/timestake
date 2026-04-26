import React from 'react';

export function RewardHistory({ history }: { history: any[] }) {
    if (!history?.length) {
        return <div className="text-sm text-zinc-500 p-4 text-center">No claim history available.</div>;
    }
    
    return (
        <div className="space-y-2">
            <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Claim History</h4>
            {history.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-zinc-900/50 border border-white/5">
                    <span className="text-sm text-zinc-300">{new Date(item.date).toLocaleDateString()}</span>
                    <span className="font-mono text-green-400">+{item.amount} STX</span>
                </div>
            ))}
        </div>
    );
}
