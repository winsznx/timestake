'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { NetworkBadge } from '@/components/wallet/NetworkBadge';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setOpen(true)}>
        Menu
      </Button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm lg:hidden">
          <div className="ml-auto h-full w-full max-w-xs border-l border-border/60 bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-light">
                Navigation
              </p>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <NetworkBadge />
              <ConnectWallet />
            </div>
            <nav className="mt-8 space-y-2">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    className={cn(
                      'block rounded-2xl px-4 py-3 text-sm transition-colors',
                      active
                        ? 'bg-primary text-white'
                        : 'panel-outline text-muted hover:bg-white/5 hover:text-text'
                    )}
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
