import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => {
        setLatestProducts(data.slice(-6).reverse());
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Derniers Produits</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.price.toFixed(2)} fcfa</p>
              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/products/${product.id}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Voir détails
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;