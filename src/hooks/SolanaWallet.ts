import { Keypair } from '@solana/web3.js';

export class SolanaWallet {
  publicKey: Keypair['publicKey'];
  secretKey: Uint8Array;

  constructor() {
    const keypair = Keypair.generate();
    this.publicKey = keypair.publicKey;
    this.secretKey = keypair.secretKey;
  }
}
