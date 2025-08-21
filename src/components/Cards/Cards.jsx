import React from 'react'
import Button from '../Button/Button'


const Cards = ({ image, title, price }) => {
  return (
    <div className='bg-zinc-100 p-6 rounded-xl '>
      {/* card-image */}
      <div
        className='w-full h-50'>
        <img src={image} alt="" className='w-full h-full mx-auto object-contain' />
      </div>

      {/* card-content */}
      <div className='text-center'>
        <h3 className='text-2xl font-semibold '>{title}</h3>
        <p className='text-2xl font-bold mt-4 mb-3'>{price} Ks</p>
      </div>
    </div>
  )
}

export default Cards