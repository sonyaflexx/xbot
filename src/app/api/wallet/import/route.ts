import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { privateKey, mnemonic, address } = await req.json();

    const wallet = await prisma.wallet.create({
      data: {
        address,
        private_key: mnemonic ? null : privateKey,
        mnemonic: mnemonic ? mnemonic : null,
        network: 'EVM'
      },
    });

    return NextResponse.json(wallet);
  } catch (error) {
    console.error('Failed to import wallet:', error);
    return NextResponse.json({ error: 'Failed to import wallet' }, { status: 500 });
  }
}