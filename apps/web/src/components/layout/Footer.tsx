import Link from 'next/link';

import { APP_NAME, SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-slate-950/35">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-muted sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-text">{APP_NAME}</p>
          <p className="mt-1">Daily streak protocol on Stacks. Demo-ready while contracts settle in.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {SOCIAL_LINKS.map((link) => (
            <Link className="transition-colors hover:text-text" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
