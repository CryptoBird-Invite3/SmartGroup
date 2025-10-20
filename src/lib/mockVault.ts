export const MOCK_VAULT_ADDRESS = '0x0000000000000000000000000000000000000001';
export const MOCK_VAULT_NAME = 'MockVault';

// 可选：最小 ABI（若未来需要调用合约，可使用）
export const MOCK_VAULT_ABI = [
  {
    type: 'function',
    name: 'deposit',
    stateMutability: 'payable',
    inputs: [],
    outputs: [],
  },
  {
    type: 'function',
    name: 'withdraw',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
] as const;