'use client';

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import chainStore from '@/store/ChainStore';
import EthereumLogo from './icons/EthereumLogo';
import BnbLogo from './icons/BnbLogo';
import Image from 'next/image';
import axios from 'axios';

const TokensList = observer(() => {
  const [cryptoData, setCryptoData] = useState({
      ethereum: { price: 0, change: 0 },
      bnb: { price: 0, change: 0 },
      base: { price: 0, change: 0 },
      ton: { price: 0, change: 0 },
      sol: { price: 0, change: 0 },
  });

  const getCurrentNativeToken = () => {
    switch (chainStore.currentChain?.name) {
      case 'Ethereum':
        return {
          name: 'Ethereum',
          nativeToken: 'ETH',
          logo: <EthereumLogo width="38" height="38" />,
          price: cryptoData.ethereum.price,
          change: cryptoData.ethereum.change,
        };
      case 'BNB Smart Chain':
        return {
          name: 'Binance Coin',
          nativeToken: 'BNB',
          logo: <BnbLogo width="38" height="38" />,
          price: cryptoData.bnb.price,
          change: cryptoData.bnb.change,
        };
      case 'Base':
        return {
          name: 'Ethereum',
          nativeToken: 'ETH',
          logo: <EthereumLogo width="38" height="38" />,
          price: cryptoData.base.price,
          change: cryptoData.base.change,
        };
      case 'The Open Network':
        return {
          name: 'The Open Network',
          nativeToken: 'TON',
          logo: <Image src={'https://chainspy.org/static/ton/ton_symbol.png'} width={38} height={38} alt="TON Logo" />,
          price: cryptoData.ton.price,
          change: cryptoData.ton.change,
        };
      case 'Solana':
        return {
          name: 'Solana',
          nativeToken: 'SOL',
          logo: <Image src={'https://chainspy.org/static/sol/solana.png'} width={38} height={38} alt="Solana Logo" />,
          price: cryptoData.sol.price,
          change: cryptoData.sol.change,
        };
      default:
        return {
          name: 'Unknown',
          nativeToken: 'UNKNOWN',
          logo: <div className="size-[38px] rounded-full text-xs N" />,
          price: 0,
          change: 0,
        };
    }
  };

  const { name, nativeToken, logo, price, change } = getCurrentNativeToken();

  useEffect(() => {
    const fetchCryptoPrices = async () => {
        try {
          const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
              ids: 'ethereum,binancecoin,toncoin,solana',
              vs_currencies: 'usd',
              include_24hr_change: true
            },
          });
      
          if (response.status === 200) {
            const { ethereum, binancecoin, toncoin, solana } = response.data;
  
            setCryptoData({
              ethereum: {
                price: ethereum ? ethereum.usd : 0,
                change: ethereum ? ethereum.usd_24h_change : 0,
              },
              bnb: {
                price: binancecoin ? binancecoin.usd : 0,
                change: binancecoin ? binancecoin.usd_24h_change : 0,
              },
              base: {
                price: ethereum ? ethereum.usd : 0,
                change: ethereum ? ethereum.usd_24h_change : 0,
              },
              ton: {
                price: toncoin ? toncoin.usd : 0,
                change: toncoin ? toncoin.usd_24h_change : 0,
              },
              sol: {
                price: solana ? solana.usd : 0,
                change: solana ? solana.usd_24h_change : 0,
              },
            });
          }
        } catch (error) {
          console.error('Error fetching crypto prices:', error);
        }
      };      

    fetchCryptoPrices();
  }, []);

  return (
    <ul className="mt-3 pl-0">
      <li className="py-[10px] px-3 bg-tg-theme-secondary-bg rounded-xl flex items-center justify-between text-sm gap-3">
        {logo}
        <div className="flex flex-col flex-1">
          <span className="font-bold">{name}</span>
          <div className='flex gap-2'>
            <span className="font-light text-tg-theme-hint">{price.toFixed(2)}$</span>
            <span className={`font-light ${change >= 0 ? 'text-green-500' : 'text-tg-theme-destructive-text'}`}>{change.toFixed(2)}%</span>
          </div>
        </div>
        <div className="flex flex-col text-right">
          <span className="font-bold">0 {nativeToken}</span>
          <span className="font-light text-tg-theme-hint">0$</span>
        </div>
      </li>
    </ul>
  );
});

export default TokensList;
