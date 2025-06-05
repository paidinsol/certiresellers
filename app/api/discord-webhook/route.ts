import { NextRequest, NextResponse } from 'next/server';

interface OrderData {
  orderNumber: string;
  customerEmail: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  sessionId: string;
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();
    
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!discordWebhookUrl) {
      return NextResponse.json({ error: 'Discord webhook URL not configured' }, { status: 500 });
    }

    // Create Discord embed message
    const embed = {
      title: "🛒 New Order Received!",
      color: 0x00ff00, // Green color
      fields: [
        {
          name: "Order Number",
          value: orderData.orderNumber,
          inline: true
        },
        {
          name: "Customer Email",
          value: orderData.customerEmail,
          inline: true
        },
        {
          name: "Total Amount",
          value: `$${orderData.total.toFixed(2)}`,
          inline: true
        },
        {
          name: "Items Ordered",
          value: orderData.items.map(item => 
            `• ${item.name} (x${item.quantity}) - $${item.price.toFixed(2)}`
          ).join('\n'),
          inline: false
        },
        {
          name: "Session ID",
          value: orderData.sessionId,
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Store Order System"
      }
    };

    // Send to Discord
    const discordResponse = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed]
      })
    });

    if (!discordResponse.ok) {
      throw new Error('Failed to send Discord notification');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Discord webhook error:', error);
    return NextResponse.json({ error: 'Failed to send Discord notification' }, { status: 500 });
  }
}