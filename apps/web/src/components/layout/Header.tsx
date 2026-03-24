'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { MobileNav } from '@/components/layout/MobileNav';
import { NetworkBadge } from '@/components/wallet/NetworkBadge';
import { APP_NAME, NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-canvas/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-[18px] bg-gradient-to-br from-accent via-primary to-secondary shadow-glow">
            <span className="text-sm font-black tracking-[0.2em] text-white">SB</span>
          </span>
          <div>
            <p className="text-lg font-semibold text-text">{APP_NAME}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              Build habits. Earn on-chain.
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition-colors',
                  active
                    ? 'bg-white/10 text-text'
                    : 'text-muted hover:bg-white/5 hover:text-text'
                )}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <NetworkBadge />
          </div>
          <div className="hidden lg:block">
            <ConnectWallet />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
