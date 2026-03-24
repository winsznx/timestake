import type { Metadata } from 'next';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants';

import './globals.css';

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
);

export const metadata: Metadata = {
  title: `${APP_NAME} | Build habits. Earn on-chain.`,
  description: APP_DESCRIPTION,
  metadataBase,
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: `${APP_NAME} | Build habits. Earn on-chain.`,
    description: APP_DESCRIPTION,
    images: ['/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} | Build habits. Earn on-chain.`,
    description: APP_DESCRIPTION,
    images: ['/og-image.svg'],
  },
  other: {
    'talentapp:project_verification':
      '2fb7ab8a0f5b2b3a422c26a2dce2400ca8623a2888179a057354e478b7d681c9aaf37a6e6d5b67f05c784591f9f4e766f79263b57f2950719dcb31f27a2e30c9',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <Header />
        <div className="min-h-[calc(100vh-160px)]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
