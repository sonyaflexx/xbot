import { makeAutoObservable } from "mobx";
import { Wallet } from "@/types"; 

class ModalStore {
  showNetworkModal = false;
  showWalletModal = false;
  showEditWalletModal = false;
  showMenuModal = false;
  showAddWalletModal = false;

  walletToEdit: Wallet | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openMenuModal = () => {
    this.showMenuModal = true;
  };

  closeMenuModal = () => {
    this.showMenuModal = false;
  };

  openNetworkModal = () => {
    this.showNetworkModal = true;
  };

  closeNetworkModal = () => {
    this.showNetworkModal = false;
  };

  openWalletModal = () => {
    this.showWalletModal = true;
  };

  closeWalletModal = () => {
    this.showWalletModal = false;
  };

  openAddWalletModal = () => {
    this.showAddWalletModal = true;
  };

  closeAddWalletModal = () => {
    this.showAddWalletModal = false;
  };

  openEditWalletModal = () => {
    this.showEditWalletModal = true;
  };

  closeEditWalletModal = () => {
    this.showEditWalletModal = false;
    this.walletToEdit = null;
  };

  setCurrentWalletToEdit = (wallet: Wallet) => {
    this.walletToEdit = wallet;
  };
}

const modalStore = new ModalStore();
export default modalStore;
