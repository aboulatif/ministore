import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(error => {
        console.error('Error fetching product:', error);
        navigate('/products');
      });
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover md:h-full md:w-96"
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-4 text-xl text-gray-600">{product.price.toFixed(2)} fcfa</p>
            <p className="mt-4 text-gray-500">{product.description}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;