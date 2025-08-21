import React, { useState, useEffect } from 'react'
import Cards from '../Cards/Cards'
import Heading from '../Heading/Heading'

const MenuPage = () => {
  const [categories, setCategories] = useState(["All"]);
  const [activeTab, setActiveTab] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch both products & categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch categories
        const catRes = await fetch("http://localhost:8000/api/categories");
        const catData = await catRes.json();

        // Add "All" in front
        const categoryNames = ["All", ...catData.map(c => c.name)];
        setCategories(categoryNames);

        // fetch products
        const prodRes = await fetch("http://localhost:8000/api/posts");
        const prodData = await prodRes.json();

        setProducts(prodData.data); // Laravel pagination response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (<div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-20 mt-15'>
    <Heading highlight="Our" heading="Menu" />
    <div className="flex items-center justify-center h-64 space-x-2">
      <span className="w-3 h-5 bg-orange-500 rounded-full animate-bounce"></span>
      <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-3 h-7 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
    </div>
  </div>)
  if (error) return <p className="text-center text-red-500">Error: {error}</p>

  // Filtering
  let filteredItems =
    activeTab === 'All'
      ? products
      : products.filter(item => item.category?.name === activeTab);

  const renderCards = filteredItems.map(product => (
    <Cards
      key={product.id}
      image={`http://localhost:8000/storage/${product.thumbnail}`}
      title={product.title}
      price={product.price}
    />
  ))

  return (
    <section className='mt-15'>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-20">
        <Heading highlight="Our" heading="Menu" />

        {/* Tabs */}
        <div className='flex flex-wrap gap-3 mt-8 sm:mt-10'>
          {categories.map(category => (
            <button
              key={category}
              className={`px-5 py-2 text-lg rounded-lg cursor-pointer 
                ${activeTab === category ? 'bg-gradient-to-b from-orange-400 to-orange-500 text-white' : 'bg-zinc-100'}`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Listing */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-12'>
          {renderCards}
        </div>
      </div>
    </section>
  )
}

export default MenuPage
