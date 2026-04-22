import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { stacksConfig } from './config';

/**
 * Adapter for Stacks wallet interactions using @stacks/connect.
 */
export class StacksWallet {
    private appConfig: AppConfig;
    private userSession: UserSession;

    constructor() {
        this.appConfig = new AppConfig(['store_write', 'publish_data']);
        this.userSession = new UserSession({ appConfig: this.appConfig });
    }

    /**
     * Triggers the Stacks connect authentication flow.
     */
    async connect() {
        showConnect({
            appDetails: {
                name: stacksConfig.appName,
                icon: stacksConfig.appIcon
            },
            onFinish: () => {
                window.location.reload();
            },
            userSession: this.userSession
        });
    }

    /**
     * Signs the user out and reloads the page.
     */
    async disconnect() {
        this.userSession.signUserOut();
        window.location.reload();
    }

    /**
     * Returns the current user's Stacks address based on the configured network.
     * 
     * @returns The address string or null if not connected
     */
    getAddress(): string | null {
        if (!this.isConnected()) return null;
        const userData = this.userSession.loadUserData();
        const network = stacksConfig.network;
        return network.isMainnet() 
            ? userData.profile.stxAddress.mainnet 
            : userData.profile.stxAddress.testnet;
    }

    /**
     * Returns a display name for the current network.
     */
    getNetwork(): string {
        return stacksConfig.network.isMainnet() ? 'Mainnet' : 'Testnet';
    }

    /**
     * Fetches the STX balance for the current user.
     * 
     * @returns The balance as a formatted string (STX) or null if it fails
     */
    async getBalance(): Promise<string | null> {
        const address = this.getAddress();
        if (!address) return null;

        try {
            const response = await fetch(
                `${stacksConfig.network.coreApiUrl}/extended/v1/address/${address}/balances`
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch balance: ${response.statusText}`);
            }
            const data = await response.json();
            return (Number(data.stx.balance) / 1e6).toFixed(2);
        } catch (error) {
            console.error('Error fetching balance:', error);
            return null;
        }
    }

    /**
     * Checks if a user is currently signed in.
     */
    isConnected(): boolean {
        return this.userSession.isUserSignedIn();
    }

    /**
     * Returns the underlying UserSession instance.
     */
    getUserSession() {
        return this.userSession;
    }
}
