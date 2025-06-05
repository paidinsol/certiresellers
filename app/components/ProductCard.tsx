'use client';

import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { 
  HiShoppingCart, 
  HiEye, 
  HiHeart,
  HiCheck,
  HiX
} from 'react-icons/hi';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const addToCart = () => {
    if (product.inStock) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-square bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors relative overflow-hidden">
            {!imageError ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500">Image not available</span>
              </div>
            )}
            
            {/* Overlay with quick actions */}
            <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-3 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <HiEye className="w-5 h-5 text-gray-700" />
              </div>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <HiHeart className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </Link>
        
        {/* Stock status badge */}
        <div className="absolute top-3 left-3">
          {product.inStock ? (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <HiCheck className="w-3 h-3 mr-1" />
              In Stock
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <HiX className="w-3 h-3 mr-1" />
              Out of Stock
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">{product.category}</span>
        <Link href={`/product/${product.id}`}>
          <h4 className="text-xl font-semibold mt-2 mb-2 hover:text-gray-700 cursor-pointer transition-colors">{product.name}</h4>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
        </div>
        
        <button
          onClick={addToCart}
          disabled={!product.inStock}
          className={`w-full py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-medium ${
            product.inStock
              ? justAdded
                ? 'bg-green-500 text-white'
                : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {justAdded ? (
            <>
              <HiCheck className="w-5 h-5" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <HiShoppingCart className="w-5 h-5" />
              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}