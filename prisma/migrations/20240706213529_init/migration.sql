-- CreateEnum
CREATE TYPE "Network" AS ENUM ('Solana', 'TON', 'EVM');

-- CreateEnum
CREATE TYPE "SubNetwork" AS ENUM ('Eth', 'BNB', 'Avalanche', 'Cardano', 'Polygon', 'Optimism', 'Base', 'Arbitrum', 'Starknet', 'BobaNetwork', 'Tron', 'Fantom', 'TomoChain', 'zkSync', 'Cosmos', 'Blast', 'Harmony', 'Palm');

-- CreateTable
CREATE TABLE "Drain" (
    "id" SERIAL NOT NULL,
    "subNetwork" "SubNetwork",
    "asset" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "walletId" INTEGER NOT NULL,

    CONSTRAINT "Drain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "network" "Network" NOT NULL,
    "address" TEXT,
    "private_key" TEXT,
    "mnemonic" TEXT,
    "updatedAt" TIMESTAMP(3),
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "drained" BOOLEAN NOT NULL DEFAULT false,
    "received" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Drain" ADD CONSTRAINT "Drain_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
