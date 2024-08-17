export interface Wallet {
    title: string;
    address: string;
    privateKey: string;
    network: 'EVM' | 'TON' | 'Solana'; 
}
