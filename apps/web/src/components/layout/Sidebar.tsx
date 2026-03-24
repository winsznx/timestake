'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Card } from '@/components/ui/Card';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4">
      <Card title="Navigate" description="Move through the habit loop without losing context.">
        <nav className="space-y-2">
          {NAV_LINKS.slice(1).map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                className={cn(
                  'block rounded-2xl px-4 py-3 text-sm transition-colors',
                  active
                    ? 'bg-primary text-white'
                    : 'panel-outline text-muted hover:bg-white/5 hover:text-text'
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </Card>
      <Card eyebrow="Focus loop" title="Consistency compounds">
        <ul className="space-y-3 text-sm text-muted">
          <li>Stake attention, not just tokens.</li>
          <li>Check in daily to multiply reward power.</li>
          <li>Climb the leaderboard with clean streaks.</li>
        </ul>
      </Card>
    </div>
  );
}
