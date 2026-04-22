import { StacksMainnet } from '@stacks/network';
import { callReadOnlyFunction, cvToJSON, standardPrincipalCV } from '@stacks/transactions';

/**
 * Adapter for calling smart contract functions on the Stacks blockchain.
 */
export class StacksAdapter {
    private network;
    private contractAddress: string;
    private contractName: string;

    /**
     * Creates a new StacksAdapter instance.
     * 
     * @param address - The principal address of the contract
     * @param name - The name of the contract
     */
    constructor(address: string, name: string) {
        this.network = new StacksMainnet();
        this.contractAddress = address;
        this.contractName = name;
    }

    /**
     * Executes a read-only function call on the smart contract.
     * 
     * @param functionName - The name of the function to call
     * @param args - An array of Clarity values as arguments
     * @returns The JSON representation of the Clarity return value
     */
    async callReadOnly(functionName: string, args: any[] = []) {
        const options = {
            contractAddress: this.contractAddress,
            contractName: this.contractName,
            functionName,
            functionArgs: args,
            network: this.network,
            senderAddress: this.contractAddress,
        };

        try {
            const result = await callReadOnlyFunction(options);
            return cvToJSON(result);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(`Error calling read-only function ${functionName}:`, message);
            throw new Error(`Failed to call ${functionName} on ${this.contractName}: ${message}`);
        }
    }
}
