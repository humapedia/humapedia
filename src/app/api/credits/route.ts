import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schemas
const GetCreditsSchema = z.object({
  userId: z.string().optional(),
});

const PurchaseCreditsSchema = z.object({
  amount: z.number().min(1, 'Amount must be at least 1'),
  paymentMethod: z.enum(['credit_card', 'paypal', 'stripe']),
  userId: z.string().optional(),
});

// Mock user credits data
const mockUserCredits = {
  'user-1': {
    userId: 'user-1',
    credits: 25,
    totalPurchased: 100,
    totalUsed: 75,
    lastPurchase: '2024-01-15T10:30:00Z',
    purchaseHistory: [
      {
        id: 'purchase-1',
        amount: 50,
        paymentMethod: 'credit_card',
        date: '2024-01-15T10:30:00Z',
        cost: 29.99,
      },
      {
        id: 'purchase-2',
        amount: 50,
        paymentMethod: 'paypal',
        date: '2024-01-10T14:20:00Z',
        cost: 29.99,
      },
    ],
    usageHistory: [
      {
        id: 'usage-1',
        type: 'face_search',
        creditsUsed: 3,
        date: '2024-01-16T09:15:00Z',
        description: 'Face search for John Smith',
      },
      {
        id: 'usage-2',
        type: 'face_search',
        creditsUsed: 3,
        date: '2024-01-15T16:45:00Z',
        description: 'Face search for Sarah Johnson',
      },
    ],
  },
  'user-2': {
    userId: 'user-2',
    credits: 7,
    totalPurchased: 30,
    totalUsed: 23,
    lastPurchase: '2024-01-12T11:00:00Z',
    purchaseHistory: [
      {
        id: 'purchase-3',
        amount: 30,
        paymentMethod: 'stripe',
        date: '2024-01-12T11:00:00Z',
        cost: 19.99,
      },
    ],
    usageHistory: [
      {
        id: 'usage-3',
        type: 'face_search',
        creditsUsed: 3,
        date: '2024-01-14T13:30:00Z',
        description: 'Face search for Michael Chen',
      },
    ],
  },
};

// Credit pricing
const creditPricing = {
  small: { amount: 10, price: 4.99, savings: 0 },
  medium: { amount: 30, price: 12.99, savings: 2.97 },
  large: { amount: 100, price: 29.99, savings: 19.01 },
  enterprise: { amount: 500, price: 99.99, savings: 149.51 },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'user-1'; // Default for demo
    
    // Validate request
    const validatedData = GetCreditsSchema.parse({ userId });
    
    // Get user credits (mock implementation)
    const userCredits = mockUserCredits[userId as keyof typeof mockUserCredits] || {
      userId,
      credits: 0,
      totalPurchased: 0,
      totalUsed: 0,
      lastPurchase: null,
      purchaseHistory: [],
      usageHistory: [],
    };
    
    return NextResponse.json({
      success: true,
      credits: userCredits,
      pricing: creditPricing,
      usage: {
        faceSearchCost: 3,
        textSearchCost: 0, // Free
        bulkSearchCost: 1,
      },
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request parameters', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Get credits error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = PurchaseCreditsSchema.parse(body);
    
    const userId = validatedData.userId || 'user-1'; // Default for demo
    const { amount, paymentMethod } = validatedData;
    
    // Calculate cost based on amount
    let cost = 0;
    let savings = 0;
    
    if (amount <= 10) {
      cost = (amount / 10) * creditPricing.small.price;
    } else if (amount <= 30) {
      cost = (amount / 30) * creditPricing.medium.price;
      savings = (amount / 30) * creditPricing.medium.savings;
    } else if (amount <= 100) {
      cost = (amount / 100) * creditPricing.large.price;
      savings = (amount / 100) * creditPricing.large.savings;
    } else {
      cost = (amount / 500) * creditPricing.enterprise.price;
      savings = (amount / 500) * creditPricing.enterprise.savings;
    }
    
    // Mock payment processing
    const paymentResult = await processPayment(paymentMethod, cost);
    
    if (!paymentResult.success) {
      return NextResponse.json(
        { error: 'Payment failed', details: paymentResult.error },
        { status: 402 }
      );
    }
    
    // Update user credits (mock implementation)
    const userCredits = mockUserCredits[userId as keyof typeof mockUserCredits];
    if (userCredits) {
      userCredits.credits += amount;
      userCredits.totalPurchased += amount;
      userCredits.lastPurchase = new Date().toISOString();
      
      const purchaseId = `purchase-${Date.now()}`;
      userCredits.purchaseHistory.push({
        id: purchaseId,
        amount,
        paymentMethod,
        date: new Date().toISOString(),
        cost,
      });
    }
    
    return NextResponse.json({
      success: true,
      purchase: {
        id: `purchase-${Date.now()}`,
        amount,
        cost,
        savings,
        paymentMethod,
        date: new Date().toISOString(),
        transactionId: paymentResult.transactionId,
      },
      updatedCredits: userCredits?.credits || amount,
      message: `Successfully purchased ${amount} credits for $${cost.toFixed(2)}`,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid purchase data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Purchase credits error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Mock payment processing function
async function processPayment(paymentMethod: string, amount: number) {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock payment success (90% success rate)
  const success = Math.random() > 0.1;
  
  if (success) {
    return {
      success: true,
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      paymentMethod,
    };
  } else {
    return {
      success: false,
      error: 'Payment declined. Please check your payment method and try again.',
    };
  }
} 