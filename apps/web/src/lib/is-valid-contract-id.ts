import { isValidStacksAddress } from './is-valid-stacks-address';

const CONTRACT_NAME = /^[a-zA-Z][a-zA-Z0-9-]{0,39}$/;

export function isValidContractId(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  const [address, name, ...rest] = value.split('.');
  if (rest.length > 0 || !address || !name) {
    return false;
  }
  return isValidStacksAddress(address) && CONTRACT_NAME.test(name);
}
