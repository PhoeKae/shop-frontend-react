import React, { useState } from 'react';
import { usePosts, useFeaturedPosts, usePostsByCategory } from '../hooks/useApi';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Fetch all products with filters
  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetchPosts
  } = usePosts({
    category_id: selectedCategory || undefined,
    search: searchTerm || undefined,
    min_price: priceRange.min || undefined,
    max_price: priceRange.max || undefined,
  });

  // Fetch featured products
  const {
    data: featuredData,
    isLoading: featuredLoading,
    error: featuredError
  } = useFeaturedPosts();

  // Fetch products by category
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError
  } = usePostsByCategory(selectedCategory);

  const handleSearch = (e) => {
    e.preventDefault();
    refetchPosts();
  };

  const handlePriceFilter = () => {
    refetchPosts();
  };

  if (postsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (postsError) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 text-xl mb-4">Error loading products</div>
        <button 
          onClick={() => refetchPosts()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const posts = postsData?.data?.data || [];
  const featuredPosts = featuredData?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex gap-4 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="1">Electronics</option>
            <option value="8">Clothing & Fashion</option>
            <option value="14">Home & Garden</option>
            <option value="20">Sports & Outdoors</option>
            <option value="26">Books & Media</option>
            <option value="32">Beauty & Health</option>
            <option value="38">Automotive & Vehicles</option>
            <option value="44">Toys & Games</option>
            <option value="50">Food & Beverages</option>
            <option value="56">Jewelry & Watches</option>
          </select>

          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handlePriceFilter}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      {!selectedCategory && !searchTerm && !priceRange.min && !priceRange.max && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Products</h2>
          {featuredLoading ? (
            <div className="text-center py-8">Loading featured products...</div>
          ) : featuredError ? (
            <div className="text-red-600 text-center py-8">Error loading featured products</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPosts.map((post) => (
                <ProductCard key={post.id} product={post} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* All Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {selectedCategory ? 'Products in Category' : 'All Products'}
        </h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl mb-4">No products found</div>
            <button 
              onClick={() => {
                setSelectedCategory('');
                setSearchTerm('');
                setPriceRange({ min: '', max: '' });
                refetchPosts();
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <ProductCard key={post.id} product={post} />
            ))}
          </div>
        )}

        {/* Pagination Info */}
        {postsData?.data && (
          <div className="mt-8 text-center text-gray-600">
            Showing {postsData.data.from || 1} to {postsData.data.to || posts.length} of {postsData.data.total || posts.length} products
          </div>
        )}
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const { title, description, price, quantity, thumbnail, category, user } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            quantity > 10 ? 'bg-green-100 text-green-800' : 
            quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'
          }`}>
            {quantity > 10 ? 'In Stock' : quantity > 0 ? 'Low Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-blue-600">
            ${parseFloat(price).toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            Qty: {quantity}
          </span>
        </div>
        
        <div className="text-xs text-gray-500 mb-3">
          <div>Category: {category?.name}</div>
          <div>Seller: {user?.name}</div>
        </div>
        
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={quantity === 0}>
          {quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default Products;
