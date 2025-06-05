'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { FiFilter, FiSearch, FiGrid, FiList, FiX } from 'react-icons/fi';
import { BiSort, BiChevronDown } from 'react-icons/bi';
import { 
  HiSearch, 
  HiShoppingBag,
  HiStar,
  HiHeart,
  HiEye,
  HiShoppingCart
} from 'react-icons/hi';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter
} from 'react-icons/fa';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  // Get unique categories and price range
  const categories = ['all', ...new Set(products.map(product => product.category))];
  const maxPrice = Math.max(...products.map(p => p.price));
  const minPrice = Math.min(...products.map(p => p.price));

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'name':
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([minPrice, maxPrice]);
    setCurrentPage(1);
  };

  const toggleProductSelection = (productId: number): void => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center hover:text-gray-700 transition-colors duration-200">
                <HiShoppingBag className="w-8 h-8 mr-2 text-gray-700" />
                StyleHub
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:scale-105 transform">Home</Link>
              <Link href="/products" className="text-gray-900 font-medium border-b-2 border-gray-900 pb-1">All Products</Link>
              <Link href="/category/clothing" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:scale-105 transform">Clothing</Link>
              <Link href="/category/belts" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:scale-105 transform">Belts</Link>
              <Link href="/category/accessories" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:scale-105 transform">Accessories</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900 p-2 transition-all duration-200 hover:bg-gray-100 rounded-full hover:scale-110 transform">
                <HiSearch className="w-5 h-5" />
              </button>
              <Cart />
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">All Products</h1>
              <p className="text-xl text-gray-300 mb-8">Discover our complete collection of premium fashion</p>
              <div className="flex justify-center items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-300">Rated 4.8/5 by our customers</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-md active:scale-95 transform"
            >
              <FiFilter className="w-4 h-4 mr-2" />
              Filters & Search
              <BiChevronDown className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters and Search */}
          <div className={`bg-white rounded-lg shadow-sm p-6 mb-8 ${showFilters || 'hidden md:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white hover:border-gray-400 transition-all duration-200 cursor-pointer"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <BiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white hover:border-gray-400 transition-all duration-200 cursor-pointer"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <BiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="flex-1 cursor-pointer"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="flex-1 cursor-pointer"
                />
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearFilters}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-all duration-200 hover:bg-gray-100 px-3 py-2 rounded-lg hover:scale-105 transform"
              >
                <FiX className="w-4 h-4 mr-1" />
                Clear All Filters
              </button>
              
              {selectedProducts.size > 0 && (
                <div className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                  {selectedProducts.size} product(s) selected for comparison
                </div>
              )}
            </div>
          </div>

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </p>
              {searchTerm && (
                <p className="text-sm text-gray-500 mt-1">
                  Search results for "{searchTerm}"
                </p>
              )}
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 transition-all duration-200 hover:scale-105 transform active:scale-95 ${
                    viewMode === 'grid' 
                      ? 'bg-gray-900 text-white shadow-inner' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 transition-all duration-200 hover:scale-105 transform active:scale-95 ${
                    viewMode === 'list' 
                      ? 'bg-gray-900 text-white shadow-inner' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {paginatedProducts.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {paginatedProducts.map((product) => (
                    <div key={product.id} className="relative group">
                      <ProductCard product={product} />
                      <button
                        onClick={() => toggleProductSelection(product.id)}
                        className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg ${
                          selectedProducts.has(product.id) 
                            ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-200' 
                            : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-red-500 shadow-gray-200'
                        }`}
                      >
                        <HiHeart className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 mb-12">
                  {paginatedProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-6 hover:shadow-md transition-all duration-200 hover:scale-[1.02] transform">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">IMG</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                        <div className="flex items-center space-x-4">
                          <span className="text-xl font-bold text-gray-900">${product.price}</span>
                          <span className="text-sm text-gray-500">{product.category}</span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Link
                          href={`/product/${product.id}`}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 text-center hover:scale-105 transform active:scale-95 shadow-lg hover:shadow-xl"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => toggleProductSelection(product.id)}
                          className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 transform active:scale-95 shadow-sm hover:shadow-md ${
                            selectedProducts.has(product.id)
                              ? 'bg-blue-500 text-white hover:bg-blue-600'
                              : 'border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
                          }`}
                        >
                          {selectedProducts.has(product.id) ? 'Selected' : 'Compare'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mb-12">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-105 transform active:scale-95 shadow-sm hover:shadow-md"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 transform active:scale-95 shadow-sm hover:shadow-md ${
                            currentPage === page
                              ? 'bg-gray-900 text-white shadow-inner'
                              : 'border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-105 transform active:scale-95 shadow-sm hover:shadow-md"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 hover:scale-105 transform active:scale-95 shadow-lg hover:shadow-xl"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <HiShoppingBag className="w-8 h-8 mr-2" />
                <span className="text-2xl font-bold">StyleHub</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your premier destination for quality clothing, stylish belts, and premium accessories. 
                Discover fashion that defines your unique style.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-200 hover:scale-110 transform active:scale-95">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-200 hover:scale-110 transform active:scale-95">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-all duration-200 hover:scale-110 transform active:scale-95">
                  <FaTwitter className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors duration-200 hover:scale-105 transform inline-block">Home</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors duration-200 hover:scale-105 transform inline-block">All Products</Link></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 hover:scale-105 transform inline-block">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 hover:scale-105 transform inline-block">Contact</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Customer Service</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200 hover:scale-105 transform inline-block">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 hover:scale-105 transform inline-block">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 hover:scale-105 transform inline-block">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 hover:scale-105 transform inline-block">Size Guide</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StyleHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}