import { makeAutoObservable } from 'mobx';

interface Chain {
  name: string;
  rpcUrl: string;
}

class ChainStore {
  chains: Chain[] = [
    {
      name: 'BNB Smart Chain',
      rpcUrl: 'https://bsc-dataseed.binance.org/',
    },
    {
      name: 'Ethereum',
      rpcUrl: '',
    },
    {
      name: 'Base',
      rpcUrl: 'https://base-rpc.example.com/',
    },
    {
      name: 'The Open Network',
      rpcUrl: 'https://ton.example.com/',
    },
    {
      name: 'Solana',
      rpcUrl: 'https://api.mainnet.solana.com',
    },
  ];

  currentChain: Chain | null = null;

  constructor() {
    makeAutoObservable(this);
    this.setCurrentChain('Ethereum');
  }

  setCurrentChain = (chainName: string) => {
    const foundChain = this.chains.find(chain => chain.name === chainName);
    if (foundChain) {
      this.currentChain = foundChain;
      localStorage.setItem('currentChain', chainName);
    } else {
      console.error(`Chain '${chainName}' not found.`);
    }
  }
}

export default new ChainStore();