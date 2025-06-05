'use client';

import { useParams } from 'next/navigation';
import { getProductById } from '../../data/products';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import Cart from '../../components/Cart';
import { 
  HiShoppingCart, 
  HiArrowLeft, 
  HiHeart,
  HiShare,
  HiCheck,
  HiX,
  HiStar,
  HiSearch,
  HiShoppingBag
} from 'react-icons/hi';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter
} from 'react-icons/fa';
import { useState } from 'react';

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = getProductById(productId);
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center">
                  <HiShoppingBag className="w-8 h-8 mr-2 text-gray-700" />
                  StyleHub
                </Link>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">Home</Link>
                <Link href="/products" className="text-gray-700 hover:text-gray-900 transition-colors">All Products</Link>
                <Link href="/category/clothing" className="text-gray-700 hover:text-gray-900 transition-colors">Clothing</Link>
                <Link href="/category/belts" className="text-gray-700 hover:text-gray-900 transition-colors">Belts</Link>
                <Link href="/category/accessories" className="text-gray-700 hover:text-gray-900 transition-colors">Accessories</Link>
              </nav>
              <div className="flex items-center space-x-4">
                <button className="text-gray-700 hover:text-gray-900 p-2 transition-colors">
                  <HiSearch className="w-5 h-5" />
                </button>
                <Cart />
              </div>
            </div>
          </div>
        </header>
        
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    if (product.inStock) {
      for (let i = 0; i < quantity; i++) {
        dispatch({ type: 'ADD_TO_CART', payload: product });
      }
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 3000);
    }
  };

  // Use different images for each product with multiple angles
  const getProductImages = (productId: number) => {
    const baseImages = {
      1: [ // Bred
        "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop&crop=center&q=80"
      ],
      2: [ // White Cement
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1520256862855-398228c41684?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=600&fit=crop&crop=center&q=80"
      ],
      3: [ // Black Cat
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&crop=center&q=80"
      ],
      4: [ // University Blue
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1520256862855-398228c41684?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&h=600&fit=crop&crop=center&q=80"
      ],
      5: [ // Lightning
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=600&fit=crop&crop=center&q=80"
      ],
      6: [ // Military Blue
        "https://images.unsplash.com/photo-1520256862855-398228c41684?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&h=600&fit=crop&crop=center&q=80"
      ],
      7: [ // Red Thunder
        "https://images.laced.com/products/66dec5c7-75b4-448d-b368-54938d8f18ae.jpg",
        "https://images.laced.com/products/51648cc8-0334-4c18-b91d-dce42c2b1f75.jpg?auto=format&fit=max&w=640&q=75",
        "https://images.laced.com/products/318e49e8-7cde-4020-815b-c1771e3021a7.jpg?auto=format&fit=max&w=640&q=75",
        "https://images.laced.com/products/f637c2fa-eb16-44d3-b503-65894155ec8e.jpg?auto=format&fit=max&w=640&q=75"
      ],
      8: [ // Cool Grey
        "https://images.laced.com/products/84b414f9-b096-41d5-a23c-77478d43c6df.jpg?auto=format&fit=max&w=640&q=75",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1520256862855-398228c41684?w=600&h=600&fit=crop&crop=center&q=80",
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=600&fit=crop&crop=center&q=80"
      ],
      9: [ // Oreo
        "https://images.laced.com/products/84b414f9-b096-41d5-a23c-77478d43c6df.jpg?auto=format&fit=max&w=640&q=75",
        "https://images.laced.com/products/air-jordan-4-retro-oreo-side.jpg?auto=format&fit=max&w=640&q=75",
        "https://images.laced.com/products/air-jordan-4-retro-oreo-back.jpg?auto=format&fit=max&w=640&q=75",
        "https://images.laced.com/products/air-jordan-4-retro-oreo-sole.jpg?auto=format&fit=max&w=640&q=75"
      ]
    };
    
    return baseImages[productId as keyof typeof baseImages] || [
      product.image,
      product.image,
      product.image,
      product.image
    ];
  };

  const productImages = getProductImages(productId);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center">
                <HiShoppingBag className="w-8 h-8 mr-2 text-gray-700" />
                StyleHub
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-gray-900 transition-colors">All Products</Link>
              <Link href="/category/clothing" className="text-gray-700 hover:text-gray-900 transition-colors">Clothing</Link>
              <Link href="/category/belts" className="text-gray-700 hover:text-gray-900 transition-colors">Belts</Link>
              <Link href="/category/accessories" className="text-gray-700 hover:text-gray-900 transition-colors">Accessories</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900 p-2 transition-colors">
                <HiSearch className="w-5 h-5" />
              </button>
              <Cart />
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-900">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/products" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <HiArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              {!imageError ? (
                <Image
                  src={productImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
                  <div className="text-center">
                    <HiX className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">Image not available</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors relative ${
                    selectedImage === index ? 'border-gray-900' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category and Stock Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                {product.category}
              </span>
              {product.inStock ? (
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center">
                  <HiCheck className="w-4 h-4 mr-1" />
                  In Stock
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full flex items-center">
                  <HiX className="w-4 h-4 mr-1" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.8 out of 5 stars)</span>
              <span className="text-sm text-gray-500">• 127 reviews</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <div className="prose prose-sm text-gray-600">
              <p>{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  disabled={!product.inStock}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={addToCart}
                disabled={!product.inStock}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  product.inStock
                    ? justAdded
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700'
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

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <HiHeart className="w-5 h-5" />
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <HiShare className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Free shipping:</span>
                  <p className="text-gray-600">On orders over $100</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Returns:</span>
                  <p className="text-gray-600">30-day return policy</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Warranty:</span>
                  <p className="text-gray-600">1-year manufacturer warranty</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Support:</span>
                  <p className="text-gray-600">24/7 customer service</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200 flex items-center justify-center text-gray-500">
                  Related Product {i}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Related Product {i}</h3>
                  <p className="text-gray-600 text-sm mb-2">Product description here...</p>
                  <p className="font-bold text-gray-900">$99.99</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">StyleHub</h3>
              <p className="text-gray-400 text-sm">
                Your premier destination for fashion and style.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 StyleHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}