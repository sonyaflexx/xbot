import { Wallet } from '@/types';
import { makeAutoObservable, autorun } from 'mobx';

class WalletStore {
  wallets: Wallet[] = [];
  currentWallet: Wallet | null = null;

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== 'undefined') {
      this.loadFromLocalStorage();

      autorun(() => {
        this.saveToLocalStorage();
      });
    }
  }

  setWallets = (wallets: Wallet[]) => {
    this.wallets = wallets;
  };

  addWallet = (wallet: Wallet) => {
    this.wallets.push(wallet);
  };

  updateWallet = (updatedWallet: Wallet) => {
    this.wallets = this.wallets.map(wallet => (
      wallet.address === updatedWallet.address ? updatedWallet : wallet
    ));
    if (this.currentWallet && this.currentWallet.address === updatedWallet.address) {
      this.currentWallet = updatedWallet;
    }
  };

  deleteWallet = (walletToDelete: Wallet) => {
    this.wallets = this.wallets.filter(wallet => wallet.address !== walletToDelete.address);
    if (this.currentWallet && this.currentWallet.address === walletToDelete.address) {
      this.currentWallet = this.wallets[0] || null;
    }
  };

  setCurrentWallet = (wallet: Wallet | null) => {
    this.currentWallet = wallet;
  };

  clearWallets = () => {
    this.wallets = [];
    this.currentWallet = null;
  };

  saveToLocalStorage() {
    localStorage.setItem('wallets', JSON.stringify(this.wallets));
    localStorage.setItem('currentWallet', JSON.stringify(this.currentWallet));
  }

  loadFromLocalStorage() {
    const wallets = localStorage.getItem('wallets');
    const currentWallet = localStorage.getItem('currentWallet');

    if (wallets) {
      this.wallets = JSON.parse(wallets);
    }

    if (currentWallet) {
      this.currentWallet = JSON.parse(currentWallet);
    }
  }
}

export default new WalletStore();
