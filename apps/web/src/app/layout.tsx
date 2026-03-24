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
