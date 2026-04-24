import { createAppKit } from '@reown/appkit';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { baseConfig } from './config';

/**
 * Adapter for Base network wallet interactions using Reown AppKit.
 */
export class BaseWallet {
    private readonly appKit: any;

    constructor() {
        this.appKit = createAppKit({
            adapters: [new EthersAdapter()],
            ...baseConfig
        });
    }

    /** Triggers the connection flow */
    async connect(): Promise<void> {
        await this.appKit.open();
    }

    /** Disconnects the wallet */
    async disconnect(): Promise<void> {
        await this.appKit.disconnect();
    }

    /** Returns the current wallet address */
    getAddress(): string | null {
        return this.appKit.getAddress() || null;
    }

    /** Returns current network chain ID */
    getChainId(): number | null {
        return this.appKit.getChainId() || null;
    }

    /** Returns the native balance in ETH */
    async getBalance(): Promise<string | null> {
        const provider = this.appKit.getWalletProvider();
        const address = this.getAddress();
        if (!provider || !address) return null;

        try {
            const balance = await provider.getBalance(address);
            return (Number(balance) / 1e18).toFixed(4);
        } catch (error) {
            console.error('Base adapter: Error fetching balance', error);
            return null;
        }
    }

    /** Checks if wallet is connected */
    isConnected(): boolean {
        return !!this.appKit.getIsConnected();
    }
}
