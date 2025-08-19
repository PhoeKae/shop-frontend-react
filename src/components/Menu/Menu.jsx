import React, { useState } from 'react'
import Heading from '../Heading/Heading'
import ProductList from '../Products/Products'
import Cards from '../Cards/Cards'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

const Menu = () => {

  const categories = [
    'All', 'Tea', 'Rice', 'Noodle', 'Drinks',
  ]

  const [activeTab, setActiveTab] = useState('All');

  let filteredItems = activeTab === 'All' ? ProductList : ProductList.filter(item => item.category === activeTab);

  const renderCards = filteredItems.slice(0, 8).map(product => {
    return (
      <Cards image={product.img} title={product.title} price={product.price} />
    )
  })

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-20">
        <Heading highlight="Our" heading="Menu" />
        {/* Tabs */}
        <div className='flex flex-wrap gap-3 mt-8 sm:mt-10'>
          {categories.map(category => {
            return (
              <button key={category} className={`bg-zinc-100 px-5 py-2 text-lg rounded-lg cursor-pointer ${activeTab === category ? 'bg-gradient-to-b from-orange-400 to-orange-500' : 'bg-zinc-100'}`} onClick={() => setActiveTab(category)}>
                {category}
              </button>
            )
          })}
        </div>

        {/* Product Listing */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-12'>
          {renderCards}
        </div>
        <div className='text-center mt-15'>
          <Link to="/foods" className='bg-gradient-to-b from-orange-400 to-orange-500 text-white px-5 py-4 rounded-lg md:text-lg text-md hover:scale-105 hover:to-amber-500 transition-all duration-300 cursor-pointer'>All Menus are Here.</Link>
        </div>
      </div>
    </section>
  )
}

export default Menu