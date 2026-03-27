'use client';

import { AppConfig, UserSession } from '@stacks/connect';
import { Connect } from '@stacks/connect-react';
import { APP_NAME } from '@/lib/constants';

export const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export function ConnectProvider({ children }: { children: React.ReactNode }) {
  return (
    <Connect
      authOptions={{
        appDetails: {
          name: APP_NAME,
          icon: '/favicon.svg',
        },
        redirectTo: '/',
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}
    >
      {children}
    </Connect>
  );
}
