'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useStripeCheckout } from '../hooks/useStripeCheckout';
import { 
  HiShoppingCart, 
  HiX, 
  HiMinus, 
  HiPlus, 
  HiTrash 
} from 'react-icons/hi';

export default function Cart() {
  const { state, dispatch } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { redirectToCheckout } = useStripeCheckout();

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleCheckout = async () => {
    if (state.items.length === 0) return;
    
    setIsLoading(true);
    try {
      await redirectToCheckout(state.items);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <HiShoppingCart className="w-6 h-6" />
        {state.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {state.itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Shopping Cart</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <HiShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-2 border-b">
                      <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                        <span className="text-xs text-gray-500">IMG</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.name}</h4>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <HiMinus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <HiPlus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2 transition-colors"
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total: ${state.total.toFixed(2)}</span>
                    <button
                      onClick={clearCart}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                  {/* Update the checkout button */}
                  <button 
                    onClick={handleCheckout}
                    disabled={isLoading || state.items.length === 0}
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Processing...' : `Checkout ($${state.total.toFixed(2)})`}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}