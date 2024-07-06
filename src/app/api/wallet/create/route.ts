import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { address, privateKey } = await req.json();

    const wallet = await prisma.wallet.create({
      data: {
        address,
        private_key: privateKey,
        network: 'EVM'
      },
    });

    return NextResponse.json(wallet);
  } catch (error) {
    console.error('Failed to create wallet:', error);
    return NextResponse.json({ error: 'Failed to create wallet' }, { status: 500 });
  }
}