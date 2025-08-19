import React, { useState } from 'react'
import Menu from '../Menu/Menu'
import ProductList from '../Products/Products'
import Cards from '../Cards/Cards'
import Heading from '../Heading/Heading'
import { Link } from 'react-router-dom'


const MenuPage = () => {
  const categories = [
    'All', 'Tea', 'Rice', 'Noodle', 'Drinks',
  ]

  const [activeTab, setActiveTab] = useState('All');

  let filteredItems = activeTab === 'All' ? ProductList : ProductList.filter(item => item.category === activeTab);

  const renderCards = filteredItems.map(product => {
    return (
      <Cards image={product.img} title={product.title} price={product.price} />
    )
  })

  return (
    <section className='mt-10'>
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
      </div>
    </section>
  )
}

export default MenuPage