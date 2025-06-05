import { loadStripe } from '@stripe/stripe-js';
import { CartItem } from '../context/CartContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const useStripeCheckout = () => {
  const redirectToCheckout = async (items: CartItem[]) => {
    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const { sessionId } = await response.json();

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Something went wrong during checkout. Please try again.');
    }
  };

  return { redirectToCheckout };
};