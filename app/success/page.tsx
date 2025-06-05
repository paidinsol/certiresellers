'use client';

import { useEffect, useState, Suspense } from 'react';
import { useCart } from '../context/CartContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface OrderSummary {
  orderNumber: string;
  date: string;
  total: number;
  itemCount: number;
}

// Separate component that uses useSearchParams
function SuccessContent() {
  const { dispatch, state } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [discordNotified, setDiscordNotified] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  useEffect(() => {
    if (sessionId && !isProcessed) {
      // Check if this session has already been processed
      const processedSessions = JSON.parse(localStorage.getItem('processedSessions') || '[]');
      
      if (processedSessions.includes(sessionId)) {
        // Session already processed, just show the success message
        setIsProcessed(true);
        setDiscordNotified(true);
        
        // Generate a basic order summary for display
        const summary: OrderSummary = {
          orderNumber: `ORD-${sessionId.slice(-6)}`,
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          total: 0, // We don't have cart data after refresh
          itemCount: 0
        };
        setOrderSummary(summary);
        return;
      }
      
      // First time processing this session
      const cartItems = [...state.items];
      const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      
      // Send Discord notification
      sendDiscordNotification(cartItems, cartTotal, sessionId);
      
      // Clear cart
      dispatch({ type: 'CLEAR_CART' });
      
      // Generate order summary
      const summary: OrderSummary = {
        orderNumber: `ORD-${sessionId.slice(-6)}`,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        total: cartTotal,
        itemCount: cartItemCount
      };
      setOrderSummary(summary);
      
      // Mark this session as processed
      processedSessions.push(sessionId);
      localStorage.setItem('processedSessions', JSON.stringify(processedSessions));
      
      setIsProcessed(true);
    }
  }, [sessionId, dispatch, state.items]);

  const sendDiscordNotification = async (items: any[], total: number, sessionId: string) => {
    try {
      const orderData = {
        orderNumber: `ORD-${sessionId.slice(-6)}`,
        customerEmail: 'customer@example.com',
        total: total,
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        sessionId: sessionId
      };

      const response = await fetch('/api/discord-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      if (response.ok) {
        setDiscordNotified(true);
      }
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful! 🎉</h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your purchase! Your order has been confirmed and our team has been notified via Discord.
            </p>
            
            {orderSummary && (
              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-semibold text-gray-900">{orderSummary.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold text-gray-900">{orderSummary.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold text-gray-900">${orderSummary.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-semibold text-gray-900">{orderSummary.itemCount}</span>
                  </div>
                  {discordNotified && (
                    <div className="flex items-center justify-center mt-4 p-3 bg-blue-50 rounded-lg">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      <span className="text-blue-700 text-sm font-medium">Team notified via Discord ✓</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What happens next?</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Order Confirmation</h3>
                <p className="text-gray-600">You'll receive an email confirmation shortly with your order details.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Processing</h3>
                <p className="text-gray-600">We'll prepare your order for shipping within the week of buying.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Shipping</h3>
                <p className="text-gray-600">You'll receive tracking information once your order ships.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/products" 
            className="flex-1 bg-gray-900 text-white text-center px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/" 
            className="flex-1 bg-white text-gray-900 text-center px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}


// Add this function to clean up old sessions (optional)
const cleanupOldSessions = () => {
  const processedSessions = JSON.parse(localStorage.getItem('processedSessions') || '[]');
  const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  
  // Keep only recent sessions (this is a simple approach)
  // In a real app, you'd store timestamps with session IDs
  if (processedSessions.length > 50) {
    const recentSessions = processedSessions.slice(-25);
    localStorage.setItem('processedSessions', JSON.stringify(recentSessions));
  }
};


// Main component with Suspense boundary
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}