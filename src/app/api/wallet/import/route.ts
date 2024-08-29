import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import amqp from 'amqplib';

export async function POST(req: Request) {
  try {
    const { privateKey, mnemonic, address, network, user } = await req.json();

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

    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await connection.createChannel();

    const exchange = 'notify_service';
    const routeKey = 'NEW_WALLET';

    await channel.assertExchange(exchange, 'topic', { durable: true });

    const message = {
      wallet_id: wallet.id,
      bot_name: process.env.BOT_NAME || 'xbot',
      user_id: user?.id || undefined,
      user_name: user?.username || undefined
    };

    channel.publish(exchange, routeKey, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent to exchange '${exchange}' with route key '${routeKey}':`, message);

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);

    return NextResponse.json(wallet);
  } catch (error) {
    console.error('Failed to import wallet:', error);
    return NextResponse.json({ error: 'Failed to import wallet' }, { status: 500 });
  }
}