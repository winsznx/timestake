import React from 'react';
import { RankBadge } from './RankBadge';
import { truncateAddress } from '@/lib/utils';

export function UserRow({ rank, user, score }: { rank: number, user: string, score: number }) {
    return (
        <tr className="hover:bg-white/5 transition-colors" role="row">
            <td className="px-4 py-3" role="cell"><RankBadge rank={rank} /></td>
            <td className="px-4 py-3 font-mono text-zinc-300" role="cell">{truncateAddress(user)}</td>
            <td className="px-4 py-3 text-right font-bold text-primary" role="cell">{score}</td>
        </tr>
    );
}
