import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { privateKey, address } = await req.json();

    const wallet = await prisma.wallet.create({
      data: {
        address,
        privateKey,
      },
    });

    return NextResponse.json(wallet);
  } catch (error) {
    console.error('Failed to import wallet:', error);
    return NextResponse.json({ error: 'Failed to import wallet' }, { status: 500 });
  }
}