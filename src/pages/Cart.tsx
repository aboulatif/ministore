import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-semibold text-gray-900">Votre panier est vide</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre Panier</h1>
      <div className="bg-white rounded-lg shadow-md">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center p-6 border-b border-gray-200 last:border-b-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="ml-6 flex-grow">
              <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
              <p className="text-gray-600">{item.price.toFixed(2)} fcfa</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="p-6 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-indigo-600">
              {total.toFixed(2)} fcfa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;