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
    <header className="sticky top-0 z-40 border-b border-border/40 bg-canvas/70 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg" href="/" aria-label="Home">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-[18px] bg-gradient-to-br from-accent via-primary to-secondary shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-transform hover:scale-105">
            <span className="text-sm font-black tracking-[0.2em] text-white">SB</span>
          </span>
          <div>
            <p className="text-lg font-semibold text-text tracking-tight">{APP_NAME}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Build habits. Earn on-chain.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary outline-none',
                  active ? 'bg-primary/10 text-primary shadow-sm' : 'text-muted hover:bg-white/5 hover:text-text'
                )}
                href={link.href}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block"><NetworkBadge /></div>
          <div className="hidden lg:block"><ConnectWallet /></div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
