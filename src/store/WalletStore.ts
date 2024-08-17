import { makeAutoObservable, autorun } from 'mobx';
import { Wallet } from '@/types';
import ChainStore from './ChainStore'; 

class WalletStore {
  allWallets: Wallet[] = [];
  wallets: Wallet[] = []; 
  currentWallets: {
    EVM: Wallet | null;
    TON: Wallet | null;
    SOL: Wallet | null;
  } = {
    EVM: null,
    TON: null,
    SOL: null,
  };
  currentWallet: Wallet | null = null;

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== 'undefined') {
      this.loadFromLocalStorage();

      autorun(() => {
        this.saveToLocalStorage();
      });

      autorun(() => {
        this.filterWalletsByChain();
      });
    }
  }

  filterWalletsByChain() {
    const currentChainName = ChainStore.currentChain?.name;
    if (currentChainName) {
      switch (currentChainName) {
        case 'BNB Smart Chain':
        case 'Ethereum':
        case 'Base':
          this.wallets = this.allWallets.filter(wallet => wallet.network === 'EVM');
          if (!this.currentWallet || !this.wallets.some(wallet => wallet.address === this.currentWallet?.address)) {
            this.currentWallet = this.wallets[0] || null;
          }
          this.currentWallets.EVM = this.currentWallet;
          break;
        case 'The Open Network':
          this.wallets = this.allWallets.filter(wallet => wallet.network === 'TON');
          if (!this.currentWallet || !this.wallets.some(wallet => wallet.address === this.currentWallet?.address)) {
            this.currentWallet = this.wallets[0] || null;
          }
          this.currentWallets.TON = this.currentWallet;
          break;
        case 'Solana':
          this.wallets = this.allWallets.filter(wallet => wallet.network === 'Solana');
          if (!this.currentWallet || !this.wallets.some(wallet => wallet.address === this.currentWallet?.address)) {
            this.currentWallet = this.wallets[0] || null;
          }
          this.currentWallets.SOL = this.currentWallet;
          break;
        default:
          this.wallets = [];
          this.currentWallet = null;
      }
    } else {
      this.wallets = [];
      this.currentWallet = null;
    }
  }

  setAllWallets = (wallets: Wallet[]) => {
    this.allWallets = wallets;
    this.filterWalletsByChain(); 
  };

  addWallet = (wallet: Wallet) => {
    this.allWallets.push(wallet);
    this.filterWalletsByChain(); 
  };

  updateWallet = (updatedWallet: Wallet) => {
    this.allWallets = this.allWallets.map(wallet =>
      wallet.address === updatedWallet.address ? updatedWallet : wallet
    );
    this.filterWalletsByChain();
  };

  deleteWallet = (walletToDelete: Wallet) => {
    this.allWallets = this.allWallets.filter(wallet => wallet.address !== walletToDelete.address);
    this.filterWalletsByChain();
  };

  setCurrentWallet = (wallet: Wallet | null) => {
    const currentChainName = ChainStore.currentChain?.name;
    if (currentChainName) {
      switch (currentChainName) {
        case 'BNB Smart Chain':
        case 'Ethereum':
        case 'Base':
          this.currentWallets.EVM = wallet;
          break;
        case 'The Open Network':
          this.currentWallets.TON = wallet;
          break;
        case 'Solana':
          this.currentWallets.SOL = wallet;
          break;
      }
      this.currentWallet = wallet;
    }
  };

  clearWallets = () => {
    this.allWallets = [];
    this.wallets = [];
    this.currentWallets = {
      EVM: null,
      TON: null,
      SOL: null,
    };
    this.currentWallet = null;
  };

  saveToLocalStorage() {
    localStorage.setItem('allWallets', JSON.stringify(this.allWallets));
    localStorage.setItem('currentWallets', JSON.stringify(this.currentWallets));
  }

  loadFromLocalStorage() {
    const allWallets = localStorage.getItem('allWallets');
    const currentWallets = localStorage.getItem('currentWallets');

    if (allWallets) {
      this.allWallets = JSON.parse(allWallets);
    }

    if (currentWallets) {
      this.currentWallets = JSON.parse(currentWallets);
    }

    this.filterWalletsByChain();
  }
}

export default new WalletStore();
