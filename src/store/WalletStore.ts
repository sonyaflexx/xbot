import { Wallet } from '@/types';
import { makeAutoObservable } from 'mobx';

class WalletStore {
  wallets: Wallet[] = [];
  currentWallet: Wallet | null = null;

  constructor() {
    makeAutoObservable(this);
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
      this.currentWallet = this.wallets[0];
    }
  };

  setCurrentWallet = (wallet: Wallet | null) => {
    this.currentWallet = wallet;
  };

  clearWallets = () => {
    this.wallets = [];
    this.currentWallet = null;
  };
}

export default new WalletStore();
