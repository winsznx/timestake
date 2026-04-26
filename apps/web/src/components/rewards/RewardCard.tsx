import React from 'react';
import { Card } from '@/components/ui/Card';
import { ClaimButton } from './ClaimButton';

export function RewardCard({ total, claimable, onClaim }: { total: number, claimable: number, onClaim: () => void }) {
    return (
        <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-medium">Total Earned</span>
                    <span className="text-xl font-bold">{total} STX</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-zinc-800/50 rounded-lg">
                    <div className="flex flex-col">
                        <span className="text-sm text-zinc-400">Available to Claim</span>
                        <span className="text-2xl font-black text-green-400">{claimable} STX</span>
                    </div>
                    <ClaimButton amount={claimable} onClaim={onClaim} disabled={claimable <= 0} />
                </div>
            </div>
        </Card>
    );
}
