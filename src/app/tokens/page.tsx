'use client'

import React, { useState, useEffect } from 'react';
import TextInput from '@/components/TextInput';
import ChainStore from '@/store/ChainStore';
import Image from 'next/image';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';

export default function Tokens() {
    const [tokenAddress, setTokenAddress] = useState('');
    const [tokenInfo, setTokenInfo] = useState({
        name: '',
        balance: '',
    });

    const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    tg.MainButton.text = "Добавить";
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
      router.push('/')
    });

    return () => {
      tg.MainButton.hide();
    };
  }
  }, []);

    useEffect(() => {
        const loadTokenInfo = async () => {
            if (!tokenAddress || !ChainStore.currentChain) return;

            try {
                let provider;

                switch (ChainStore.currentChain?.name) {
                    case 'Ethereum':
                        provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/84842078b09946638c03157f83405213');
                        break;
                    case 'BNB Smart Chain':
                        provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
                        break;
                    case 'Base':
                        provider = new ethers.JsonRpcProvider('https://mainnet.base.org');
                        break;
                    case 'The Open Network':
                        provider = new ethers.JsonRpcProvider('');
                        break;
                    case 'Solana':
                        provider = new ethers.JsonRpcProvider('https://api.mainnet.solana.com');
                        break;
                    default:
                        throw new Error('Unsupported chain');
                }

                const abi = ['function name() public view returns (string)', 'function balanceOf(address) public view returns (uint256)'];
                const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
                const name = await tokenContract.name();

                const accounts = await provider.listAccounts();
                const balance = await tokenContract.balanceOf(accounts[0]);

                setTokenInfo({
                    name,
                    balance: ethers.formatUnits(balance, 18),
                });
            } catch (error) {
                console.error('Error loading token information:', error);
            }
        };

        loadTokenInfo();
    }, [tokenAddress, ChainStore.currentChain]);

    const handleTokenClick = (address: string) => {
        setTokenAddress(address);
    };

    const getRecommendedTokens = () => {
        switch (ChainStore.currentChain?.name) {
            case 'Ethereum':
                return [
                    {
                        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                        imageSrc: 'https://static.metaswap.codefi.network/api/v1/tokenIcons/56/0x55d398326f99059ff775485246999027b3197955.png',
                        name: 'Tether USD',
                    },
                    {
                        address: '0x5c559f3ee9a81da83e069c0093471cb05d84052a',
                        imageSrc: 'https://chainspy.org/static/bp.jpg',
                        name: 'BabyPepe',
                    },
                ];
            case 'BNB Smart Chain':
                return [
                    {
                        address: '0x55d398326f99059ff775485246999027b3197955',
                        imageSrc: 'https://static.metaswap.codefi.network/api/v1/tokenIcons/56/0x55d398326f99059ff775485246999027b3197955.png',
                        name: 'Tether USD',
                    },
                    {
                        address: '0x539dd61945732ffbf796da51662c113ac50adbc3',
                        imageSrc: 'https://chainspy.org/static/bct.jpeg',
                        name: 'Bear Country Token',
                    },
                    {
                        address: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
                        imageSrc: 'https://static.metaswap.codefi.network/api/v1/tokenIcons/56/0xba2ae424d960c26247dd6c32edc70b295c744c43.png',
                        name: 'Dogecoin',
                    },
                    {
                        address: '0x2859e4544c4bb03966803b044a93563bd2d0dd4d',
                        imageSrc: 'https://static.metaswap.codefi.network/api/v1/tokenIcons/56/0x2859e4544c4bb03966803b044a93563bd2d0dd4d.png',
                        name: 'SHIBA INU',
                    },
                ];
            case 'Base':
                return [
                    {
                        address: '0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca',
                        imageSrc: 'https://static.metaswap.codefi.network/api/v1/tokenIcons/8453/0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca.png',
                        name: 'USD Base Coin',
                    },
                    {
                        address: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
                        imageSrc: 'https://static.metaswap.codefi.network/api/v1/tokenIcons/8453/0x4ed4e862860bed51a9570b96d89af5e1b0efefed.png',
                        name: 'Degen',
                    },
                    {
                        address: '0x532f27101965dd16442e59d40670faf5ebb142e4',
                        imageSrc: 'https://static.metaswap.codefi.network/api/v1/tokenIcons/8453/0x532f27101965dd16442e59d40670faf5ebb142e4.png',
                        name: 'Brett',
                    },
                    {
                        address: '0xac1bd2486aaf3b5c0fc3fd868558b082a531b2b4',
                        imageSrc: 'https://static.metaswap.codefi.network/api/v1/tokenIcons/8453/0xac1bd2486aaf3b5c0fc3fd868558b082a531b2b4.png',
                        name: 'Toshi',
                    },
                ];
            case 'The Open Network':
                return [
                ];
            case 'Solana':
                return [
                ];
            default:
                return [];
        }
    };

    const recommendedTokens = getRecommendedTokens();

    return (
        <main className="flex p-6 flex-col">
            <div className="flex flex-col items-center mb-5">
                <span className="text-[128px] leading-[128px] pb-6">➕</span>
                <h1 className="text-2xl font-bold">Новый токен</h1>
            </div>

            { recommendedTokens && recommendedTokens.length > 0 && (
                <div>
                    <h2 className="text-sm font-bold text-tg-theme-hint">Рекомендуемые</h2>
                    <ul className="py-2 flex gap-4">
                        {recommendedTokens.map((token, index) => (
                            <li key={index}>
                                <Image 
                                    src={token.imageSrc}
                                    width={45}
                                    height={45}
                                    alt={token.name}
                                    className="rounded-full"
                                    onClick={() => handleTokenClick(token.address)}
                                    />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex justify-between mb-2">
                <h2 className="text-sm font-bold text-tg-theme-hint">Сеть</h2>
                <span className="text-sm">{ChainStore.currentChain?.name}</span>
            </div>

            <TextInput label="Адрес контракта" value={tokenAddress} setValue={setTokenAddress} />

            {tokenInfo.name && (
                <div className='mt-2'>
                    <div className='flex justify-between'>
                        <span className='text-sm font-bold text-tg-theme-hint'>Название</span>
                        <span className='text-sm'>{tokenInfo.name}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-sm font-bold text-tg-theme-hint'>Баланс</span>
                        <span className='text-sm'>{tokenInfo.balance} USDT</span>
                    </div>
                </div>
            )}
        </main>
    );
}
