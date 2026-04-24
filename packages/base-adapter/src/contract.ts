import { ethers } from 'ethers';

/**
 * Adapter for interacting with smart contracts on the Base network.
 */
export class BaseContractAdapter {
    private provider: ethers.Provider;
    private contract: ethers.Contract;

    /**
     * @param address - Contract address
     * @param abi - Contract ABI
     * @param provider - Ethers provider
     */
    constructor(address: string, abi: any[], provider: ethers.Provider) {
        this.provider = provider;
        this.contract = new ethers.Contract(address, abi, provider);
    }

    /**
     * Executes a read-only method on the contract.
     */
    async read(methodName: string, args: any[] = []) {
        try {
            return await this.contract[methodName](...args);
        } catch (error) {
            console.error(`Error reading from contract method ${methodName}:`, error);
            throw error;
        }
    }

    /**
     * Returns the underlying contract instance.
     */
    getContract() {
        return this.contract;
    }
}
