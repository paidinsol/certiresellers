'use client';

import Link from 'next/link';
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import { 
  HiSearch,
  HiShoppingBag,  
  HiOutlineEye, 
  HiOutlineHeart,
  HiStar,
  HiArrowRight
} from 'react-icons/hi';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter,
  FaTshirt,
  FaGlasses,
  FaWallet
} from 'react-icons/fa';
import { GiBelt } from 'react-icons/gi';

const categories = [
  { 
    name: "Clothing", 
    icon: <FaTshirt className="w-8 h-8" />, 
    count: `${products.filter(p => p.category === 'Clothing').length} items`,
    color: "bg-blue-50 text-blue-600"
  },
  { 
    name: "Belts", 
    icon: <GiBelt className="w-8 h-8" />, 
    count: `${products.filter(p => p.category === 'Belts').length} items`,
    color: "bg-green-50 text-green-600"
  },
  { 
    name: "Accessories", 
    icon: <FaGlasses className="w-8 h-8" />, 
    count: `${products.filter(p => p.category === 'Accessories').length} items`,
    color: "bg-purple-50 text-purple-600"
  },
];

export default function Home() {
  const featuredProducts = products.slice(0, 6);

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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                <HiStar className="w-6 h-6 text-yellow-400" />
                <HiStar className="w-6 h-6 text-yellow-400" />
                <HiStar className="w-6 h-6 text-yellow-400" />
                <HiStar className="w-6 h-6 text-yellow-400" />
                <HiStar className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Your Style
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Premium clothing, belts, and accessories for the modern lifestyle
            </p>
            <Link href="#products" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center group">
              Shop Now
              <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Shop by Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`}>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-center mb-2">{category.name}</h4>
                  <p className="text-gray-600 text-center">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of trending items
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link 
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              View All Products
              <HiArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <HiShoppingBag className="w-8 h-8 mr-2" />
                <h5 className="text-xl font-bold">StyleHub</h5>
              </div>
              <p className="text-gray-400">
                Your destination for premium fashion and accessories.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Categories</h6>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/category/clothing" className="hover:text-white transition-colors flex items-center"><FaTshirt className="w-4 h-4 mr-2" />Clothing</Link></li>
                <li><Link href="/category/belts" className="hover:text-white transition-colors flex items-center"><GiBelt className="w-4 h-4 mr-2" />Belts</Link></li>
                <li><Link href="/category/accessories" className="hover:text-white transition-colors flex items-center"><FaGlasses className="w-4 h-4 mr-2" />Accessories</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Customer Service</h6>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Follow Us</h6>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StyleHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-gray-900">
                StyleStore
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-700 hover:text-gray-900">
                  Home
                </Link>
                <Link href="/products" className="text-gray-700 hover:text-gray-900">
                  All Products
                </Link>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Categories
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  About
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
