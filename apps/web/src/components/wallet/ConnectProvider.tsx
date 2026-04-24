'use client';

import { AppConfig, UserSession } from '@stacks/connect';
import { Connect } from '@stacks/connect-react';
import { APP_NAME } from '@/lib/constants';

/**
 * Global authentication configuration for Stacks.
 */
export const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

interface ConnectProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component for Stacks authentication logic.
 * Wraps the application to provide wallet connection context.
 */
export function ConnectProvider({ children }: ConnectProviderProps) {
  return (
    <Connect
      authOptions={{
        appDetails: {
          name: APP_NAME,
          icon: typeof window !== 'undefined' ? `${window.location.origin}/favicon.svg` : '/favicon.svg',
        },
        redirectTo: '/',
        onFinish: () => {
          // Trigger a refresh to update hydration state across the app
          window.location.reload();
        },
        userSession,
      }}
    >
      {children}
    </Connect>
  );
}
