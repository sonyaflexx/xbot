import { makeAutoObservable, autorun } from 'mobx';

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

    if (typeof window !== 'undefined') {
      this.loadFromLocalStorage();
  
      autorun(() => {
        this.saveToLocalStorage();
      });
    }
  }

  setCurrentChain = (chainName: string) => {
    const foundChain = this.chains.find(chain => chain.name === chainName);
    if (foundChain) {
      this.currentChain = foundChain;
    } else {
      console.error(`Chain '${chainName}' not found.`);
    }
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem('currentChain', JSON.stringify(this.currentChain));
    } catch (error) {
      console.error('Failed to save currentChain to localStorage:', error);
    }
  }

  loadFromLocalStorage() {
    try {
      const currentChain = localStorage.getItem('currentChain');
      if (currentChain) {
        const parsedChain = JSON.parse(currentChain);
        if (this.chains.find(chain => chain.name === parsedChain.name)) {
          this.currentChain = parsedChain;
        } else {
          console.error(`Saved chain '${parsedChain.name}' not found in available chains.`);
        }
      } else {
        this.setCurrentChain('Ethereum');
      }
    } catch (error) {
      console.error('Failed to load currentChain from localStorage:', error);
      this.setCurrentChain('Ethereum');
    }
  }
}

export default new ChainStore();
