import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically save to a database
    // For now, we'll just log and return success
    console.log('Order received:', body);
    
    // You can add your database logic here
    // const order = await db.order.create({ data: body });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Order saved successfully',
      orderId: `TFT-${Date.now().toString().slice(-6)}`
    });
  } catch (error) {
    console.error('Order save error:', error);
    return NextResponse.json(
      { error: 'Failed to save order' },
      { status: 500 }
    );
  }
}
