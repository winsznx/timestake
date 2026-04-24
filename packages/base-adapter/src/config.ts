/**
 * Configuration for the Base network adapter using AppKit.
 */
export const baseConfig = {
    /** Project ID from Reown Cloud */
    projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '',
    /** Application metadata */
    metadata: {
        name: 'TimeStake',
        description: 'On-chain habit tracking on Base',
        url: 'https://timestake.app',
        icons: ['https://timestake.app/icon.png']
    },
    /** Supported chains */
    chains: [8453, 84532] as const,
};

/**
 * Validates that required environment variables for Base adapter are set.
 */
export function validateBaseConfig() {
    if (!baseConfig.projectId) {
        console.warn('Base adapter: Project ID is missing. Wallet connection may fail.');
    }
}
