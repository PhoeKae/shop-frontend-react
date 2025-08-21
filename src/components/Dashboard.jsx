import React from 'react';
import { usePosts, useCategories, useFeaturedPosts, useLowStockPosts } from '../hooks/useApi';

const Dashboard = () => {
  // Fetch various data using TanStack Query
  const { data: postsData, isLoading: postsLoading } = usePosts();
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const { data: featuredData, isLoading: featuredLoading } = useFeaturedPosts();
  const { data: lowStockData, isLoading: lowStockLoading } = useLowStockPosts();

  const posts = postsData?.data?.data || [];
  const categories = categoriesData || [];
  const featuredPosts = featuredData?.data || [];
  const lowStockPosts = lowStockData?.data || [];

  // Calculate statistics
  const totalProducts = postsData?.data?.total || posts.length;
  const totalCategories = categories.length;
  const mainCategories = categories.filter(cat => !cat.parent_id).length;
  const subCategories = categories.filter(cat => cat.parent_id).length;
  const outOfStock = posts.filter(post => post.quantity === 0).length;
  const lowStock = posts.filter(post => post.quantity > 0 && post.quantity <= 10).length;
  const inStock = posts.filter(post => post.quantity > 10).length;

  // Calculate total inventory value
  const totalValue = posts.reduce((sum, post) => sum + (post.price * post.quantity), 0);

  // Get top categories by product count
  const categoryStats = categories.map(category => {
    const productCount = posts.filter(post => post.category_id === category.id).length;
    return { ...category, productCount };
  }).sort((a, b) => b.productCount - a.productCount).slice(0, 5);

  if (postsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon="📦"
          color="blue"
        />
        <StatCard
          title="Total Categories"
          value={totalCategories}
          icon="🏷️"
          color="green"
        />
        <StatCard
          title="Total Value"
          value={`$${totalValue.toLocaleString()}`}
          icon="💰"
          color="yellow"
        />
        <StatCard
          title="Main Categories"
          value={mainCategories}
          icon="📁"
          color="purple"
        />
      </div>

      {/* Inventory Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Inventory Status</h3>
            <span className="text-2xl">📊</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">In Stock</span>
              <span className="text-green-600 font-semibold">{inStock}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Low Stock</span>
              <span className="text-yellow-600 font-semibold">{lowStock}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Out of Stock</span>
              <span className="text-red-600 font-semibold">{outOfStock}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Category Breakdown</h3>
            <span className="text-2xl">📂</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Main Categories</span>
              <span className="text-blue-600 font-semibold">{mainCategories}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sub Categories</span>
              <span className="text-purple-600 font-semibold">{subCategories}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total</span>
              <span className="text-gray-800 font-semibold">{totalCategories}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Featured Products</h3>
            <span className="text-2xl">⭐</span>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {featuredPosts.length}
            </div>
            <div className="text-sm text-gray-600">Featured Products</div>
          </div>
        </div>
      </div>

      {/* Top Categories by Product Count */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Categories by Product Count</h3>
        <div className="space-y-3">
          {categoryStats.map((category, index) => (
            <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                <span className="font-medium text-gray-800">{category.name}</span>
                {!category.parent_id && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">Main</span>
                )}
              </div>
              <span className="text-lg font-semibold text-blue-600">{category.productCount} products</span>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Low Stock Alert</h3>
        {lowStockLoading ? (
          <div className="text-center py-4">Loading low stock products...</div>
        ) : lowStockPosts.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No low stock products</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockPosts.slice(0, 6).map((post) => (
              <div key={post.id} className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-yellow-600">⚠️</span>
                  <h4 className="font-medium text-gray-800 line-clamp-1">{post.title}</h4>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Category: {post.category?.name}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Stock: <span className="font-semibold text-red-600">{post.quantity}</span>
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    ${parseFloat(post.price).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Products */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.slice(0, 8).map((post) => (
            <div key={post.id} className="border border-gray-200 p-4 rounded-lg">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-24 object-cover rounded mb-3"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x150?text=No+Image';
                }}
              />
              <h4 className="font-medium text-gray-800 text-sm line-clamp-2 mb-2">
                {post.title}
              </h4>
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-600 font-semibold">
                  ${parseFloat(post.price).toFixed(2)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  post.quantity > 10 ? 'bg-green-100 text-green-800' : 
                  post.quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {post.quantity > 10 ? 'In Stock' : post.quantity > 0 ? 'Low Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${colorClasses[color]} text-white p-3 rounded-full`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
