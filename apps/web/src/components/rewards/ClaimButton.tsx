import React, { forwardRef } from 'react';
import { Button } from '@/components/ui/Button';

interface ClaimButtonProps {
    amount: number;
    onClaim: () => void;
    disabled?: boolean;
}

export const ClaimButton = forwardRef<HTMLButtonElement, ClaimButtonProps>(({ amount, onClaim, disabled }, ref) => {
    return (
        <Button 
            ref={ref} 
            onClick={onClaim} 
            disabled={disabled}
            className="bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            aria-label={`Claim ${amount} rewards`}
        >
            Claim {amount} STX
        </Button>
    );
});
ClaimButton.displayName = 'ClaimButton';
