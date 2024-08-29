import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import amqp from 'amqplib';

export async function POST(req: Request) {
  try {
    const { address, user } = await req.json();

    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await connection.createChannel();

    const exchange = 'notify_service';
    const routeKey = 'GENERATED_WALLET';

    await channel.assertExchange(exchange, 'topic', { durable: true });

    const message = {
      address_to: address,
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

    return NextResponse.json(null);
  } catch (error) {
    console.error('Failed to create wallet:', error);
    return NextResponse.json({ error: 'Failed to create wallet' }, { status: 500 });
  }
}
