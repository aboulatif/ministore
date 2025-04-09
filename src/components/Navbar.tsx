import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">BoutiqueChic</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Accueil</Link>
            <Link to="/products" className="text-gray-700 hover:text-indigo-600">Produits</Link>
            <Link to="/new-product" className="text-gray-700 hover:text-indigo-600">Nouveau Produit</Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-indigo-600" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;