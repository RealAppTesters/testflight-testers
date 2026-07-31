import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for orders (in production, use a database)
const orders: any[] = [];

// Generate order ID
function generateOrderId(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TFT-${timestamp}-${random}`;
}

// Send admin notification via mailto (opens email client)
function getAdminEmailBody(orderData: any): string {
  return `New Order Received! 🎉

Order ID: ${orderData.orderId}
Customer Email: ${orderData.customerEmail || 'Not provided'}
Customer Name: ${orderData.customerName || 'Not provided'}
Phone: ${orderData.customerPhone || 'Not provided'}

Testing Details:
- Type: ${orderData.typeLabel || 'Not specified'}
- Testers: ${orderData.testers || 0}
- Hours: ${orderData.hours || 0}h
- Delivery: ${orderData.delivery || 'Standard'}
- Total: $${orderData.total || 0} USD

Payment Status: Confirmed ✅

Customer Message:
${orderData.message || 'No message provided'}

---
View order: ${process.env.NEXT_PUBLIC_APP_URL}/payment/success?id=${orderData.orderId}
`;
}

// Get customer confirmation email body
function getCustomerEmailBody(orderData: any): string {
  return `Hello! 🎉

Thank you for your order! Your TestFlight QA testing has been confirmed.

📋 Order Details:
Order ID: ${orderData.orderId}
Testing Type: ${orderData.typeLabel || 'Not specified'}
Testers: ${orderData.testers || 0}
Hours: ${orderData.hours || 0}h
Delivery: ${orderData.delivery || 'Standard'}
Total: $${orderData.total || 0} USD

📱 Next Steps:
1. Send us your TestFlight public link
2. Provide your email for updates
3. We'll start testing within 24 hours

📧 Reply to this email or contact us at support@testflighttesters.com
📱 WhatsApp: https://wa.me/${process.env.WHATSAPP_BUSINESS_NUMBER || '27791234567'}

Thank you for choosing TestFlightTesters! 🚀

---
TestFlightTesters
Professional iOS QA Testing Platform
${process.env.NEXT_PUBLIC_APP_URL}
`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventType = req.headers.get('paypal-webhook-event-type') || '';

    console.log(`📨 Webhook received: ${eventType}`);

    // Only process completed payment events
    if (eventType === 'PAYMENT.CAPTURE.COMPLETED' || eventType === 'CHECKOUT.ORDER.APPROVED') {
      const resource = body.resource || body;
      const purchaseUnit = resource.purchase_units?.[0] || {};
      const amount = purchaseUnit.amount || {};
      const payer = resource.payer || {};

      // Extract customer info from the order
      const orderData = {
        orderId: generateOrderId(),
        customerEmail: payer.email_address || 'customer@example.com',
        customerName: payer.name?.given_name || 'Customer',
        customerPhone: payer.phone?.phone_number?.national_number || '',
        typeLabel: purchaseUnit.description || 'QA Testing',
        testers: 5, // Default - would come from session
        hours: 1, // Default - would come from session
        delivery: 'Standard (2-3 days)', // Default - would come from session
        total: parseFloat(amount.value || '0'),
        currency: amount.currency_code || 'USD',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        message: 'Order confirmed via PayPal webhook',
      };

      // Save order (in production, save to database)
      orders.push(orderData);

      // Log the order
      console.log('💾 Order saved:', orderData);

      // Send admin notification via mailto (in production, you'd use email API)
      console.log('📧 Admin email body:', getAdminEmailBody(orderData));

      // In production, you would send actual emails here
      // For now, we store the order in session for the success page
      // The customer will still use mailto: from the success page

      return NextResponse.json({
        success: true,
        message: 'Order processed successfully',
        orderId: orderData.orderId,
        order: orderData
      });
    }

    // Handle other events
    return NextResponse.json({
      success: true,
      message: `Event ${eventType} received but not processed`
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve orders (for testing)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');

  if (orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      return NextResponse.json({ success: true, order });
    }
    return NextResponse.json(
      { error: 'Order not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    orders: orders,
    count: orders.length
  });
}
