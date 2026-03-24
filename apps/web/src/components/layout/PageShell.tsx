import type { ReactNode } from 'react';

import { Sidebar } from '@/components/layout/Sidebar';

interface PageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: PageShellProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>
        <div className="space-y-6">
          <section className="surface-card rounded-[32px] p-6 sm:p-8">
            <div className="relative z-[1] flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-light">
                  {eyebrow}
                </p>
                <div className="space-y-2">
                  <h1 className="text-4xl font-semibold text-text sm:text-5xl">{title}</h1>
                  <p className="max-w-2xl text-base text-muted">{description}</p>
                </div>
              </div>
              {actions ? <div className="relative z-[1]">{actions}</div> : null}
            </div>
          </section>
          {children}
        </div>
      </div>
    </main>
  );
}
