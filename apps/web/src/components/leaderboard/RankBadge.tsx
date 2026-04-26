import React from 'react';
import { Badge } from '@/components/ui/Badge';

export function RankBadge({ rank }: { rank: number }) {
    let variant: any = 'muted';
    if (rank === 1) variant = 'success';
    if (rank === 2) variant = 'streak';
    if (rank === 3) variant = 'rank';
    
    return (
        <Badge variant={variant} aria-label={`Rank ${rank}`}>
            #{rank}
        </Badge>
    );
}
