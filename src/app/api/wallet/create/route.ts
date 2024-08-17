import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { privateKey, mnemonic, address, network } = await req.json();

    const wallet = await prisma.wallet.create({
      data: {
        address,
        private_key: mnemonic ? null : privateKey,
        mnemonic: mnemonic ? mnemonic.phrase || mnemonic : null,
        network: network,
        received: true,
        updatedAt: new Date()
      },
    });

    return NextResponse.json(wallet);
  } catch (error) {
    console.error('Failed to create wallet:', error);
    return NextResponse.json({ error: 'Failed to create wallet' }, { status: 500 });
  }
}